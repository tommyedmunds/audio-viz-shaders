import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  TorusKnotGeometry,
  SphereGeometry,
  AudioListener,
  AudioLoader,
  AudioAnalyser,
  Audio,
  Vector3,
  Clock,
  MeshNormalMaterial,
  Mesh,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createSculptureWithGeometry } from 'shader-park-core';
import { spCode } from './spCode.js';

// let ahURL = require('url:./assets/bremix2.wav');
let ahURL =
  'https://raw.githubusercontent.com/tommyedmunds/audio-viz-shaders/master/assets/bremix2.wav';

let scene = new Scene();
let params = {
  time: 0.0,
  audio: 0.0,
  morph: 0.0,
};

let camera = new PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setClearColor(new Color(1, 1, 1), 1);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// create an AudioListener and add it to the camera
const listener = new AudioListener();
camera.add(listener);

controls.update();
const sound = new Audio(listener);

controls.autoRotate = true;

// create an Audio source

// load a sound and set it as the Audio object's buffer
const audioLoader = new AudioLoader();

audioLoader.load(ahURL, function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
});
console.log('out');
const analyser = new AudioAnalyser(sound);
analyser.fftSize = 1024;

function loadAudio() {
  // get the average frequency of the sound
  const data = analyser.getAverageFrequency();
  const bufferLength = analyser.analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  return dataArray;
}

const dataArray = loadAudio();
// console.log(sound);
let clicked = false;
let frameCount = 0;
document.addEventListener('click', (e) => {
  console.log(e.clientX, e.clientY, screen.height);
  // if (e.clientX >= screen.height * 0.95)
  if (!clicked) {
    sound.play();
    clicked = true;
  } else {
    sound.pause();
    clicked = false;
  }
});

// shape shit

const geometry = new SphereGeometry(35, 35, 35);
const geo2 = new SphereGeometry(83, 84, 86);
const material2 = new MeshNormalMaterial({ wireframe: true });
const wrapGeo = new Mesh(geo2, material2);

scene.add(wrapGeo);

// console.log('sp2 ', sphere2.geometry.attributes.position);

// let geometry = new SphereGeometry(7, 8, 100, 9.6);
// geometry.computeBoundingSphere();
// geometry.center();

// Shader Park Setup
// let mesh = createSculpture(spCode, () => ({
//   time: params.time,
//   audio: params.audio,
//   morph: params.morph,
// }));
// scene.add(mesh);

console.log('is this on');

// *** Uncomment to try using a custom geometry. Make sure to comment out likes 26-29 ***.

let mesh = createSculptureWithGeometry(geometry, spCode, () => ({
  time: params.time,
  audio: params.audio,
  morph: params.morph,
}));
scene.add(mesh);

// mesh.rotation.set(new Vector3(1, 2, Math.PI / 2));
// console.log(mesh);
let render = () => {
  const freqData = analyser.getAverageFrequency();
  // console.log(freqData);
  requestAnimationFrame(render);
  let timeElapsed = listener._clock.getElapsedTime();
  if (clicked) {
    params.audio += freqData;
    params.morph = freqData * 0.00016;
  }

  params.time += 0.01;

  controls.update();
  renderer.render(scene, camera);
};

render();

function makeRoughShape(mesh, fr) {
  const normalizedFR = (fr * 10) / 255;
  mesh.geometry.vertices.forEach(function (vertex, i) {
    if (clicked) {
      if (normalizedFR > 0) {
        var offset = mesh.geometry.parameters.radius;
        var amp = 2.8;
        var time = window.performance.now();
        var rf = 0.00004;
        vertex.normalize();
        var distance = offset + amp * normalizedFR;
        vertex.multiplyScalar(
          distance *
            noise.noise3D(
              vertex.x + time * rf * 7,
              vertex.y + time * rf * 8,
              vertex.z + time * rf * 9
            )
        );
      }
    } else {
      vertex.normalize(2);
    }
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
}
