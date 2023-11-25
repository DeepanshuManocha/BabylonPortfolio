import * as BABYLON from '@babylonjs/core';
import { CreateText } from './CreateText';
import { OnHoverEnter, OnHoverExit, OnPointerClick } from './ActionManager';

export function ProjectFolderImport(scene, position, text, projectParent, linkToOpen) {
    // Create a parent mesh
    const parent = new BABYLON.Mesh("parent", scene);

    // Create a plane
    const folderPlane = BABYLON.Mesh.CreatePlane("FolderIcon", 5, scene);
    folderPlane.position = new BABYLON.Vector3(0, 0, 0);
    folderPlane.scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
    folderPlane.parent = parent;
    folderPlane.position.x = 0.03

    // Load a transparent PNG texture
    const texture = new BABYLON.Texture("/Assets/Textures/FolderIcon.png", scene);

    // Enable the alpha channel for the material
    folderPlane.material = new BABYLON.StandardMaterial("planeMaterial", scene);
    folderPlane.material.diffuseTexture = texture;
    folderPlane.material.diffuseTexture.hasAlpha = true; // Enable alpha channel
    folderPlane.material.useAlphaFromDiffuseTexture = true; // Use alpha channel from texture

    //Create Text
    for (var i = 0; i < text.length; i++) {
        var textPlane = CreateText(scene, "Poppins", "bold ", 0.05, [text[i]], "#ffffff", "#202020", new BABYLON.Vector3(0.03, -0.14 - (0.05 * i), 0));
        textPlane.parent = parent;
    }

    // Rotation adjustments
    parent.rotation.y = Math.PI / 2;
    parent.rotation.z = Math.PI;
    parent.position = position;

    // SetParent
    parent.parent = projectParent;

    let defaultPos = folderPlane.position.clone();

    folderPlane.actionManager = new BABYLON.ActionManager(scene);

    // Add hover animations
    OnHoverEnter(folderPlane.actionManager, () => {
        // Move the mesh slightly forward on hover
        folderPlane.position.z = defaultPos.z - 1;
        folderPlane.position.x = defaultPos.x - 0.01;
    });
    OnHoverExit(folderPlane.actionManager, () => {
        // Move the mesh back to its default position on mouse out
        folderPlane.position.z = defaultPos.z;
        folderPlane.position.x = defaultPos.x;
    });
    OnPointerClick(folderPlane.actionManager, () => {
        // Check if linkToOpen is not null or empty before opening in a new tab
        if (linkToOpen && linkToOpen.trim() !== "") {
            window.open(linkToOpen, "_blank");
        } else {
            console.log("Sorry, either the project video is currently unavailable, or I don't have the rights to share detailed project information.\n\nThank you for your understanding.");
            window.alert("Sorry, either the project video is currently unavailable, or I don't have the rights to share detailed project information.\n\nThank you for your understanding.");
        }
    });

    document.addEventListener("touchend", function (evt) {
        // Move the mesh back to its default position on touchend
        folderPlane.position.z = defaultPos.z;
        folderPlane.position.x = defaultPos.x;
    });

}