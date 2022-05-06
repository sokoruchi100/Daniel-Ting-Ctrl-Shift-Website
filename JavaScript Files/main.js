import * as THREE from "./three.module.js";
import {TextGeometry} from "./TextGeometry.js";
import { FontLoader} from "./FontLoader.js";
import WebGL from "./WebGL.js";
import { CSS3DObject, CSS3DRenderer } from "./CSS3DRenderer.js"
import {GLTFLoader} from "./GLTFLoader.js"

//Text Elements
const sections = document.getElementsByClassName('section');
for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
}
const openingWrapper = document.getElementById('opening-wrapper');
const historyWrapper = document.getElementById('history-wrapper');
const rulesWrapper = document.getElementById('rules-wrapper');
const gameWrapper = document.getElementById('game-wrapper');
const sourceWrapper = document.getElementById('source-wrapper');
const closeButton = document.getElementById('close-button');
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
document.body.appendChild(renderer.domElement);

//CONTROLS

function onMouseWheel(event) {
    camera.position.z -= event.deltaY/15;

    camera.position.clampScalar(-430, 25);
}

//PLANE
const planeGeometry = new THREE.PlaneGeometry(1100,400);
const planeMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color1: {
            value: new THREE.Color(0xFFACAC)
        },
        color2: {
            value: new THREE.Color(0xE3FF90)
        }
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
    
        varying vec2 vUv;
        
        void main() {

            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
    `,
});
const planeMaterial2 = new THREE.ShaderMaterial({
    uniforms: {
        color1: {
            value: new THREE.Color(0x79DF7E)
        },
        color2: {
            value: new THREE.Color(0xFA99B8)
        }
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
    
        varying vec2 vUv;
        
        void main() {

            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
    `,
});
const planeGeometry2 = new THREE.PlaneGeometry(1000,1000);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
scene.add(planeMesh, planeMesh2);
planeMesh.position.set(0,100,-600);
planeMesh2.position.set(0,-2.35,-200);
planeMesh2.rotation.x = -1.57

//LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xfdfbd3, 0.75);
directionalLight.position.set(1,1,1);
scene.add(ambientLight, directionalLight);

const loadingScreen = document.getElementById("loading-screen");

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
                openingWrapper.style.display = "flex";
                openingWrapper.style.animation = "fadeIn 2s Linear";
                closeButton.addEventListener('click', function handleClick() {
                    window.addEventListener('wheel', onMouseWheel, false);
                });
            } else {
                i--;
            } 
        }
        const counting = setInterval(count, 1000);
        count();
    }
    decrement();
	
};

//TEXT GEOMETRY LOADER
const loader = new FontLoader();
const text = "JANKEN!";
loader.load("../Fonts/Merienda One_Regular.json", function(font) {
    const textGeometry = new TextGeometry(text, {
        font: font,
        size: 6,
        height: 2,
    });

    const textMesh = new THREE.Mesh(textGeometry, [
        new THREE.MeshPhongMaterial({color: 0x79DF7E}),
        new THREE.MeshPhongMaterial({color: 0x40C173})
    ])
    textMesh.castShadow = true;
    textMesh.position.set(-18, 30, -40);
    textMesh.rotation.x = -25
    scene.add(textMesh)
});

//IMPORTING MODELS
const gltfLoader = new GLTFLoader(manager);

gltfLoader.load( "../Tori Gate/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(0,25,-100);
    gltf.scene.scale.set(3,3,3);

}, undefined, function ( error ) {

	console.error( error );

} );

gltfLoader.load( "../Notice Board/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(-15,0,-175);
    gltf.scene.rotation.y = -2
    gltf.scene.scale.set(7,7,7);


}, undefined, function ( error ) {

	console.error( error );

} );

gltfLoader.load( "../Temple/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.scale.set(.12,.12,.12);
    gltf.scene.position.set(45,-2.5,-325);
    gltf.scene.rotation.y = -1

}, undefined, function ( error ) {

	console.error( error );

} );

gltfLoader.load( "../Tree/scene.gltf", function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.set(-20,0,-450);
    gltf.scene.scale.set(5,5,5);

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
    
    if (camera.position.z < -25 && camera.position.z > -80) {
        historyWrapper.style.display = "flex";
    } else {
        historyWrapper.style.display = "none";
    }

    if (camera.position.z < -100 && camera.position.z > -175) {
        rulesWrapper.style.display = "flex";
    } else {
        rulesWrapper.style.display = "none";
    }

    if (camera.position.z < -225 && camera.position.z > -300) {
        gameWrapper.style.display = "flex";
    } else {
        gameWrapper.style.display = "none";
    }

    if (camera.position.z < -350) {
        sourceWrapper.style.display = "flex";
    } else {
        sourceWrapper.style.display = "none";
    }
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