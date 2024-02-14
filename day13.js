import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day13.txt', 'utf-8').split(/\r?\n\n/).forEach(function(group){
    data.push(group);
});

let result = 0;
data.forEach(group => {
    let array = [];
    group.split(/\r?\n/).forEach(line => {
        array.push(line.split(""));
    });

    // horizontal
    let row = -1;
    for(let i = 0; i < array.length - 1; i++) {
        let horizontal = true;
        let counter = 0;
        for(let k = i; k >= 0; k--) {
            if(i + 1 + counter < array.length) {
                if(array[k].join("") !== array[i + 1 + counter].join("")) {
                    horizontal = false;
                    break;
                }
            }
            counter++;
        }
        if(horizontal) {
            row = i + 1;
            break;
        }
    }

    // vertical
    let column = -1;
    for(let i = 0; i < array[0].length - 1; i++) {
        let vertical = true;
        let counter = 0;
        for(let k = i; k >= 0; k--) {
            if(i + 1 + counter < array[0].length) {
                for(let j = 0; j < array.length; j++) {
                    if(array[j][k] !== array[j][i + 1 + counter]) {
                        vertical = false;
                        break;
                    }
                }
            }
            counter++;
        }
        if(vertical) {
            column = i + 1;
            break;
        }
    }
    if(row !== -1) {
        result += row*100;
    }
    if(column !== -1) {
        result += column;
    }
});

console.log(result);

result = 0;
data.forEach(group => {
    let array = [];
    group.split(/\r?\n/).forEach(line => {
        array.push(line.split(""));
    });

    // horizontal
    let row = -1;
    for(let i = 0; i < array.length - 1; i++) {
        let mistakes = 0;
        let counter = 0;
        for(let k = i; k >= 0; k--) {
            if(i + 1 + counter < array.length) {
                for(let j = 0; j < array[0].length; j++) {
                    if(array[k][j] !== array[i + 1 + counter][j]) {
                        mistakes++;
                    }
                }
            }
            counter++;
        }
        if(mistakes === 1) {
            row = i + 1;
            break;
        }
    }

    // vertical
    let column = -1;
    for(let i = 0; i < array[0].length - 1; i++) {
        let mistakes = 0;
        let counter = 0;
        for(let k = i; k >= 0; k--) {
            if(i + 1 + counter < array[0].length) {
                for(let j = 0; j < array.length; j++) {
                    if(array[j][k] !== array[j][i + 1 + counter]) {
                        mistakes++;
                    }
                }
            }
            counter++;
        }
        if(mistakes === 1) {
            column = i + 1;
            break;
        }
    }
    if(row !== -1) {
        result += row*100;
    }
    if(column !== -1) {
        result += column;
    }
});

console.log(result);