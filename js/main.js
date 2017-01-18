//TODO probably need to switch to svg for the image
//Toast to tell people to play with keys (only on desktop)
document.addEventListener('DOMContentLoaded', travel, false);
document.onkeydown = checkKey;

function travel() {
  if (!document.getElementById('earth')) { return; }
  var height = document.getElementById('earth').style.height;
  var zoomLevel = Number.parseInt(height.slice(0, -2), 10);
  document.getElementById('earth').style.height = (zoomLevel + 1) + "vh";
  window.setTimeout(travel, 1000);
}

function checkKey(e) {
  var changePosition = function(pxPos, change) {
    var px = Number.parseInt(pxPos.slice(0, -2), 10);
    px += change;
    return px + "px";
  }
  e = e || window.event;
  var space = document.querySelector('body');
  var earth = document.querySelector('#earth');
  var ehoriz = earth.style.left;
  var evert = earth.style.top;
  var horizontal = space.style.backgroundPositionX;
  var vertical = space.style.backgroundPositionY;
  if (!horizontal) {
    horizontal = "0px";
    vertical = "0px";
    ehoriz = "0px";
    evert = "0px";
  }

  if (e.keyCode == '38') {
    // up arrow
    vertical = changePosition(vertical, 2);
    evert = changePosition(evert, 10);
  } else if (e.keyCode == '40') {
    // down arrow
    vertical = changePosition(vertical, -2);
    evert = changePosition(evert, -10);
  } else if (e.keyCode == '37') {
    // left arrow
    horizontal = changePosition(horizontal, 2);
    ehoriz = changePosition(ehoriz, 10);
  } else if (e.keyCode == '39') {
    // right arrow
    horizontal = changePosition(horizontal, -2);
    ehoriz = changePosition(ehoriz, -10);
  }
  space.style.backgroundPositionY = vertical;
  space.style.backgroundPositionX = horizontal;
  earth.style.top = evert;
  earth.style.left = ehoriz;

}
