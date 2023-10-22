import * as BABYLON from '@babylonjs/core';

export default function setupCameraScroll(canvas, scene, camera) {
    let currentTargetIndex = 0;
    let scrolling = false;

    const pointsOfInterest = [
        {
            position: new BABYLON.Vector3(-5, 1.2, -1.314),
            rotation: new BABYLON.Vector3(Math.PI / 27.69, Math.PI / 2, 0),
        },
        {
            position: new BABYLON.Vector3(-1.1, 0.45, 0.8),
            rotation: new BABYLON.Vector3(0, Math.PI / 2, 0),
        },
        {
            position: new BABYLON.Vector3(-1.49, 1.5, -2.8),
            rotation: new BABYLON.Vector3(0, Math.PI, 0),
        },
        {
            position: new BABYLON.Vector3(1.8, 1, -2.8),
            rotation: new BABYLON.Vector3(Math.PI / 27.69, 2 * Math.PI / 1.333, 0),
        },
        {
            position: new BABYLON.Vector3(-1.7, 1.35, -1.1),
            rotation: new BABYLON.Vector3(0, 2 * Math.PI, 0),
        }
    ];

    function moveToTarget(targetIndex) {
        if (targetIndex >= 0 && targetIndex < pointsOfInterest.length) {
            const target = pointsOfInterest[targetIndex];

            // Calculate rotation animation
            const rotationAnimation = new BABYLON.Animation('cameraRotation', 'rotation', 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            const rotationKeys = [];
            rotationKeys.push({
                frame: 0,
                value: camera.rotation.clone()
            });
            rotationKeys.push({
                frame: 100,
                value: target.rotation.clone()
            });
            rotationAnimation.setKeys(rotationKeys);
            camera.animations.push(rotationAnimation);

            // Calculate position animation
            const positionAnimation = new BABYLON.Animation('cameraPosition', 'position', 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT, new BABYLON.CircleEase);
            const positionKeys = [];
            positionKeys.push({
                frame: 0,
                value: camera.position.clone()
            });
            positionKeys.push({
                frame: 100,
                value: target.position.clone()
            });
            positionAnimation.setKeys(positionKeys);
            camera.animations.push(positionAnimation);

            scene.beginAnimation(camera, 0, 100, false, 1.0, () => {
                scrolling = false;
                currentTargetIndex = targetIndex;
            });
        }
    }

    function handleScroll(deltaY) {
        if (!scrolling) {
            if (deltaY > 0) {
                moveToTarget(currentTargetIndex === pointsOfInterest.length - 1 ? 0 : currentTargetIndex + 1);
                scrolling = true;
            } else if (deltaY < 0 && currentTargetIndex !== 0) {
                moveToTarget(currentTargetIndex - 1);
                scrolling = true;
            }
        }
    }
    // Add touch events for mobile
    let touchStartY = 0;
    canvas.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    });

    canvas.addEventListener('touchmove', (event) => {
        const touchEndY = event.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;
        handleScroll(-deltaY);
        touchStartY = touchEndY;
    });

    canvas.addEventListener('touchend', () => {
        touchStartY = 0;
    });

    // Add wheel event for desktop
    canvas.addEventListener('wheel', (event) => {
        const deltaY = event.deltaY;
        handleScroll(deltaY);
    });

    return {
        moveToTarget,
        handleScroll
    };
}