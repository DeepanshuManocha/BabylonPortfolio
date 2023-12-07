import * as BABYLON from '@babylonjs/core';


const imageUrls = [
    'Assets/Textures/TV/VRGloves.jpg',
    'Assets/Textures/TV/IAS Team.jpg',
    'Assets/Textures/TV/IAS_Chair.jpg',
    'Assets/Textures/TV/IISF.jpg',
    'Assets/Textures/TV/Screenshot_4.png',
    'Assets/Textures/TV/Screenshot_1.jpg',
    'Assets/Textures/TV/Screenshot_5.jpg',
    'Assets/Textures/TV/STA.jpg',
    'Assets/Textures/TV/TreePlantation.jpg',
    'Assets/Textures/TV/CleanessDrive.jpg',

];

export function SlideShowImport(scene, childMesh) {
    const material = new BABYLON.StandardMaterial('material', scene);
    childMesh.material = material;

    let currentImageIndex = 0;
    // Function to change the image
    const changeImage = () => {
        material.diffuseTexture = new BABYLON.Texture(imageUrls[currentImageIndex], scene);
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    };

    // Call changeImage initially
    changeImage();

    // Set up a timer to change the image every 3 seconds (adjust as needed)
    setInterval(changeImage, 3000);
}