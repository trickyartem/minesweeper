import {canvas}                   from "./canvas";
import Game_field                 from "./game_field";

let length = 50;
let game_field: Array<Game_field> = [];

const init = () => {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            game_field.push(new Game_field(x * length, y * length, length, '#BBADAA'));
        }
    }
};

export const change_cell_color = (index: number) => {
    game_field[index].color = 'green';
};

const animate = () => {
    const {c} = canvas;

    c.clearRect(0, 0, canvas.c.canvas.width, canvas.c.canvas.height);

    for (const cell of game_field) {
        cell.display();
    }

    requestAnimationFrame(animate);
};

init();
animate();
