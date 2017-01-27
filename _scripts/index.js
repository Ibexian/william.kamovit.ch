var THREE = require('./three.min.js');
/*
Js for index page - allow for arrow based screen control and mars rendering
*/

document.addEventListener('DOMContentLoaded', renderPlanet, false);
document.onkeydown = checkKey;

function checkKey(e = window.event) {
  var changePosition = function(pxPos, change, minMax, screen) {
    var px = Number.parseInt(pxPos.slice(0, -2), 10);
    px += change;
    if(px > minMax){
      px = -500;
    } else if (px < -minMax) {
      px = screen + 500;
    }
    return `${px}px`;
  };
  var space = document.querySelector('body');
  var earth = document.querySelector('canvas');
  if(!earth){return;}
  var {left, top} = earth.style;
  var {backgroundPositionX, backgroundPositionY} = space.style;
  if (!backgroundPositionX) {
    backgroundPositionX = "0px";
    backgroundPositionY = "0px";
    left = "0px";
    top = "0px";
  }

  if (e.keyCode == '38') {
    // up arrow
    backgroundPositionY = changePosition(backgroundPositionY, 2);
    top = changePosition(top, 10, 4000);
  } else if (e.keyCode == '40') {
    // down arrow
    backgroundPositionY = changePosition(backgroundPositionY, -2);
    top = changePosition(top, -10, 4000, window.innerHeight);
  } else if (e.keyCode == '37') {
    // left arrow
    backgroundPositionX = changePosition(backgroundPositionX, 2);
    left = changePosition(left, 10, 5000);
  } else if (e.keyCode == '39') {
    // right arrow
    backgroundPositionX = changePosition(backgroundPositionX, -2);
    left = changePosition(left, -10, 5000, window.innerWidth);
  }
  space.style.backgroundPositionY = backgroundPositionY;
  space.style.backgroundPositionX = backgroundPositionX;
  earth.style.top = top;
  earth.style.left = left;

}


function renderPlanet(){
  if (!window.WebGLRenderingContext) { return; }
  var scene = new THREE.Scene();
  //Lights!
  var light = new THREE.DirectionalLight( 0xffffff, 1);
  light.position.set( 0, 0.5, 1 ).normalize();
  scene.add(light);
  //Camera!
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 1;

  // Create a renderer with Antialiasing
  var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  // Configure renderer size
  renderer.setSize( 335, 170 );
  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.SphereGeometry(0.59, 32, 32);
  var texture = new THREE.TextureLoader().load('../img/marsmap1k.jpg');
  var bumpMap = new THREE.TextureLoader().load('../img/marsbump1k.jpg');
  var material = new THREE.MeshPhongMaterial();
  material.map = texture;
  material.bumpMap = bumpMap;
  material.bumpScale = 0.05;

  var mars = new THREE.Mesh( geometry, material );
  mars.geometry.uvsNeedUpdate = true;
  mars.material.needsUpdate = true;
  // Add cube to Scene
  scene.add( mars );

  // Action Loop
  var render = function () {
    requestAnimationFrame( render );
    mars.rotation.y += 0.001;
    renderer.render(scene, camera);
  };

  render();
}
