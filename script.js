let gridSize = 16;
let mouseDown = false;
let drawMode = "default";   // drawMode = button id of current drawing mode

const sketchContainer = document.getElementById('sketch-container');
const colorButtons = document.querySelectorAll('.toggleable');
const clearButton = document.getElementById('clear-button');
const rainbowButton = document.getElementById('rainbow-button');
const eraserButton = document.getElementById('eraser-button');

function initGrid() {
  sketchContainer.innerHTML = ""
  sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridSize}fr)`
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement('div');
    div.classList.add('tile');
    // mousedown alone will 
    div.addEventListener('mouseover', colorTile);
    div.addEventListener('mousedown', colorTile);
    sketchContainer.appendChild(div);
  }
}

function colorTile(e) {
  // only color tiles if hovering over a tile and holding click
  if (e.type === "mouseover" && !mouseDown) return;
  e.target.style.backgroundColor = "black";
}

function clearGrid() {
  // resets background color of each tile in sketch zone,
  // not sure if this is more efficient than recalling initGrid
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => tile.style.backgroundColor = "");
}

function eraserButtonHandler(e) {
  if (drawMode !== e.target.id) {
    drawMode = e.target.id;
    toggleButton(e.target);
  } else {
    drawMode = "default";
    toggleButton();
  }
}

function toggleButton(target) {
  colorButtons.forEach(button => button.classList.remove('toggled'))
  console.log(target)
  if (target != null) {
    target.classList.add('toggled')
  }
}

function initEventListeners() {
  document.body.onmousedown = () => mouseDown = true;
  document.body.onmouseup = () => mouseDown = false;
  clearButton.addEventListener('click', clearGrid);
  eraserButton.addEventListener('click', eraserButtonHandler);
  rainbowButton.addEventListener('click', eraserButtonHandler);
}

initGrid();
initEventListeners();

