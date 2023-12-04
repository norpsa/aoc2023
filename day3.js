import { readFileSync } from 'fs';

const data = [];
const numbers = [];
let counter = 0;

const gears = [];
readFileSync('input_day3.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split("");
    let numBegin = -1;
    let num = "";
    for(let i = 0; i < row.length; i++) {
        if(!isNaN(row[i])) {
            if(numBegin === -1) {
                numBegin = i;
            }
            num += row[i];
        } else {
            if(numBegin !== -1) {
                numbers.push({number: parseInt(num), row: counter, begin: numBegin, end: i - 1});
                numBegin = -1;
                num = "";
            }
        }

        // Number ending end of the row
        if(i === row.length - 1 && numBegin !== -1 && !isNaN(row[i])) {
            numbers.push({number: parseInt(num), row: counter, begin: numBegin, end: i - 1});
            numBegin = -1;
            num = "";
        }

        //PART 2 gears
        if(row[i] === '*') {
            gears.push({row: counter, col: i, adjNums: new Set()});
        }
    }
    counter++;
    data.push(row);
});

// PART 1
let sum = 0;
numbers.forEach(num => {
    const points = [];
    for(let i = num.row - 1; i <= num.row + 1; i++) {
        for(let j = num.begin - 1; j <= num.end + 1; j++) {
            if(i >= 0 && i < data.length && j >= 0 && j < data[0].length) {
                points.push({ row: i, col: j});
            }
        }
    }
    let isPart = false;
    points.forEach(point => {
        if(isNaN(data[point.row][point.col]) && data[point.row][point.col] !== '.') {
            isPart = true;
            return;
        } 
    });
    if(isPart) {
        sum += num.number;
    }
});

console.log("PART1", sum);

//PART 2
let gearSum = 0;
gears.forEach(gear => {
    const adjacent = [];
    numbers.forEach(number => {
        if(number.row >= gear.row - 1 && number.row <= gear.row + 1 && gear.col >= number.begin - 1 && gear.col <= number.end + 1) {
            adjacent.push(number.number);
        }
    });
    if(adjacent.length === 2) {
        gearSum += adjacent[0] * adjacent[1];
    }
});

console.log("PART2", gearSum);