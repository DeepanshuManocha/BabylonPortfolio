import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { Inspector } from '@babylonjs/inspector';
import setupCameraScroll from './src/CameraScrollAnimation';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  return scene;
}

const scene = createScene();
const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 2;

const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(-4, 1.2, 0.88), scene);
camera.rotation.set(Math.PI / 8, Math.PI / 2, 0);
// camera.attachControl(true);

BABYLON.SceneLoader.ImportMesh(
  '',
  '/',
  'mesh/TestTable.glb',
  scene
);

//Camera scroll animation
const cameraScroll = setupCameraScroll(canvas, scene, camera);


engine.runRenderLoop(function () {
  scene.render();
})

window.addEventListener('resize', function () {
  engine.resize();
});

// Inspector.Show(scene, {});