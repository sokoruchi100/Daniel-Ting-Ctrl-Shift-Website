import * as THREE from "./three.module.js";
import {TextGeometry} from "./TextGeometry.js";
import { FontLoader} from "./FontLoader.js";
import WebGL from "./WebGL.js";
import {GLTFLoader} from "./GLTFLoader.js"

//VARIABLES
const win = document.getElementById('win');
win.style.display = "none";
const loadingScreen = document.getElementById('loading-screen');
const main = document.getElementsByTagName('main');

//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xBBF597);

//CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 750);
camera.position.set(0,15,25);

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

//LIGHTING
const AL = new THREE.AmbientLight(0xffffff, .5);
const DL = new THREE.DirectionalLight(0xffffff, .75);
DL.position.set(-1,1,1);
scene.add(AL, DL);

//LOADING SCREEN
const manager = new THREE.LoadingManager();

manager.onLoad = function ( ) {
//Waits 3 seconds before closes the loading screen
    function decrement() {
        let i = 3;
        function count() {
            if (i == -1) {
                clearInterval(counting);
                loadingScreen.classList.add("hiding");
                main[0].style.display = 'block';
            } else {
                i--;
            } 
        }
        const counting = setInterval(count, 1000);
        count();
    }
    decrement();
};

//IMPORTING MODELS
const gltfLoader = new GLTFLoader(manager);

gltfLoader.load( "../Notice Board/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(0,0,0);
    gltf.scene.rotation.y = 3.14
    gltf.scene.scale.set(7,7,7);
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

//RESIZE
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//ANIMATION
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

//WEBGL CHECKER
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

