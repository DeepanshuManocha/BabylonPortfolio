import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { ProjectFolderImport } from './ProjectFolder';
import { SlideShowImport } from './SlideShow';
import { CreateText } from './CreateText';
import { OnHoverEnter, OnHoverExit } from './ActionManager';
import { applyEmissiveMaterial, applyTextureMaterial, applyVideoTextureMaterial } from './MaterialHelper';
import { getAssetPath } from './FilePath';

// Function to setup project folders on a mesh
function setupProjectFolders(mesh, scene) {
    const projectData = [
        { title: ["Employee of", "the month"], position: new BABYLON.Vector3(0, -0.65, -0.65), link: "https://youtu.be/g0CAMf-SrMk" },
        { title: ["IOT App"], position: new BABYLON.Vector3(0, -0.65, -0.45), link: "https://youtu.be/-D93kXcDu3g" },
        { title: ["Sophia"], position: new BABYLON.Vector3(0, -0.65, -0.25), link: null },
        { title: ["Harvest", "Roti"], position: new BABYLON.Vector3(0, -0.65, -0.05), link: null },
        { title: ["Water", "Rescue"], position: new BABYLON.Vector3(0, -0.65, 0.15), link: "https://drive.google.com/drive/folders/1_hCOP9CbLuvwHi7_9D6Kwrnls6nVA79o?usp=sharing" },
        { title: ["Space", "Rash"], position: new BABYLON.Vector3(0, -0.65, 0.35), link: "https://github.com/DeepanshuManocha/Space-Rash" },
        { title: ["Survivor"], position: new BABYLON.Vector3(0, -0.65, 0.55), link: null },
        { title: ["Creator"], position: new BABYLON.Vector3(0, -0.65, 0.75), link: "https://youtu.be/CxlPZYUYvuA" },
        { title: ["Old", "Engine"], position: new BABYLON.Vector3(0, -0.25, -0.65), link: "https://drive.google.com/drive/folders/1RaNl268GTW31Q-zdLbc3Vv9641sF_fOH" },
        { title: ["Alien", "World"], position: new BABYLON.Vector3(0, -0.25, -0.45), link: null },
        { title: ["Ar Dino", "Book"], position: new BABYLON.Vector3(0, -0.25, -0.25), link: "https://www.linkedin.com/posts/deepanshu-manocha-aaa620169_museums-pandemic-academic-activity-6736856774479024128-3Sxq/" },
        { title: ["Ar Auto", "Expo"], position: new BABYLON.Vector3(0, -0.25, -0.05), link: "https://youtu.be/_XRbJGHXQRU" },
        { title: ["Double S:", "Simulated", "Stereo"], position: new BABYLON.Vector3(0, -0.25, 0.15), link: "https://simulated-stereo.web.app/" },
        { title: ["Covid", "Visualizer"], position: new BABYLON.Vector3(0, -0.25, 0.35), link: "https://github.com/surenderkumarrajput/Major-Hololens/tree/main" },
        { title: ["Phonify", "life"], position: new BABYLON.Vector3(0, -0.25, 0.55), link: "https://www.youtube.com/watch?v=mlBRJ8PTDbY" }
    ];

    projectData.forEach(({ title, position, link }) => {
        ProjectFolderImport(scene, position, title, mesh, link);
    });
}

// Function to create text planes for the About section
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

// Function to setup project folders on a mesh
function setupAboutSection(mesh, scene) {
    const aboutTextInfo = [
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.1, text: "Hello I'm", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.03, -0.32, -0.3) },
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.16, text: "Deepanshu", color: "#ff0000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.03, -0.48, -0.3) },
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.16, text: "Manocha", color: "#ff0000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.03, -0.61, -0.3) },
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.059, text: "An Experienced Game and AR/VR", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.1, -0.92, -0.3) },
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.059, text: "Developer based in Delhi/NCR, with over", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.1, -0.98, -0.3) },
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.1, text: "5 years", color: "#ff0000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(-0.06, -1.06, -0.3) },
        { font: 'Poppins', fontWeight: 'bold ', planeSize: 0.059, text: "of experiences.", color: "#000000", backgroundColor: "#ffffff", position: new BABYLON.Vector3(0.23, -1.06, -0.3) }
    ];
    //Adding About Section
    const parent = new BABYLON.Mesh("parent", scene);
    const textPlanes = createAboutSection(scene, parent, aboutTextInfo);

    parent.parent = mesh;
    parent.position = new BABYLON.Vector3(0, -0.75, -0.47);
    parent.rotation = new BABYLON.Vector3(0, Math.PI / 2, Math.PI)
}

