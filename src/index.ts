import {canvas}                from "./canvas";
import GameField               from "./game_field";
import {get_cell_index, mouse} from "./utils";
import imageBomb, {numbers}    from './imagesToExport';

let length = 50;
let gameField: Array<GameField> = [];
let bombsOnTheField = 10;
const totalCells = 100;
let pressedCells = 0;
let lastCell: number;

const init = (bombsOnTheField: number) => {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            gameField[x * 10 + y] = new GameField(x * length, y * length, {radius: length, color: '#CA6F1E', x, y});
        }
    }
    const resetButton = document.getElementById('reset-button');
    const changeButton = document.getElementById('change-button');
    resetButton.addEventListener('click', () => {
        init(bombsOnTheField);
    });
    changeButton.addEventListener('click', () => {
        const input = document.getElementById('input');
        bombsOnTheField = Number(input.innerText);
    });

    fillFieldWithBombs(bombsOnTheField);
};

const fillFieldWithBombs = (howMany: number) => {
    let random: Array<number> = [];
    for(let i = 0; i < howMany; i++){
        let index = Math.floor(Math.random() * 100);
        if(random.indexOf(index) == -1){
            gameField[index].mine = true;
            random[i] = index;
        }
        else {
            i--;
        }
    }
};

const change_cell_color = (index: number) => {
    if (gameField[index].mine) {
        gameField[index].imageStr = imageBomb;
        alert('You Lost');
        init(bombsOnTheField);
    } else {
        if (index !== lastCell) {
            pressedCells++;
            const how_many = gameField[index].minesAround(gameField);
            lastCell = index;

            gameField[index].imageStr = numbers[how_many];
            if (how_many === 0) {
                gameField[index].openFreeSpace(gameField);
            }

            if (totalCells - pressedCells === 0) {
                alert('You won');
            }
        }
    }
};

canvas.canvas.addEventListener('click', (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const index: number = get_cell_index(mouse);

    if (index >= 0) {
        change_cell_color(index);
    } else {
        return;
    }
});

const animate = () => {
    const {c} = canvas;

    c.clearRect(0, 0, canvas.c.canvas.width, canvas.c.canvas.height);

    for (const cell of gameField) {
        cell.display();
    }
    requestAnimationFrame(animate);
};

init(bombsOnTheField);
animate();
