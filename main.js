import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { Inspector } from '@babylonjs/inspector';
import setupCameraScroll from './src/CameraScrollAnimation';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { MeshImport } from './src/MeshImporter';
import { SkillFrameImport } from './src/SkillsFrame';

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
camera.attachControl(true);

//Import Room Mesh
MeshImport(scene);

//Skills Frame
//Center 
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, 0.4, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, -0.3, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, -1.0, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, -1.7, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
//Left
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(-1.1, 0, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(-1.1, -1.1, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(-1.3, -1.4, 0), new BABYLON.Vector3(1.5, 1.5, -1), "/mesh/Textures/Luffy.jpg");

//Right
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(0.8, 0, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(0.8, -1.1, 0), new BABYLON.Vector3(1, 1, -1), "/mesh/Textures/Luffy.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(2.4, -1.4, 0), new BABYLON.Vector3(1.5, 1.5, -1), "/mesh/Textures/Luffy.jpg");

// Camera scroll animation
// const cameraScroll = setupCameraScroll(canvas, scene, camera);

engine.runRenderLoop(function () {
  scene.render();
})

window.addEventListener('resize', function () {
  engine.resize();
});

//Inspector
// scene.debugLayer.show({ embedMode: false }).then(function () {
//   document.getElementById("scene-explorer-host").style.zIndex = "1000";
//   document.getElementById("inspector-host").style.zIndex = "1000";
//   document.getElementById("scene-explorer-host").style.position = "fixed";
//   document.getElementById("inspector-host").style.position = "fixed";
// });
// Inspector.Show(scene, {});