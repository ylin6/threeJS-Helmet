// init

var path = "./obj/nd/dome"
var designs = [
	path+"1.png",
	path+"2.png",
	path+"3.png",
	path+"4.png"
];

var currentD = designs[0];

var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 5000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setFaceCulling(THREE.CullFaceNone);
document.body.appendChild(renderer.domElement);

var gun = null;

var controls = new THREE.OrbitControls( camera );
controls.noPan = true;
controls.minDistance = 10;
controls.maxDistance = 55;
controls.minPolarAngle = Math.PI/4;
controls.maxPolarAngle = Math.PI*3/4;

var skyUrls = [
	'obj/env/wall3.png',
	'obj/env/wall3.png',
	'obj/env/ceiling.png', // ceiling
	'obj/env/floor.png', // floor
	'obj/env/wall2.png', // frontwall
	'obj/env/wall1.png'  // backwall

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

camera.position.z = 35;


// Lighting

var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


var light1 = new THREE.DirectionalLight('white', 0.425)
light1.position.set(2.6,1,3);
scene.add(light1);

var light2 = new THREE.DirectionalLight('white', 0.475)
light2.position.set(-2,1,0);
scene.add(light2);

var light3 = new THREE.DirectionalLight('white', 0.95)
light3.position.set(3,3,2);

scene.add(light3);

var light4 = new THREE.DirectionalLight('white', 0.35);
light4.position.set(0, 10, 0);

scene.add(light4);

// Object Loader


var loader = new THREE.JSONLoader();

loader.load("obj/nd/revo.json", function(geometry, materials){
	var texture1 = THREE.ImageUtils.loadTexture("obj/nd/dome1.png");
	var texture2 = THREE.ImageUtils.loadTexture("obj/nd/pads2.png");
	for(var i = 0; i < materials.length; i++){
		
		if(materials[i].name == "Helmet_Dome" || materials[i].name =="Face_Mask"){
			materials[i].envMap = cubeMap;
		}

		if(materials[i].name == "Helmet_Dome"){
			materials[i].map = texture1;
			materials[i].reflectivity = 0.8;
		}

		if(materials[i].name =="Pads"){
			materials[i].map = texture2;
		}
	}


	var matface = new THREE.MeshFaceMaterial(materials);

	gun = new THREE.Mesh(geometry, matface);
	gun.scale.set(1,1,1);
	gun.translateY(-8);
	scene.add(gun);
	console.log(gun);
} );


var $matbutton = $('.mat-buttons button');
	$matbutton.click( function(){
		var id = $(this).attr('id');
		console.log("click");
		var tex = THREE.ImageUtils.loadTexture(currentD);
		if (id=="chrome"){

			
			var chromeMat = new THREE.MeshPhongMaterial({
				envMap: cubeMap,
				map: tex,
				reflectivity: 0.9
			});

			gun.material.materials[2] = chromeMat;


		}

		else if (id =="matte"){
			var matteMat = new THREE.MeshPhongMaterial({
				envMap: null,
				map: tex
			});

			gun.material.materials[2] = matteMat;
		}

		else if (id =="candy"){
			var candyMat = new THREE.MeshLambertMaterial({
				envMap: cubeMap,
				map:tex,
				reflectivity: 0.5
			});

			gun.material.materials[2] = candyMat;
		}
});

var $designButton = $('.design-buttons button');

$designButton.click(function(){
	var id = $(this).attr('id');
	currentD = designs[id-1];
	var newtex = THREE.ImageUtils.loadTexture(currentD);
	var newMat = new THREE.MeshPhongMaterial({
				envMap: cubeMap,
				map: newtex,
				reflectivity: 0.9
			});

	gun.material.materials[2] = newMat;

});

// Animation Loop
var renderFunction = function(){
  requestAnimationFrame(renderFunction);
  controls.update();
  gun.rotation.y += 0.001;
  renderer.render(scene, camera);
}

renderFunction();


