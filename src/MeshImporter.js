import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { ProjectFolderImport } from './ProjectFolder';
import { SlideShowImport } from './SlideShow';
import { CreateText } from './CreateText';

// Function to create and apply an emissive material with a glow layer
function applyEmissiveMaterial(childMesh, scene, color, intensity, blurKernelSize) {
    var emissiveMaterial = new BABYLON.StandardMaterial("emissiveMaterial", scene);
    emissiveMaterial.emissiveColor = color // Set the color of the glow
    childMesh.material = emissiveMaterial;

    var glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.addIncludedOnlyMesh(childMesh);
    glowLayer.intensity = intensity; // Adjust the intensity as needed
    glowLayer.blurKernelSize = blurKernelSize; // Adjust the blur size as needed
}

// Function to create and apply a material with a texture
function applyTextureMaterial(childMesh, scene, texturePath, bool) {
    var texture = new BABYLON.Texture(texturePath, scene);
    var material = new BABYLON.StandardMaterial("MaterialWithTexture", scene);
    material.diffuseTexture = texture;
    material.diffuseTexture.hasAlpha = bool; // Enable alpha channel
    material.useAlphaFromDiffuseTexture = bool; // Use alpha channel from texture
    if (bool) {
        material.diffuseTexture.uOffset = 0.01; // Add a slight offset to the U texture coordinate
        material.diffuseTexture.vOffset = -0.005; // Add a slight offset to the V texture coordinate
    }
    childMesh.material = material;
}

// Function to create and apply a material with a video texture
function applyVideoTextureMaterial(childMesh, scene, videoElement) {
    const videoTexture = new BABYLON.VideoTexture("VideoTexture", videoElement, scene);
    const material = new BABYLON.StandardMaterial("MaterialWithVideoTexture", scene);
    material.diffuseTexture = videoTexture;
    childMesh.material = material;
}

// // Function to create and apply a temporary material
// function applyTemporaryMaterial(childMesh, scene,) {
//     const tempMaterial = new BABYLON.StandardMaterial("TempMaterial", scene);
//     tempMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
//     childMesh.material = tempMaterial;
// }
function createAboutSection(scene, parent, textInfoArray) {
    const textPlanes = [];

    for (const textInfo of textInfoArray) {
        const { font, fontWeight, planeSize, text, color, backgroundColor, position } = textInfo;
        const textPlane = CreateText(scene, font, fontWeight, planeSize, text, color, backgroundColor, position);
        textPlane.parent = parent;
        textPlanes.push(textPlane);
    }

    return textPlanes;
}

