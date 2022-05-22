import * as THREE from "../Threejs Folder/three.module.js";
import WebGL from "../Threejs Folder/WebGL.js";
import {GLTFLoader} from "../Threejs Folder/GLTFLoader.js"

//SCENE
const scene = new THREE.Scene();

//TEXTURE LOADER
//These load in the background images
const forestTexture = new THREE.TextureLoader().load("../Image Library/Forest.jpg");
const oldCityTexture = new THREE.TextureLoader().load("../Image Library/Old City.jpg");
const blueSkyTexture = new THREE.TextureLoader().load("../Image Library/BlueSky.jpg");

//HTML ELEMENTS
const loadingScreen = document.getElementById('loading-screen');
const main = document.getElementsByTagName('main');

//CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
//Setting initial position and rotation
camera.position.set(-16.47,2.88,-3.67);
camera.rotation.set(-2.52, -1.22, -2.55);

//LIGHTING
const DL = new THREE.DirectionalLight(0xffffff, 0.75);
const AL = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(DL, AL);

//CHANGING SCENE
//This function takes the input from the button clicks and checks if it matches with either of these cases. Once it finds the matching case, the camera and rotation and lighting will change to the given scene.
function backgroundChanger(section){
    switch(section) {
        case 'origins':
            camera.position.set(-16.47,2.88,-3.67);
            camera.rotation.set(-2.52, -1.22, -2.55);
            break;
        case 'japan':
            scene.background = forestTexture;
            camera.position.set(-12.16,308.18,46.62);
            camera.rotation.set(0.2, -0.14, 0.03);
            AL.intensity = .5;
            DL.position.set(1,1,1);
            DL.intensity = 0.75;
            break;
        case 'world':
            scene.background = oldCityTexture;
            camera.position.set(56.57,613.54,106.04);
            camera.rotation.set(0.22, 0.64, -0.13);
            AL.intensity = .25;
            DL.position.set(1,1,0);
            DL.intensity = 1;
            break;
        case 'today':
            scene.background = blueSkyTexture;
            camera.position.set(136.96,911.98,294.11);
            camera.rotation.set(-0.13, 0.69, 0.08);
            AL.intensity = .25;
            DL.position.set(1,1,0);
            DL.intensity = 1;
            break;
    }
}
window.backgroundChanger = backgroundChanger;

//RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.gammaFactor = 0;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);

//LOADING SCREEN
const manager = new THREE.LoadingManager();
//checks if all models are done loading
manager.onLoad = function ( ) {
//Waits 3 seconds before closes the loading screen
    function decrement() {
        let i = 3;
        function count() {
            if (i == -1) {
                //hides the loading screen
                clearInterval(counting);
                loadingScreen.classList.add("hiding");
                main[0].style.display = 'block';
            } else {
                i--;
            } 
        }// counts in real time
        const counting = setInterval(count, 1000);
        count();
    }
    decrement();
};

//IMPORTING MODELS
const gltfLoader = new GLTFLoader(manager);
//This loads in the 4 models and resizes/rotates/positions them in the entire scene. They are actually stacked ontop of each other
gltfLoader.load( "../Models/Chinese Mountains/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(0,0,0)
    gltf.scene.scale.set(10,10,10)
    gltf.scene.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material.map) n.material.map.anisotropy = 16;
        }
    })

}, undefined, function ( error ) {

	console.error( error );

} );

gltfLoader.load( "../Models/Japanese Forest/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(0,300,0)
    gltf.scene.scale.set(.1,.1,.1)
    gltf.scene.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material.map) n.material.map.anisotropy = 16;
        }
    })

}, undefined, function ( error ) {

	console.error( error );

} );

gltfLoader.load( "../Models/Building/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(0,600,0)
    gltf.scene.scale.set(10,10,10)
    gltf.scene.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material.map) n.material.map.anisotropy = 16;
        }
    })

}, undefined, function ( error ) {

	console.error( error );

} );

gltfLoader.load( "../Models/Modern City/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(0,900,0)
    gltf.scene.scale.set(50,50,50)
    gltf.scene.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material.map) n.material.map.anisotropy = 16;
        }
    })

}, undefined, function ( error ) {

	console.error( error );

} );

//RESIZING
//Changes the rendered 3D scene to match the window output if minimized
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//ANIMATION
//Renders the scene
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    
}

//WEBGL CHECKER
//checks if the user has webgl in their device
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}