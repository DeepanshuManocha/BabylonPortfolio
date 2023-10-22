import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export function SkillFrameImport(scene, meshPath, position, scale, texturePath) {
    BABYLON.SceneLoader.ImportMesh(
        '',
        '/',
        meshPath,
        scene,
        function (meshes) {
            // Set Position
            meshes[0].position = position; // Set the position of the first loaded mesh

            // Set Scale
            meshes[0].scaling = scale; // Set the scale of the first loaded mesh

            //Apply Texture
            var texture = new BABYLON.Texture(texturePath, scene);
            var material = new BABYLON.StandardMaterial("MaterialWithTexture", scene);
            material.diffuseTexture = texture;
            // meshes[2].material = material;


            // Add hover animations
            const skillFrameMesh = meshes[2];

            var defaultPos = meshes[0].position.clone();

            // Add hover animations
            skillFrameMesh.actionManager = new BABYLON.ActionManager(scene);
            skillFrameMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                        // Move the mesh slightly forward on hover
                        skillFrameMesh.parent.position.z = defaultPos.z - 0.1;
                    }
                )
            );
            skillFrameMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                        // Move the mesh back to its default position on mouse out
                        skillFrameMesh.parent.position.z = defaultPos.z;
                    }
                )
            );
            document.addEventListener("touchend", function (evt) {
                skillFrameMesh.parent.position.z = defaultPos.z;
            });
        }
    );
}
