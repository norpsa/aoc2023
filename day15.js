import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day15.txt', 'utf-8').split(",").forEach(function(line){
    data.push(line);
});

const countHASH = (label) => {
    let current = 0;
    let chars = label.split("");
    chars.forEach(c => {
        current += c.charCodeAt(0);
        current *= 17;
        current = current % 256;
    });
    return current;
}

let total = 0;
data.forEach(a => {
    total += countHASH(a);
});
console.log("PART1", total);

// PART 2

let boxes = new Map();
data.forEach(step => {
    if(step.includes("=")) {
        let label = step.split("=")[0];
        let box = countHASH(label);
        let length = parseInt(step.split("=")[1]);
        if(boxes.has(box)) {
            let index = boxes.get(box).findIndex(a => a.label === label);
            if(index !== -1) {
                boxes.get(box)[index] = { label, length };
            } else {
                boxes.get(box).push({label, length});
            }
        } else {
            boxes.set(box, [{ label, length }]);
        }
    } else if(step.includes("-")) {
        let label = step.split("-")[0];
        let box = countHASH(label);
        if(boxes.has(box)) {
            let index = boxes.get(box).findIndex(a => a.label === label);
            if(index !== -1) {
                let oldArray = boxes.get(box);
                boxes.set(box, oldArray.slice(0, index).concat(oldArray.slice(index + 1)));
            }
        }
    }
});

total = 0;
boxes.forEach((value, key) => {
    for(let i = 0; i < value.length; i++) {
        total += (key + 1)*(i + 1)*(value[i].length);
    }
})

console.log("PART 2", total);