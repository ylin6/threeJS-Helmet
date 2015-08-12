// init
var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 5000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var gun = null;

// Create Geometry
/*
var geometry = new THREE.BoxGeometry(2,2,2);
var material = new THREE.MeshPhongMaterial({color:0x00ff00, shading: THREE.SmoothShading, shininess: 50, specular: 0x000000, ambient: 0x00ee00});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);*/

// Load Sky Box

var skyUrls = [
	'obj/nissan/Back.png',
	'obj/nissan/Bottom.png',
	'obj/nissan/Top.png',
	'obj/nissan/Left.png',
	'obj/nissan/Right.png',
	'obj/nissan/Front.png'

];

var cubeMap = THREE.ImageUtils.loadTextureCube(skyUrls);
cubeMap.format = THREE.RGBFormat;

var shader = THREE.ShaderLib['cube'];
shader.uniforms['tCube'].value = cubeMap;

var skyBoxMaterial = new THREE.ShaderMaterial({

	fragmentShader : shader.fragmentShader,
	vertexShader : shader.vertexShader,
	uniforms : shader.uniforms,
	depthWrite : false,
	side : THREE.BackSide

});

var skyBox = new THREE.Mesh(
	new THREE.CubeGeometry(1000,1000,1000),
	skyBoxMaterial
);

scene.add(skyBox);

camera.position.z = 5;


// Lighting

var ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);


var light1 = new THREE.DirectionalLight('white', 0.425)
light1.position.set(2.6,1,3);
scene.add(light1);

var light2 = new THREE.DirectionalLight('white', 0.575)
light2.position.set(-2,1,0);
scene.add(light2);

var light3 = new THREE.DirectionalLight('white', 0.95)
light3.position.set(3,3,2);
scene.add(light3);

// Object Loader


var loader = new THREE.JSONLoader();


/*
loader.load("obj/hg/gun-pbribl.json", function(geometry, materials){
	var texture = THREE.ImageUtils.loadTexture("obj/hg/Tex_0008_1.png")
	var mat = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		map: texture,
		envMap: cubeMap,
		shininess: 1.0
	});
	gun = new THREE.Mesh(geometry, mat);
	gun.scale.set(0.05,0.05, 0.05);
	scene.add(gun);

} );*/

loader.load("obj/nissan/nissan-gt-r-nismo.json", function(geometry, materials){
	//var texture = THREE.ImageUtils.loadTexture("obj/hg/Tex_0008_1.png")

	console.log(materials);

	//materials.push(mat);

	for(var i = 0; i < materials.length; i++){
		materials[i].envMap = cubeMap;

		if(materials[i].name =="body-paint"){
			materials[i].reflectivity = 0.2;
		}
	}


	var matface = new THREE.MeshFaceMaterial(materials);

	gun = new THREE.Mesh(geometry, matface);
	gun.scale.set(1,1,1);
	scene.add(gun);

} );



// Animation Loop
var renderFunction = function(){
  requestAnimationFrame(renderFunction);
  
  
  gun.rotation.y += 0.01;
  //cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderFunction();