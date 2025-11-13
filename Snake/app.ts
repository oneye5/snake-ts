import * as readline from 'readline';

// vars
let screen: string[] = [];

let width: number = 32;
let height: number = 16; 
let emptyChar: string = '-';

class Point {
    x: number = width/2;
    y: number = height/2;
}
class Snake {
    
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
