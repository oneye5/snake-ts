import * as readline from 'readline';

// vars
let screen: string[] = [];

let width: number = 32;
let height: number = 16; 
let emptyChar: string = '-';

class Point {
    x: number;
    y: number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class Snake {
    head: Point = new Point(width/2, height/2);
    segments: Point[] = [];
    segmentCount: number = 3;
    dir: Point;

    public constructor() {
        this.dir = new Point(1, 0);
    }

    public tickSnake() {
        this.head.x += this.dir.x;
        this.head.y += this.dir.y; 

        // put new head segment
        this.segments.push()

        // pop excess segments
        while (this.segments.length > this.segmentCount) {
            this.segments.pop();
        }

        this.drawSnake();
    }

    private drawSnake() {

    }
}

const fillScreen = () => {
    for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
            screen.push(emptyChar);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const drawScreen = () => {
    for (let y = 0; y < height; y++) {
        let line = ''
        for (let x = 0; x < width; x++) {
            let i = x + y * width;
            let character = screen[i];
            line += character;
        }
        console.log(line);
    }
        
}




const askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    })
}


fillScreen();

while (1) {
    await askQuestion('enter continue');
    await console.log('Hello world');
    console.clear();
    drawScreen();
}
