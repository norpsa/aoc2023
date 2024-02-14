import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day12.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push({ record: line.split(" ")[0].split(""), groups: line.split(" ")[1].split(",").map(a => parseInt(a)) });
});

//console.log(data);

/*data.forEach(line => {
    let groups = line.groups;
    let record = line.record;
    console.log(record);

    // jos # ennen ? tiedetään et pakko olla osa ekaa ryhmää
    let firstSpring = record.findIndex(a => a === '#');
    let firstUnknown = record.findIndex(a => a === '?');
    if(firstUnknown > firstSpring) {
        groups[0]['position'] = firstSpring;
        if(groups[0].size > 1) {
            for(let i = firstSpring; i < groups[0].size + firstSpring; i++) {
                record[i] = '#';
            }
        }
    }

    // jos # ennen ? tiedetään et pakko olla osa vikaa ryhmää
    let lastSpring = record.findLastIndex(a => a === '#');
    let lastUnknown = record.findLastIndex(a => a === '?');
    console.log(lastSpring, lastUnknown)
    if(lastSpring > lastUnknown) {
        groups[groups.length - 1]['position'] = lastSpring - groups[groups.length - 1];
        if(groups[groups.length - 1].size > 1) {
            for(let i = lastSpring; i > lastSpring - groups[groups.length - 1].size; i--) {
                record[i] = '#';
            }
        }
    }

    console.log(record);

});*/

// Etsitään paikat mihin ensimmäinen voi mennä ja tehdään siitä optiot niin, että muutetaan mahdolliset kysymysmerkit oikein ja sen viereiset myös oikein
// Lisätään kaikki optiot listaan
// Jatketaan kunnes lista on tyhjä
// Jos ei löydy optioita ja ollaan lopussa niin lisätään lopullisiin ratkaisu (tsekattava myös, ettei lopussa ole turhaa tauhkaa ja muunnetaan lopun kyssärit)
// Jos ei löydy optioita ja ei olla lopussa niin luovutetaan
const solve = (line) => {
    let options = [];
    options.push({ record: [...line.record], known: [], missing: [...line.groups] });
    let sum = 0;
    while(options.length > 0) {
        let current = options.pop();
        let knownSpringsSum = current.known.reduce((a, b) => a + b, 0);
        let found = 0;
        let start = 0;
        while(found < knownSpringsSum) {
            if(current.record[start] === '#') {
                found++;
            } 
            start++;
        }

        if(current.missing.length === 0) {
            // tarkistetaan roskat lopusta
            if(current.record.filter(a => a === '#').length === knownSpringsSum) {
                sum++;
            }
            continue;
        }

        let nextGroup = current.missing[0];
        if(nextGroup + start >= current.record.length) {
            continue;
        }

        
        // ???.###
        let sumSpring = 0;
        let missingSum = current.missing.reduce((a, b) => a + b, 0) - nextGroup;
        for(let i = start; i < current.record.length; i++) {
            let newRecord = [...current.record];
            
            let okay = false;
            if(current.record[i] === '#') {
                sumSpring++;
            }

            if(i + nextGroup <= current.record.length && current.record.slice(i, i + nextGroup).every(a => a === '#' || a === '?')) {
                okay = true;
                if(i !== 0 && current.record[i - 1] === '#') {
                    okay = false;
                }
                if(i + nextGroup !== current.record.length && current.record[i + nextGroup] === '#') {
                    okay = false;
                }
                if(current.record.slice(i + nextGroup).filter(a => a === '#' || a === '?').length < missingSum) {
                    break;
                }
            }
            if(okay) {
                for(let k = 0; k < nextGroup; k++) {
                    newRecord[k + i] = '#'
                }
                if(i !== 0) {
                    newRecord[i - 1] = '.'
                }
                if(i + nextGroup !== current.record.length) {
                    newRecord[i + nextGroup] = '.';
                }
                let newMissing = [...current.missing];
                newMissing.shift();
                options.push({ record: newRecord, known: [...current.known, nextGroup], missing: newMissing });
            }
            if(sumSpring > 0) {
                break;
            }
        }
    }
    return sum;
}

let total = 0;

// PART 2

let newData = [];

for(let i = 0; i < data.length; i++) {
    let newLine = [];
    let newGroups = [];
    for(let k = 0; k < 4; k++) {
        data[i].record.forEach(a => newLine.push(a));
        newLine.push('?');
        data[i].groups.forEach(a => newGroups.push(a));
    }
    data[i].record.forEach(a => newLine.push(a));
    data[i].groups.forEach(a => newGroups.push(a));
    newData.push({record: newLine, groups: newGroups});
}

let memory = [];

const solveRec = (record, index, groups, groupIndex) => {
    if(groupIndex === groups.length) {
        if(record.filter(a => a === '#').length === groups.reduce((a, b) => a + b, 0)) {
            return 1;
        } else {
            return 0;
        }
    }

    if(memory[index][groupIndex] !== -1) {
        return memory[index][groupIndex];
    }

    if(groups[groupIndex] + index >= record.length) {
        return 0;
    }

    let options = [];
    let nextGroup = groups[groupIndex];
    let missingSum = groups.slice(groupIndex + 1).reduce((a, b) => a + b, 0);
    let sumSpring = 0;
    for(let i = index; i < record.length; i++) {
        let newRecord = [...record];
        
        let okay = false;
        if(record[i] === '#') {
            sumSpring++;
        }

        if(i + nextGroup <= record.length && record.slice(i, i + nextGroup).every(a => a === '#' || a === '?')) {
            okay = true;
            if(i !== 0 && record[i - 1] === '#') {
                okay = false;
            }
            if(i + nextGroup !== record.length && record[i + nextGroup] === '#') {
                okay = false;
            }
            if(record.slice(i + nextGroup).filter(a => a === '#' || a === '?').length < missingSum) {
                break;
            }
        }
        if(okay) {
            for(let k = 0; k < nextGroup; k++) {
                newRecord[k + i] = '#'
            }
            if(i !== 0) {
                newRecord[i - 1] = '.'
            }
            if(i + nextGroup !== record.length) {
                newRecord[i + nextGroup] = '.';
            }

            options.push({record: newRecord, index: i + nextGroup});
        }
        if(sumSpring > 0) {
            break;
        }
    }
    let result = 0;
    for(let i = 0; i < options.length; i++) {
        result += solveRec(options[i].record, options[i].index, groups, groupIndex + 1);
    }

    memory[index][groupIndex] = result;

    return result;


}

total = 0;
data.forEach(line => {
    memory = [];
    for(let i = 0; i < line.record.length; i++) {
        memory.push(Array(line.groups.length).fill(-1));
    }
    total += solveRec(line.record, 0, line.groups, 0);
});

console.log(total);

total = 0;
newData.forEach(line => {
    memory = [];
    for(let i = 0; i < line.record.length; i++) {
        memory.push(Array(line.groups.length).fill(-1));
    }
    total += solveRec(line.record, 0, line.groups, 0)
    
});

console.log(total);