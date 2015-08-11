// init
var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var gun;

// Create Geometry
/*
var geometry = new THREE.BoxGeometry(2,2,2);
var material = new THREE.MeshPhongMaterial({color:0x00ff00, shading: THREE.SmoothShading, shininess: 50, specular: 0x000000, ambient: 0x00ee00});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);*/

// Object Loader
var loader = new THREE.ObjectLoader();


loader.load("obj/gun-pbribl.json", function(object){
	gun = object;
	gun.scale.set(0.025,0.025,0.025);
	scene.add(gun);
} );


camera.position.z = 5;

// Lighting
var ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

var pointLight = new THREE.SpotLight(0xdddddd, 0.8, 1000, Math.PI/15);
pointLight.position.set(-80, 80, 80);
scene.add(pointLight);
// Animation Loop
var renderFunction = function(){
  requestAnimationFrame(renderFunction);
  
  
  gun.rotation.x += 0.01;
  gun.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderFunction();