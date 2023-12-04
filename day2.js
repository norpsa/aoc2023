import { readFileSync } from 'fs';

const red = 12;
const blue = 14;
const green = 13;

let sum = 0;

let powerSum = 0;

readFileSync('input_day2.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let gameId = parseInt(line.split(": ")[0].split(" ")[1]);
    let game = line.split(": ")[1];

    // PART 1
    let possible = true;
    
    game.split("; ").forEach(set => {
        
        set.split(", ").forEach(cubes => {
            const amount = parseInt(cubes.split(" ")[0]);
            const color = cubes.split(" ")[1];

            if(color === "blue" && amount > blue) possible = false;
            if(color === "red" && amount > red) possible = false;
            if(color === "green" && amount > green) possible = false;

        });
    });
    if(possible) {
        sum += gameId;
    }

    //PART 2
    let minRed = 0;
    let minBlue = 0;
    let minGreen = 0;
    game.split("; ").forEach(set => {
        
        set.split(", ").forEach(cubes => {
            const amount = parseInt(cubes.split(" ")[0]);
            const color = cubes.split(" ")[1];

            // PART 2
            if(color === "blue" && amount > minBlue) minBlue = amount;
            if(color === "red" && amount > minRed) minRed = amount;
            if(color === "green" && amount > minGreen) minGreen = amount;

        });
    });
    powerSum += (minBlue*minRed*minGreen)

});

console.log("PART 1", sum);
console.log("PART 2", powerSum);