class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');
    private readonly div = document.getElementById('canvas');

    constructor() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = "0px";
        this.canvas.style.left = "0px";
        this.div.appendChild(this.canvas);
    }
}

export const canvas = new Canvas();
