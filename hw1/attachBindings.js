document.getElementById('our_form').addEventListener("submit", onFormSubmit);

document.getElementById("alert").addEventListener("click", formAlert);

document.getElementById("button-1").addEventListener("click", toggleBox);

document.getElementById("button-2").addEventListener("click", rotateColors);

// For each button corresponding to styling tags, attach the appropriate
// listener
Array.prototype.map.call(document.getElementsByClassName("tags-button"), function(el) {
  el.addEventListener("click", onTagButtonClick);
});

document.getElementById("canvas").addEventListener("click", drawBox);
initCanvas();
document.getElementById("clearCanvas").addEventListener("click", function(e) {
  initCanvas();
});
