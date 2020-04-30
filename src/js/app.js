import sayHello from './lib/sayHello';

import JellyEffect from './lib/Jelly';
import MagneticEffect from './lib/Magnetic';
import CircleCollisionEffect from './lib/CircleCollision';

function init() {
    const magneticTarget = document.getElementById('magnetic-target');
    const collisionCanvas = document.getElementById('circle-collision-canvas');
    const jellyCanvas = document.getElementById('jelly-canvas');

    if (magneticTarget) {
        (new MagneticEffect(magneticTarget)).init();
    }

    if (collisionCanvas) {
        (new CircleCollisionEffect(collisionCanvas)).init();
    }

    if (jellyCanvas) {
        (new JellyEffect(jellyCanvas)).init();
    }

    sayHello();
};

document.addEventListener("DOMContentLoaded", init);
