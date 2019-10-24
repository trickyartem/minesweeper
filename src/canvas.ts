import {get_cell_index, mouse} from "./utils-and-consts";
import {change_cell_color}     from "./index";

class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');
    private readonly div = document.getElementById('canvas');

    constructor() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = "0px";
        this.canvas.style.left = "0px";

        this.canvas.addEventListener('click', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            let index: number = get_cell_index(mouse);

            if (index >= 0) {
                change_cell_color(index);
            } else {
                return;
            }
        });

        this.div.appendChild(this.canvas);
    }
}

export const canvas = new Canvas();
