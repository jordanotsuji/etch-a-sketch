let gridSize = 16;
let mouseDown = false;
const sketchContainer = document.getElementById('sketch-container');
const clearButton = document.querySelector('.clear-button')

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
  if (e.type === "mouseover" && mouseDown) {
    e.target.style.backgroundColor = "black";
  }
}

function clearGrid() {
  // resets background color of each tile in sketch zone,
  // not sure if this is more efficient than recalling initGrid
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => tile.style.backgroundColor = "")
}

function initEventListeners() {
  document.body.onmousedown = () => mouseDown = true;
  document.body.onmouseup = () => mouseDown = false;
  clearButton.addEventListener('click', clearGrid)
}

initGrid()
initEventListeners()

