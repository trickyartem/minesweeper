
export interface position {
    x: null | number;
    y: null | number;
}

export let mouse: position = {x: null, y: null};

export const get_cell_index = (mouse: position) => {
    if (mouse.x >= 500 || mouse.y >= 500) {
        return -1;
    }

    mouse.x /= 50;
    mouse.y /= 50;

    mouse.x = Math.floor(mouse.x);
    mouse.y = Math.floor(mouse.y);


    return mouse.x * 10 + mouse.y;
};
