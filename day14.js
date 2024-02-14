import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day14.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split(""));
});


// NORTH
const rotateNorth = () => {
    let change = true;
    while(change) {
        change = false;
        for(let i = 1; i < data.length; i++) {
            for(let j = 0; j < data[0].length; j++) {
                if(data[i][j] === 'O' && data[i-1][j] === '.') {
                    data[i-1][j] = 'O';
                    data[i][j] = '.';
                    change = true;
                }
            }
        }
    }
}

const rotateSouth = () => {
    let change = true;
    while(change) {
        change = false;
        for(let i = data.length - 2; i >= 0; i--) {
            for(let j = 0; j < data[0].length; j++) {
                if(data[i][j] === 'O' && data[i+1][j] === '.') {
                    data[i+1][j] = 'O';
                    data[i][j] = '.';
                    change = true;
                }
            }
        }
    }
}

const rotateEast = () => {
    let change = true;
    while(change) {
        change = false;
        for(let i = data[0].length - 2; i >= 0; i--) {
            for(let j = 0; j < data.length; j++) {
                if(data[j][i] === 'O' && data[j][i + 1] === '.') {
                    data[j][i + 1] = 'O';
                    data[j][i] = '.';
                    change = true;
                }
            }
        }
    }
}

const rotateWest = () => {
    let change = true;
    while(change) {
        change = false;
        for(let i = 1; i < data[0].length; i++) {
            for(let j = 0; j < data.length; j++) {
                if(data[j][i] === 'O' && data[j][i - 1] === '.') {
                    data[j][i - 1] = 'O';
                    data[j][i] = '.';
                    change = true;
                }
            }
        }
    }
}

const countWeight = (array) => {
    let weight = 0;
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[0].length; j++) {
            if(array[i][j] === 'O') {
                weight += array.length - i;
            }
        }
    }
    return weight;
}

const printData = () =>  {
    for(let i = 0; i < data.length; i++) {
        let row = "";
        for(let j = 0; j < data.length; j++) {
            row += data[i][j];
        }
        console.log(row);
    }
}
// PART 1
//rotateNorth();
//console.log(countWeight(data));

let repeating = false;
let repeats = [];
let index = 0;
repeats.push(data.map(a => a.join("")).join(""));
while(!repeating) {
    rotateNorth();
    rotateWest();
    rotateSouth();
    rotateEast();

    let repeat = data.map(a => a.join("")).join("");
    index = repeats.findIndex(a => a === repeat);
    if(index !== -1) {
        repeating = true;
        console.log("STOP");
        console.log(index);
        console.log(repeats.length);
    } else {
        repeats.push(repeat);
    }   
}

let arrays = [];
repeats.forEach(repeat => {
    let rows = [];
    for(let i = 0; i < data.length; i++) {
        rows.push(repeat.slice(i*data[0].length, i*data[0].length + data[0].length));
    }
    arrays.push(rows.map(a => a.split("")));
});

let row = index + (1000000000 - repeats.length) % (repeats.length - index);
console.log(countWeight(arrays[row]));