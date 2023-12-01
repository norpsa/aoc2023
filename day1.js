import { readFileSync } from 'fs';

let sum = 0;
let sum2 = 0;
const search = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

readFileSync('input_day1.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split("");

    // PART 1
    let numbers = row.filter(a => !isNaN(a));
    let num = parseInt(numbers[0] + numbers[numbers.length - 1]);
    sum += num;

    // PART 2
    let first = 100;
    let last = -1;
    let firstText = "";
    let lastText = "";

    for(let i = 0; i < search.length; i++) {
        let start = line.indexOf(search[i]);
        let end = line.lastIndexOf(search[i]);
        if(start !== -1 && start < first) {
            first = start;
            firstText = value[i];
        }

        if(end > last) {
            last = end;
            lastText = value[i];
        }
    };

    let num2 = parseInt(firstText + lastText);
    sum2 += num2;


});

console.log(sum);
console.log(sum2);