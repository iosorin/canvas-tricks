export class Mouse {
    constructor(canvas, scale = 1) {
        this.x = 0;
        this.y = 0;

        canvas.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();

            this.x = parseInt((e.clientX - (rect.left + window.scrollX)) / scale);
            this.y = parseInt((e.clientY - (rect.top + window.scrollY)) / scale);
        };
    }
}
