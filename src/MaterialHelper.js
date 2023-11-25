import * as BABYLON from '@babylonjs/core';

// Function to create and apply an emissive material with a glow layer
export function applyEmissiveMaterial(childMesh, scene, color, intensity, blurKernelSize) {
    var emissiveMaterial = new BABYLON.StandardMaterial("emissiveMaterial", scene);
    emissiveMaterial.emissiveColor = color // Set the color of the glow
    childMesh.material = emissiveMaterial;

    var glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.addIncludedOnlyMesh(childMesh);
    glowLayer.intensity = intensity; // Adjust the intensity as needed
    glowLayer.blurKernelSize = blurKernelSize; // Adjust the blur size as needed
}

// Function to create and apply a material with a texture
export function applyTextureMaterial(childMesh, scene, texturePath, bool) {
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
export function applyVideoTextureMaterial(childMesh, scene, videoElement) {
    const videoTexture = new BABYLON.VideoTexture("VideoTexture", videoElement, scene);
    const material = new BABYLON.StandardMaterial("MaterialWithVideoTexture", scene);
    material.diffuseTexture = videoTexture;
    childMesh.material = material;
}