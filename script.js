let gridSize = 16;
let mouseDown = false;
const sketchContainer = document.getElementById('sketch-container');

function initGrid() {
  // create 16x16 grid 
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
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => tile.style.backgroundColor = "")
}

initGrid()
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

