let gridSize = 16;
let mouseDown = false;
let drawMode = "";   // drawMode = button id of current drawing mode
let backgroundColor = "";
let drawColor = "";

const sketchContainer = document.getElementById('sketch-container');
const drawColorPicker = document.getElementById('draw-color-picker');
const backgroundColorPicker = document.getElementById('background-color-picker');
const colorButtons = document.querySelectorAll('.toggleable');
const clearButton = document.getElementById('clear-button');
const rainbowButton = document.getElementById('rainbow');
const eraserButton = document.getElementById('eraser');
const sizeText = document.querySelector('.size-value');
const sizeScaleBar = document.getElementById('size-slider');

function initEventListeners() {
  // document.body.onmousedown = () => mouseDown = true;
  // document.body.onmouseup = () => mouseDown = false;
  sketchContainer.onmousedown = () => mouseDown = true;
  sketchContainer.onmouseup = () => mouseDown = false;
  drawColorPicker.addEventListener('input', drawColorChangeHandler);
  backgroundColorPicker.addEventListener('input', backgroundColorChangeHandler);
  clearButton.addEventListener('click', clearGrid);
  eraserButton.addEventListener('click', drawModeHandler);
  rainbowButton.addEventListener('click', drawModeHandler);
  sizeScaleBar.addEventListener('input', sizeInputHandler);
  sizeScaleBar.addEventListener('change', sizeInputHandler);
}

function initVariables() {
  gridSize = 16;
  mouseDown = false;
  drawMode = "default";
  backgroundColor = "#fefefe";
  drawColor = "#2E3138";
}

function initGrid() {
  sketchContainer.innerHTML = ""    // clear current divs in sketch zone
  sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridSize}fr)`
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement('div');
    div.classList.add('tile');
    // mousedown for clicks without moving into a tile
    // mouseover for holding down while moving into tiles
    div.addEventListener('mouseover', colorTile);
    div.addEventListener('mousedown', colorTile);
    div.style.backgroundColor = backgroundColor;
    sketchContainer.appendChild(div);
  }
}

function colorTile(e) {
  // only color tiles if hovering over a tile and holding click
  if (e.type === "mouseover" && !mouseDown) return;
  if (drawMode === "default") {
    e.target.style.backgroundColor = drawColor;
  } else if (drawMode == "eraser") {
    e.target.style.backgroundColor = backgroundColor;
    e.target.classList.remove('drawn');
  } else if (drawMode == "rainbow") {
    // https://css-tricks.com/snippets/javascript/random-hex-color/
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = "#" + randomColor;
  }
  if (drawMode != "eraser") {
    // add drawn class so changing backgroundColor doesn't impact it
    e.target.classList.add('drawn');
  }
}

function clearGrid() {
  // resets background color of each tile in sketch zone,
  // not sure if this is more efficient than recalling initGrid
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.style.backgroundColor = backgroundColor;
    // remove drawn class from tiles so background color change doesn't ignore them
    tile.classList.remove('drawn');
  });
}

function drawModeHandler(e) {
  if (drawMode !== e.target.id) {
    drawMode = e.target.id;
    toggleButton(e.target);
  } else {
    drawMode = "default";
    toggleButton();
  }
}

function drawColorChangeHandler(e) {
  drawColor = e.target.value;
}

function backgroundColorChangeHandler(e) {
  // change background color for clear canvas
  backgroundColor = e.target.value;
  const tiles = document.querySelectorAll('.tile');
  // Only change background of tiles that aren't drawn on
  tiles.forEach(tile => {
    if (!tile.classList.contains('drawn')) {
      tile.style.backgroundColor = backgroundColor;
    }
  })
}

function toggleButton(target) {
  colorButtons.forEach(button => button.classList.remove('toggled'))
  if (target != null) {
    target.classList.add('toggled')
  }
}

function sizeInputHandler(e) {
  gridSize = e.target.value;
  if (e.type === "input") {
    // if just sliding the bar, adjust size text but dont 
    // re-init sketch area yet
    sizeText.textContent = "" + gridSize + "x" + gridSize;
  } else if (e.type === "change") {
    // re-init sketch area when user lets go of the slider
    initGrid();
  }
}

// initialize variables and event listeners
initGrid();
initEventListeners();
initVariables();
