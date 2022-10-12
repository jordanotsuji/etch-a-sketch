# etch-a-sketch

Etch-a-Sketch game created using HTML, CSS, & JavaScript: [Live Preview](https://jordanotsuji.github.io/etch-a-sketch/)

Planned Extra Features:
- Multiple user adjustable options
  - eraser mode
  - custom color
  - clear canvas button
  - custom default tile color
  - adjustable grid sizing

Notes:
- Ran into an error on safari where the mouse would get stuck selecting the size slider and not be able to let go. Error was caused by a document.body.onmousedown event listener which directly changed mouseDown rather than calling a funciton. After changing to function, the slider was functional on safari
