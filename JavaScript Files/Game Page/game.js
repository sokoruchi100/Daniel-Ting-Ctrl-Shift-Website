import * as THREE from "../Threejs Folder/three.module.js";
import WebGL from "../Threejs Folder/WebGL.js";
import {GLTFLoader} from "../Threejs Folder/GLTFLoader.js"

//ELEMENTS
const loadingScreen = document.getElementById('loading-screen');
const main = document.getElementsByTagName('main');
const cont = document.getElementsByClassName('cont');

//SCENE
const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 750);

camera.position.set(0.93,11.89,21.86);
camera.rotation.set(-0.16,0.003,0.0005);

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
const AL = new THREE.AmbientLight(0xffffff, 0.25);
const PL1 = new THREE.PointLight(0xffffff, 1, 100);
const PL2 = new THREE.PointLight(0xffffff, 1, 100);
scene.add(AL, PL1, PL2);
PL1.position.set(-13,8,8);
PL2.position.set(13,8,8);

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
                cont[0].style.display = 'flex';
            } else {
                i--;
            } 
        }
        const counting = setInterval(count, 1000);
        count();
    }
    decrement();
};

//GLTF LOADER
const gltfLoader = new GLTFLoader(manager);

gltfLoader.load( "../Models/Interior/scene.gltf", function ( gltf ) {

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

//RESIZING
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