// Function to setup the Display Picture (DP) section on a mesh
function setupDpSection(mesh, scene) {
    var plane = BABYLON.MeshBuilder.CreatePlane("DP", { width: 0.55 * 1.25, height: 1.25 }, scene);
    plane.position = new BABYLON.Vector3(0, -0.08, 0.41);
    plane.parent = mesh;
    plane.rotation.y = Math.PI / 2;
    plane.rotation.z = Math.PI;

    applyTextureMaterial(plane, scene, "Assets/Textures/T_DP.png", true);
}

// Function to setup hover actions on a mesh
function setupMeshActions(mesh, scene) {
    const defaultPos = mesh.position.clone();
    mesh.actionManager = new BABYLON.ActionManager(scene);

    OnHoverEnter(mesh.actionManager, () => {
        scene.hoverCursor = "default";
        mesh.position.y = defaultPos.y + 0.05;
    });
    OnHoverExit(mesh.actionManager, () => {
        scene.hoverCursor = "pointer";
        mesh.position.y = defaultPos.y;
    });
    document.addEventListener("touchend", () => {
        scene.hoverCursor = "pointer";
        mesh.position.y = defaultPos.y;
    });
}

// Function to apply specific actions to meshes based on their names
function meshActions(childMesh, scene) {
    const defaultPos = childMesh.position.clone();

    const meshActionMap = {
        "LOGO": () => applyEmissiveMaterial(childMesh, scene, new BABYLON.Color3(1, 0, 0), 3.0, 32),
        "Picture (1)": () => applyTextureMaterial(childMesh, scene, 'Assets/Textures/Luffy.jpg', false),
        "Picture (2)": () => {
            const videoElement = document.getElementById("videoElement");
            applyVideoTextureMaterial(childMesh, scene, videoElement);
        },
        "Display (2)": () => {
            //Apply texture to monitor
            applyTextureMaterial(childMesh, scene, 'Assets/Textures/ProjectsFolderTexture.jpg', false);

            //setup all the projects
            setupProjectFolders(childMesh, scene);
        },
        "Display (1)": () => {
            //Apply texture to monitor
            applyTextureMaterial(childMesh, scene, 'Assets/Textures/T_UnityEditor.jpg', false);

            setupDpSection(childMesh, scene);
            setupAboutSection(childMesh, scene);
        },
        "Tv Screen": () => SlideShowImport(scene, childMesh),
        "Tagline": () => applyEmissiveMaterial(childMesh, scene, new BABYLON.Color3(0, 1, 1), 3.0, 15),
        "Right Wall Picture": () => applyTextureMaterial(childMesh, scene, 'Assets/Textures/T_CareerPath.jpg', false),
        "Alchemist Book": () => setupMeshActions(childMesh, scene, defaultPos),
        "Tuesdays With Morrie Book": () => setupMeshActions(childMesh, scene, defaultPos)
    };

    if (meshActionMap[childMesh.name]) {
        meshActionMap[childMesh.name]();
    }
}

// Main function to import meshes and apply actions based on mesh names
export function MeshImport(scene, hideLoadingUI) {
    BABYLON.SceneLoader.ImportMeshAsync(
        '',
        '/',
        getAssetPath("mesh/UpdatedRoom.glb"),
        scene
    ).then(result => {
        result.meshes.forEach(mesh => {
            mesh.getChildren().forEach(childMesh => {
                meshActions(childMesh, scene);
            });
        });

        // Hide the loading UI once all meshes are processed
        hideLoadingUI();
    }).catch(error => {
        console.error("An error occurred while importing the mesh:", error);
        // You can also hide the loading UI here, or handle the error differently
        hideLoadingUI();
    });
}