import * as THREE from 'three';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var colors = require('nice-color-palettes');

let palette = colors[Math.floor(Math.random() * colors.length)];

palette = palette.map((color) => new THREE.Color(color))

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

palette = [
    new THREE.Color(0x8EF6E4),
    new THREE.Color(0x8EF6E4),
    new THREE.Color(0x9896F1),
    new THREE.Color(0xD59BF6),
    new THREE.Color(0xEDB1F1),
];

palette = [
    new THREE.Color(0x0FFF95),
    new THREE.Color(0x0FFF95),
    new THREE.Color(0x30C5FF),
    new THREE.Color(0xEE4266),
    new THREE.Color(0x9883E5),
];



export default class Sketch{
    constructor(){
        this.time = 0.0;

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('container').appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.camera.position.z = 0.2;
        this.scene = new THREE.Scene();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.addMesh();
        this.render();
    }

    addMesh(){
        this.geometry = new THREE.PlaneGeometry( 1,1, 200, 200);
        this.geometry.rotateX(-0.5);

        this.material = new THREE.MeshNormalMaterial();
        this.material = new THREE.ShaderMaterial({
            fragmentShader: fragment,
            vertexShader: vertex,
            uniforms: {
                time: { value: 0},
                uColor: { value: palette }
            },
            side: THREE.DoubleSide,
            wireframe:false,
        })

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    render(){
        this.time += 0.01
        this.material.uniforms.time.value = this.time;
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch();
