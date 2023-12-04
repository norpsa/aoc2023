import { readFileSync } from 'fs';

let sum = 0;
const cards = [];
const copies = new Map();
readFileSync('input_day4.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    const numbers = line.split(": ")[1];
    const correct = numbers.split(" | ")[0].split(" ").filter(a => a).map(a => parseInt(a.trim()));
    const elf = numbers.split(" | ")[1].split(" ").filter(a => a).map(a => parseInt(a.trim()));

    cards.push({correct, elf});
    // PART 1
    let score = 0;
    elf.forEach(num => {
        if(correct.includes(num)) {
            if(score === 0) {
                score = 1;
            } else {
                score = score*2;
            }
        }
    })
    sum += score;

});

console.log(sum);

// PART 2
for(let i = 0; i < cards.length; i++) {
    let correctAmount = 0;
    cards[i].elf.forEach(num => {
        if(cards[i].correct.includes(num)) {
            correctAmount++;
        }
    });
    let currentCopies = copies.has(i+1) ? copies.get(i+1) : 1;
    for(let j = 0; j < correctAmount; j++) {
        if(copies.has(i+2+j)) {
            let old = copies.get(i + 2 + j);
            copies.set(i+2+j, old + currentCopies);
        } else {
            copies.set(i+2+j, currentCopies + 1);
        }
    }
}

let cardsSum = 0;
for(let i = 1; i <= cards.length; i++) {
    if(!copies.has(i)) {
        cardsSum++;
    } else {
        cardsSum += copies.get(i);
    }
}

console.log(cardsSum);