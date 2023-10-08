import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

// Function to create and apply an emissive material with a glow layer
function applyEmissiveMaterial(childMesh, scene) {
    var emissiveMaterial = new BABYLON.StandardMaterial("emissiveMaterial", scene);
    emissiveMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0); // Set the color of the glow
    childMesh.material = emissiveMaterial;

    var glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.addIncludedOnlyMesh(childMesh);
    glowLayer.intensity = 3.0; // Adjust the intensity as needed
    glowLayer.blurKernelSize = 32; // Adjust the blur size as needed
}

// Function to create and apply a material with a texture
function applyTextureMaterial(childMesh, scene, texturePath) {
    var texture = new BABYLON.Texture(texturePath, scene);
    var material = new BABYLON.StandardMaterial("MaterialWithTexture", scene);
    material.diffuseTexture = texture;
    childMesh.material = material;
}

// Function to create and apply a material with a video texture
function applyVideoTextureMaterial(childMesh, scene, videoElement) {
    const videoTexture = new BABYLON.VideoTexture("VideoTexture", videoElement, scene);
    const material = new BABYLON.StandardMaterial("MaterialWithVideoTexture", scene);
    material.diffuseTexture = videoTexture;
    childMesh.material = material;
}

// Function to create and apply a temporary material
function applyTemporaryMaterial(childMesh, scene) {
    const tempMaterial = new BABYLON.StandardMaterial("TempMaterial", scene);
    tempMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    childMesh.material = tempMaterial;
}

export function MeshImport(scene) {
    BABYLON.SceneLoader.ImportMesh(
        '',
        '/',
        'mesh/Room.glb',
        scene,
        function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                var importedMesh = meshes[i];

                for (var j = 0; j < importedMesh.getChildren().length; j++) {
                    var childMesh = importedMesh.getChildren()[j];

                    if (childMesh.name === "LOGO") {
                        applyEmissiveMaterial(childMesh, scene);
                    }

                    if (childMesh.name === "Picture (1)") {
                        applyTextureMaterial(childMesh, scene, 'mesh/Textures/Luffy.jpg');
                    }

                    if (childMesh.name === "Picture (2)") {
                        const videoElement = document.getElementById("videoElement");
                        applyVideoTextureMaterial(childMesh, scene, videoElement);
                    }

                    if (childMesh.name === "Display (2)" || childMesh.name === "Display (1)") {
                        applyTemporaryMaterial(childMesh, scene);
                    }
                }
            }
        }
    );
}
