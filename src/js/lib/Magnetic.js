import { TweenMax, Power2, Elastic } from 'gsap';

export default class MagneticEffect {
    constructor(el = false) {
        this.elem = el;

        if (!this.elem) {
            this.elem = document.getElementById('magnetic-target');
        }

        this.cursor = {
            x: 0,
            y: 0
        };

        this.bounds = this.elem.getBoundingClientRect();

        this.size = {
            height: this.bounds.height,
            width: this.bounds.width,
        };

        this.center = {
            x: 0,
            y: 0
        };

        this.x = 0;
        this.y = 0;
        this.dist = 0;
        this.holdDistanсе = 100;
        this.isHover = 0;
        this.state = false;
    }

    cursorPosition(e) {
        this.cursor = {
            x: e.clientX,
            y: e.clientY
        };
    }

    listener() {
        this.bounds = this.elem.getBoundingClientRect();

        this.center = {
            x: this.bounds.left + (this.size.width / 2),
            y: this.bounds.top + (this.size.height / 2)
        };

        this.x = this.cursor.x - this.center.x;
        this.y = this.cursor.y - this.center.y;
        this.dist = Math.sqrt(this.x * this.x + this.y * this.y);

        this.isHover = this.dist < (this.size.width / 2) + this.holdDistanсе;

        if (this.isHover) {
            this.on();
        } else if (this.state && !this.isHover) {
            this.off();
        }
    }

    on() {
        TweenMax.to(this.elem, 0.5, {
            x: this.x * 0.8,
            y: this.y * 0.8,
            skewX: this.x > 0 ? this.x * 0.125 : this.x * -0.125,
            scale: 1.1,
            rotation: this.x * 0.15,
            ease: Power2.easeOut
        });
        this.state = true;
    }

    off() {
        TweenMax.to(this.elem, 1, {
            x: 0,
            y: 0,
            rotation: 0,
            skewX: 0,
            skewY: 0,
            scale: 1,
            ease: Elastic.easeOut.config(1.2, 0.4)
        });

        this.state = false;
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.cursorPosition(e);
            this.listener();
        });
    }
}
