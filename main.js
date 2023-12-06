import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { Inspector } from '@babylonjs/inspector';
import setupCameraScroll from './src/CameraScrollAnimation';
import { MeshImport } from './src/MeshImporter';
import { SkillFrameImport } from './src/SkillsFrame';
import { getAssetPath } from './src/FilePath';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  return scene;
}

const scene = createScene();
const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
// light.groundColor = new BABYLON.Color3(1, 1, 1).toLinearSpace();
light.intensity = 2;

const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(-5, 1.2, -1.314), scene);
camera.rotation.set(Math.PI / 27.69, Math.PI / 2, 0);
// camera.attachControl(true);

//Import Room Mesh
MeshImport(scene);

//Skills Frame
//Center 
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, 0.4, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_GameDevelopmentLogo.jpg");
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, -0.3, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_ARLogo.jpg");
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, -1.0, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_VRLogo.jpg");
SkillFrameImport(scene, 'mesh/HorizontalRectangleFrame.glb', new BABYLON.Vector3(0.8, -1.7, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_GamifiedSolutionsLogo.jpg");
//Left
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(-1.1, 0, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_PhotshopLogo.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(-1.1, -1.1, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_ThreejsLogo.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(-1.3, -1.4, 0), new BABYLON.Vector3(1.5, 1.5, -1), " /Assets/Textures/T_BlenderLogo.jpg");

//Right
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(0.8, 0, 0), new BABYLON.Vector3(1, 1, -1), "/Assets/Textures/T_CSharpLogo.jpg");
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(0.8, -1.1, 0), new BABYLON.Vector3(1, 1, -1), getAssetPath("Textures/T_BabylonjsLogo.jpg"));
SkillFrameImport(scene, 'mesh/VerticalRectangleFrame.glb', new BABYLON.Vector3(2.4, -1.4, 0), new BABYLON.Vector3(1.5, 1.5, -1), " /Assets/Textures/T_UnityLogo.jpg");

// Camera scroll animation
const cameraScroll = setupCameraScroll(canvas, scene, camera);

engine.runRenderLoop(function () {
  scene.render();
})

window.addEventListener('resize', function () {
  engine.resize();
});

// Inspector
// scene.debugLayer.show({ embedMode: false }).then(function () {
//   document.getElementById("scene-explorer-host").style.zIndex = "1000";
//   document.getElementById("inspector-host").style.zIndex = "1000";
//   document.getElementById("scene-explorer-host").style.position = "fixed";
//   document.getElementById("inspector-host").style.position = "fixed";
// });
// Inspector.Show(scene, {});