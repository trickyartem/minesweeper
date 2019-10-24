import {canvas} from "./canvas";

export default class Game_field {
    constructor(public x: number, public y: number, public radius: number, public color: string) {
        this.radius -= 5;
    }

    display() {
        const {c} = canvas;

        c.beginPath();
        c.shadowBlur = 10;
        c.shadowOffsetX = 2;
        c.shadowOffsetY = 2;
        c.shadowColor = "rgba(0, 0, 0, 0.9)";
        c.fillStyle = this.color;
        c.rect(this.x, this.y, this.radius, this.radius);
        c.fill();
        c.closePath();
    }
}