export function MeshImport(scene) {
    BABYLON.SceneLoader.ImportMesh(
        '',
        '/',
        'Assets/mesh/UpdatedRoom.glb',
        scene,
        function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                var importedMesh = meshes[i];

                for (var j = 0; j < importedMesh.getChildren().length; j++) {
                    var childMesh = importedMesh.getChildren()[j];

                    if (childMesh.name === "LOGO") {
                        applyEmissiveMaterial(childMesh, scene, new BABYLON.Color3(1, 0, 0), 3.0, 32);
                    }

                    if (childMesh.name === "Picture (1)") {
                        applyTextureMaterial(childMesh, scene, 'Assets/Textures/Luffy.jpg', false);
                    }

                    if (childMesh.name === "Picture (2)") {
                        const videoElement = document.getElementById("videoElement");
                        applyVideoTextureMaterial(childMesh, scene, videoElement);
                    }

                    if (childMesh.name === "Display (2)") {
                        applyTextureMaterial(childMesh, scene, 'Assets/Textures/ProjectsFolderTexture.jpg', false);

                        //Add Project Folder as Display(1)'s child
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, -0.65), ["Employee of", "the month"], childMesh, "https://youtu.be/g0CAMf-SrMk");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, -0.45), ["IOT App"], childMesh, "https://youtu.be/-D93kXcDu3g");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, -0.25), ["Sophia"], childMesh);
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, -0.05), ["Harvest", "Roti"], childMesh);
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, 0.15), ["Water", "Rescue"], childMesh, "https://drive.google.com/drive/folders/1_hCOP9CbLuvwHi7_9D6Kwrnls6nVA79o?usp=sharing");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, 0.35), ["Space", "Rash"], childMesh, "https://github.com/DeepanshuManocha/Space-Rash");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, 0.55), ["Survivor"], childMesh);
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.65, 0.75), ["Creator"], childMesh, "https://youtu.be/CxlPZYUYvuA");

                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, -0.65), ["Old", "Engine"], childMesh, "https://drive.google.com/drive/folders/1RaNl268GTW31Q-zdLbc3Vv9641sF_fOH");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, -0.45), ["Alien", "World"], childMesh);
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, -0.25), ["Ar Dino", "Book"], childMesh, "https://www.linkedin.com/posts/deepanshu-manocha-aaa620169_museums-pandemic-academic-activity-6736856774479024128-3Sxq/");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, -0.05), ["Ar Auto", "Expo"], childMesh, "https://youtu.be/_XRbJGHXQRU");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, 0.15), ["Double S:", "Simulated", "Stereo"], childMesh, "https://simulated-stereo.web.app/");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, 0.35), ["Covid", "Visualizer"], childMesh, "https://github.com/surenderkumarrajput/Major-Hololens/tree/main");
                        ProjectFolderImport(scene, new BABYLON.Vector3(0, -0.25, 0.55), ["Phonify", "life"], childMesh, "https://www.youtube.com/watch?v=mlBRJ8PTDbY");
                    }

                    if (childMesh.name === "Display (1)") {
                        //Adding Bg tex as unity editor
                        applyTextureMaterial(childMesh, scene, 'Assets/Textures/T_UnityEditor.jpg', false);

                        //Creating Plane for DP
                        var plane = BABYLON.MeshBuilder.CreatePlane("DP", { width: 0.55 * 1.25, height: 1.25 }, scene);
                        plane.position = new BABYLON.Vector3(0, -0.08, 0.41);
                        plane.parent = childMesh;
                        plane.rotation.y = Math.PI / 2;
                        plane.rotation.z = Math.PI;

                        //Applying DP Texture to plane
                        applyTextureMaterial(plane, scene, "Assets/Textures/T_DP.png", true);

                        //Adding About Section
                        const parent = new BABYLON.Mesh("parent", scene);

                        const aboutTextInfo = [
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.1, text: "Hello I'm", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.03, -0.32, -0.3) },
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.16, text: "Deepanshu", color: "#ff0000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.03, -0.48, -0.3) },
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.16, text: "Manocha", color: "#ff0000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.03, -0.61, -0.3) },
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.059, text: "An Experienced Game and AR/VR", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.1, -0.92, -0.3) },
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.059, text: "Developer based in Delhi/NCR, with over", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.1, -0.98, -0.3) },
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.1, text: "5 years", color: "#ff0000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(-0.06, -1.06, -0.3) },
                            { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.059, text: "of experiences.", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.23, -1.06, -0.3) },
                        ];
                        const textPlanes = createAboutSection(scene, parent, aboutTextInfo);

                        parent.parent = childMesh;
                        parent.position = new BABYLON.Vector3(0, -0.75, -0.47);
                        parent.rotation = new BABYLON.Vector3(0, Math.PI / 2, Math.PI)

                    }
                    if (childMesh.name === "Tv Screen") {
                        SlideShowImport(scene, childMesh);
                    }

                    if (childMesh.name === "Tagline") {
                        applyEmissiveMaterial(childMesh, scene, new BABYLON.Color3(0, 1, 1), 3.0, 15);
                    }
                    if (childMesh.name === "Right Wall Picture") {
                        applyTextureMaterial(childMesh, scene, 'Assets/Textures/T_CareerPath.jpg', false);
                    }
                }
            }
        }
    );
}
