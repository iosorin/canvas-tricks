export class Ball {
    constructor(x, y, radius, border, color = '#000') {
        this.x = x || 0;
        this.y = y || 0;

        this.originalX = x || 0;
        this.originalY = y || 0;

        this.radius = radius || 2;
        this.color = color;
        this.border = border || color;
        this.vx = 0;
        this.vy = 0;

        this.toughness = 30;
        this.friction = 0.5;

        this.springFactor = 0.1;
    }

    setPos(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    circleCollision(c1) {
        let val;

        let dx = this.x - this.originalX;
        let dy = this.y - this.originalY;
        let angle = Math.atan2(dy, dx);
        let dist = Math.sqrt(dx * dx + dy * dy);

        dist >= this.radius - c1 ? val = angle : val = null;

        return val;
    }

    mouseCollision(pos, c1) {
        let st;
        let val;

        let dx = this.x - pos.x;
        let dy = this.y - pos.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);

        let c2 = 30;

        c1 === this.radius ? st = dist >= c1 : st = dist <= c1 + c2;

        st ? val = angle : val = null;

        return val;
    }

    limit(pos) {
        let angle = this.mouseCollision(pos, this.radius);

        if (angle) {
            pos.x = -Math.cos(angle) * this.radius + this.originalX;
            pos.y = -Math.sin(angle) * this.radius + this.originalY;
        }
    }

    think(pos) {
        let angle = this.mouseCollision(pos, 50);
        let borderAngle = this.circleCollision(50);

        // const tough = this.springBack ? (this.toughness / 110) : this.toughness;

        if (angle) {
            let tx = pos.x + Math.cos(angle) * this.toughness;
            let ty = pos.y + Math.sin(angle) * this.toughness;

            this.vx += tx - this.x;
            this.vy += ty - this.y;
        }

        if (borderAngle) {
            let tx = this.originalX + Math.cos(borderAngle) * (this.toughness + 30);
            let ty = this.originalY + Math.sin(borderAngle) * (this.toughness + 30);

            this.vx += tx - this.x;
            this.vy += ty - this.y;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    jellyThink(mouse) {
        console.log('mouse', mouse);
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        // interaction
        if (dist < 30) {
            const angle = Math.atan2(dy, dx);
            const tx = mouse.x + Math.cos(angle) * this.toughness;
            const ty = mouse.y + Math.sin(angle) * this.toughness;

            this.vx += tx - this.x;
            this.vy += ty - this.y;
        }

        // spring back
        const dx1 = -(this.x - this.originalX);
        const dy1 = -(this.y - this.originalY);

        this.vx += dx1 * this.springFactor;
        this.vy += dy1 * this.springFactor;


        // friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // actual move
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.border;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
