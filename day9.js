import { readFileSync } from 'fs';

const data = [];
readFileSync('input_day9.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    const values = line.split(" ").map(a => parseInt(a));
    data.push(values);
});

let result = 0;
let result2 = 0;

data.forEach(row => {
    let end = false;
    let differences = [];
    differences.push(row);
    while(!end) {
        let newDifferences = [];
        let index = differences.length - 1;
        for(let i = 0; i < differences[index].length - 1; i++) {
            newDifferences.push(differences[index][i + 1] - differences[index][i]);
        }
        differences.push(newDifferences);

        if(newDifferences.every(a => a === 0)) {
            end = true;
        }
    }

    // Part 1
    let value = 0;
    for(let i = differences.length - 2; i >= 0; i--) {
       value = differences[i][differences[i].length - 1] + value;
    }

    result += value;

    // Part 2
    value = 0;
    for(let i = differences.length - 2; i >= 0; i--) {
        value = differences[i][0] - value;
    }
    result2 += value;
});

console.log("PART1", result);
console.log("PART2", result2);