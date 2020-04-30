import { Ball } from './helpers/Ball';
import { Mouse } from './helpers/Mouse';

export default class JellyEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.balls = [];
        this.maxBalls = 50;
        this.mouseColor = '#171717';
        this.mouseRadius = 30;
        this.dotsColor = "#ffff00";
    }

    createBalls() {
        for (var i = 0; i < this.maxBalls; i++) {
            const x = 290 + 100 * Math.cos(i * 2 * Math.PI / 50);
            const y = 290 + 100 * Math.sin(i * 2 * Math.PI / 50);

            this.balls.push(new Ball(x, y));
        }
    }

    connectDots(dots) {
        this.ctx.beginPath();

        for (var i = 0, jlen = dots.length; i <= jlen; ++i) {
            var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0];
            var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1];

            this.ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
        }

        this.ctx.closePath();
        this.ctx.fillStyle = this.dotsColor;
        this.ctx.fill();
    }

    render() {
        window.requestAnimationFrame(() => this.render());

        this.ctx.clearRect(0, 0, 600, 600);

        this.MOUSE.setPos(this.MousePosition.x, this.MousePosition.y);
        this.MOUSE.draw(this.ctx);

        this.balls.forEach((ball) => {
            ball.jellyThink(this.MousePosition);
            ball.draw(this.ctx);
        });

        this.connectDots(this.balls);
    }

    init() {
        this.MOUSE = new Ball(0, 0, this.mouseRadius, this.mouseColor);
        this.MousePosition = new Mouse(this.canvas);

        this.createBalls();

        this.render();
    }
}
