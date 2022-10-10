let gridSize = 16;
const sketchContainer = document.getElementById('sketch-container');

function initGrid() {
  // create 16x16 grid 
  sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridSize}fr)`

  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement('div');
    div.classList.add('tile');
    sketchContainer.appendChild(div);
  }
}

initGrid()
