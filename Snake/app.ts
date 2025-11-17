import * as readline from 'readline';

// vars
let screen: string[] = [];

let width: number = 32;
let height: number = 16;
let emptyChar: string = '-';
let snakeBody: string = "#";
let snakeHead: string = "@";
let appleChar: string = "O";

function clearScreen() {
    for (let i = 0; i < width * height; i++) {
        screen[i] = emptyChar;
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Point {
    x: number;
    y: number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    head: Point = new Point(Math.floor(width / 2), Math.floor(height / 2));
    segments: Point[] = [];
    segmentCount: number = 3;
    dir: Point = new Point(1, 0);

    public tickSnake() {
        // movement
        this.head.x += this.dir.x;
        this.head.y += this.dir.y;

        // out of bounds = lose
        if (
            this.head.x < 0 || this.head.x >= width ||
            this.head.y < 0 || this.head.y >= height
        ) {
            console.clear();
            console.log("GAME OVER");
            sleep(1000);
            process.exit();
        }

        // insert new body position
        this.segments.unshift(new Point(this.head.x, this.head.y));

        // self-intersection check
        for (let i = 1; i < this.segments.length; i++) {
            if (this.segments[i] === undefined) {
                continue;
            }
            if (this.segments[i]?.x === this.head.x && this.segments[i]?.y === this.head.y) {
                console.log("GAME OVER, enter to exit");
                sleep(1000);
                process.exit();
            }
        }

        // trim tail
        while (this.segments.length > this.segmentCount) {
            this.segments.pop();
        }

        this.drawSnake();
    }

    public drawSnake() {
        for (let i = 0; i < this.segments.length; i++) {
            let point = this.segments[i];
            if (point == undefined)
                continue;
            let idx = point.x + point.y * width;
            screen[idx] = snakeBody;
        }
        let headIdx = this.head.x + this.head.y * width;
        screen[headIdx] = snakeHead;
    }
}

class Apple {
    pos: Point = new Point(0, 0);

    constructor() {
        this.randomize();
    }

    public randomize() {
        this.pos.x = Math.floor(Math.random() * width);
        this.pos.y = Math.floor(Math.random() * height);
    }

    public draw() {
        let idx = this.pos.x + this.pos.y * width;
        screen[idx] = appleChar;
    }
}

const fillScreen = () => {
    for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
            screen.push(emptyChar);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// snake + apple
let playerSnake: Snake = new Snake();
let apple = new Apple();

process.stdin.on("keypress", (_, key) => {
    if (!key) return;

    // ignore opposite-direction turns
    if (key.name === "w" && playerSnake.dir.y !== 1)
        playerSnake.dir = new Point(0, -1);
    else if (key.name === "s" && playerSnake.dir.y !== -1)
        playerSnake.dir = new Point(0, 1);
    else if (key.name === "a" && playerSnake.dir.x !== 1)
        playerSnake.dir = new Point(-1, 0);
    else if (key.name === "d" && playerSnake.dir.x !== -1)
        playerSnake.dir = new Point(1, 0);
});

const drawScreen = () => {
    for (let y = 0; y < height; y++) {
        let line = "";
        for (let x = 0; x < width; x++) {
            let i = x + y * width;
            line += screen[i];
        }
        console.log(line);
    }
    console.log("Score:", playerSnake.segmentCount - 3);
};


// init
fillScreen();

while (true) {
    console.clear();

    clearScreen();

    // apple pickup check before drawing
    if (playerSnake.head.x === apple.pos.x && playerSnake.head.y === apple.pos.y) {
        playerSnake.segmentCount++;
        apple.randomize();
    }

    playerSnake.tickSnake();
    apple.draw();

    drawScreen();
    await sleep(120);
}
