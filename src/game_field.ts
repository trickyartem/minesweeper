import {canvas}              from "./canvas";
import {facingDown, numbers} from "./imagesToExport";

interface GameFieldOptions {
    radius?: number;
    color?: string;
    x: number;
    y: number;
}

export default class GameField {
    readonly radius: number;
    color: string;
    mine: boolean;
    readonly posX: number;
    readonly posY: number;
    private readonly image = new Image();
    imageStr: string = facingDown;

    constructor(public x: number, public y: number, public options: GameFieldOptions) {
        this.radius = options.radius || 50;
        this.color = options.color || '#BBADAA';
        this.posX = options.x;
        this.posY = options.y;
        this.mine = false;
    }

    display() {
        const {c} = canvas;
        c.beginPath();
        this.drawImage(this.imageStr, this.x, this.y, this.radius, this.radius);
        c.closePath();
    }

    minesAround(cells: Array<GameField>) {
        let count = 0;
        let x = -1;
        let y = -1;

        while (x !== 2 && y != 2) {
            let i = this.posX + x;
            let j = this.posY + y;
            let index = i * 10 + j;
            if (index >= 0 && index <= 99) {
                if (cells[i * 10 + j].mine) {
                    count++;
                }
            }
            x++;

            if (x > 1) {
                y++;
                if (y > 1) {
                    break;
                }
                x = -1;
            }
        }

        return count;
    }

    openFreeSpace(cells: Array<GameField>) {
        let x = -1;
        let y = -1;

        while (x !== 10 && y != 10) {
            let i = this.posX + x;
            let j = this.posY + y;
            let index = i * 10 + j;
            if (i !== 10 && j !== 10) {
                if (index >= 0 && index <= 99) {
                    if (cells[i * 10 + j].minesAround(cells) === 0) {
                        cells[i * 10 + j].imageStr = numbers[0];
                    }
                }
            }

            x++;

            if (x > 9) {
                y++;
                if (y > 9) {
                    break;
                }
                x = -1;
            }
        }
    }

    drawImage(source: string,x: number, y:number ,width: number, height: number) {
        this.image.src = source;
        canvas.c.drawImage(this.image, x, y, width, height);
    }
}
