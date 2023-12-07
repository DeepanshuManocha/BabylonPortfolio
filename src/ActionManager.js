import * as BABYLON from '@babylonjs/core';

export function OnHoverEnter(actionManager, callBack) {
    actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            callBack
        )
    );
}
export function OnHoverExit(actionManager, callBack) {
    actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            callBack
        )
    );

}
export function OnPointerClick(actionManager, callBack) {
    actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            callBack
        )
    );
}