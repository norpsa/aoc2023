import { readFileSync } from 'fs';

const data = new Map();
const file = readFileSync('input_day8.txt', 'utf-8').split(/\r?\n\n/);

let instructions = file[0].split("");

file[1].split(/\r?\n/).forEach(line => {
    const values = line.split(" = ");
    let left = values[1].substr(1, 3);
    let right = values[1].substr(6, 3);

    data.set(values[0], {left, right});
});

let current = "AAA";
let index = 0;

let steps = 0;
/*while(current !== "ZZZ") {
    let direction = instructions[index];
    if(direction === 'L') {
        current = data.get(current).left;
    } else {
        current = data.get(current).right;
    }
    steps++;
    if(index === instructions.length - 1) {
        index = 0;
    } else {
        index++;
    }
}

console.log(steps); */

const nodes = Array.from(data.keys()).filter(a => a.endsWith('A'));
console.log(nodes.length);
steps = 0;

let finished = false;
index = 0;

let finals = [];

for(let i = 0; i < nodes.length; i++) {
    let path = [];
    let current = nodes[i];
    let ends = [];
    path.push({node: current, index: 0});
    index = 0;
    steps = 0;
    finished = false;
    while(!finished) {
        let direction = instructions[index];
        if(direction === 'L') {
            current = data.get(current).left;
        } else {
            current = data.get(current).right;
        }
        steps++;
        if(current.endsWith('Z')) {
            console.log(current, steps, index);
            ends.push({ steps, index });
        }
        
        if(index === instructions.length - 1) {
            index = 0;
        } else {
            index++;
        }

        //console.log(current, index);
        
        if(path.filter(node => node.node === current && node.index === index).length > 1) {
            console.log(steps, index, current);
            finished = true;
        }
        path.push({ node: current, index });
    }
    console.log(finals)
    finals.push(ends);
}
console.log(instructions.length);
console.log(finals);
console.log(steps);