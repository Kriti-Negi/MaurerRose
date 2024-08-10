import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );

let N = 10;
let D = 0;
const SCALE =40;
let points = [];

async function draw(){
    if(points.length > 0){
        scene.remove(scene.children[0]);
    }
    points = [];

    for(let i = 0; i < 361; i++){
        let theta = i * D * Math.PI/180;
        let r = Math.sin((theta * N));

        let coords = polar_to_cart(theta, r);
    
        points.push( new THREE.Vector3( coords[0] * SCALE, coords[1]* SCALE, 0 ) );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );
}

function polar_to_cart(theta, r){
    return [r*Math.cos(theta), r*Math.sin(theta)];
}

renderer.setAnimationLoop((time) => {
    //if(time % 5 == 0){
        D = D + 0.1;
        draw();
    //}
    renderer.render(scene, camera);

});