import * as BABYLON from '@babylonjs/core';

export default function setupCameraScroll(canvas, scene, camera) {
    let currentTargetIndex = 0;
    let scrolling = false;
    const animationDuration = 2000; // 2 seconds
    const frameRate = 60; // frames per second


    const pointsOfInterest = [
        {
            position: new BABYLON.Vector3(-5, 1.2, -1.314),
            rotation: new BABYLON.Vector3(Math.PI / 27.69, Math.PI / 2, 0),
        },
        {
            position: new BABYLON.Vector3(-1.105, 0.406, 0.754),
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
            position: new BABYLON.Vector3(-1.7, 1.35, -2),
            rotation: new BABYLON.Vector3(0, 2 * Math.PI, 0),
        }
    ];

    function moveToTarget(targetIndex) {
        if (targetIndex >= 0 && targetIndex < pointsOfInterest.length) {

            const target = pointsOfInterest[targetIndex];

            const startPosition = camera.position.clone();
            const startRotation = camera.rotation.clone();
            const startTime = Date.now();

            const easeFunction = new BABYLON.ExponentialEase();
            easeFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

            scene.registerBeforeRender(() => {
                const elapsed = Date.now() - startTime;
                const t = Math.min(1, elapsed / animationDuration);
                scrolling = true;
                camera.position = BABYLON.Vector3.Lerp(startPosition, target.position, easeFunction.ease(t));
                camera.rotation = BABYLON.Vector3.Lerp(startRotation, target.rotation, easeFunction.ease(t));

                if (t === 1) {
                    currentTargetIndex = targetIndex;
                    scene.unregisterBeforeRender(moveToTarget); // Unregister the function after the animation is complete
                    scrolling = false;
                }
            });

            scene.getEngine().setHardwareScalingLevel(1 / (frameRate / scene.getEngine().getFps()));
        }
    }

    function handleScroll(deltaY) {
        if (!scrolling) {
            if (deltaY > 0) {
                moveToTarget(currentTargetIndex === pointsOfInterest.length - 1 ? 0 : currentTargetIndex + 1);
                // scrolling = true;
            } else if (deltaY < 0 && currentTargetIndex !== 0) {
                moveToTarget(currentTargetIndex - 1);
                // scrolling = true;
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
        handleScroll,
    };
}