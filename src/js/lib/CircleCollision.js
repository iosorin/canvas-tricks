import { Ball } from './helpers/Ball';
import { Mouse } from './helpers/Mouse';

export default class CircleCollisionEffect {
    constructor(canvas) {
        this.outerRadius = 200;
        this.innerRadius = 50;
        this.mouseRadius = 30;
        this.borderColor = '#000000';
        this.mouseColor = '#171717';
        this.innerColor = '#ffff00';

        this.size = this.outerRadius * 3;
        this.center = this.size / 2;
        this.scale = 1.00;
        this.initialWW = window.innerWidth;

        this.canvas = canvas;
        this.rect = canvas.getBoundingClientRect();
        this.ctx = this.getContextAndSetRatio();
    }

    getContextAndSetRatio() {
        const ctx = this.canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = this.rect.width * dpr;
        this.canvas.height = this.rect.height * dpr;

        ctx.scale(dpr, dpr);

        return ctx;
    }

    resize() {
        this.scale = window.innerWidth / this.initialWW;

        this.canvas.style.width = `${this.size * this.scale}px`;

        this.rect = this.canvas.getBoundingClientRect();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    render() {
        window.requestAnimationFrame(() => this.render());

        this.ctx.clearRect(0, 0, this.size, this.size);

        this.OUTER.limit(this.MousePosition);
        this.OUTER.draw(this.ctx);

        // this.INNER.jellyThink(this.MousePosition);
        this.INNER.think(this.MousePosition);
        this.INNER.draw(this.ctx);

        this.MOUSE.setPos(this.MousePosition);
        this.MOUSE.draw(this.ctx);
    }

    init() {
        this.MousePosition = new Mouse(this.canvas, this.scale);

        this.OUTER = new Ball(this.center, this.center, this.outerRadius, this.borderColor, 'rgba(0, 0, 0, 0)');
        this.INNER = new Ball(this.center, this.center, this.innerRadius, this.borderColor, this.innerColor);
        this.MOUSE = new Ball(this.center, this.center, this.mouseRadius, null, this.mouseColor);

        this.resize();
        this.bindEvents();
        this.render();
    }
}
