import { readFileSync } from 'fs';

let parts = [];
let instructions = new Map();
readFileSync('input_day19.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(line.startsWith("{")) {
        let values = line.replace("{", "").replace("}", "").split(",");
        values = values.map(a => a.split("="));
        parts.push({x: parseInt(values[0][1]), m: parseInt(values[1][1]), a: parseInt(values[2][1]), s: parseInt(values[3][1])})
    } else if(line) {
        let values = line.split("{");
        values = values.map(a => a.replace("}", ""));
        instructions.set(values[0], values[1].split(","));
    }
});

let accepted = [];

parts.forEach(part => {
    let nextInstruction = 'in';
    let end = false;

    while(!end) {
        if(nextInstruction === 'A' || nextInstruction === 'R') {
            end = true;
            if(nextInstruction === 'A') {
                accepted.push(part);
            }
            break;
        }

        let instruction = instructions.get(nextInstruction);
        nextInstruction = null;
        let index = 0;
        while(!nextInstruction) {
            let i = instruction[index];
            if(i.includes("<")) {
                let values = i.split("<");
                let secondValues = values[1].split(":");
                if(part[values[0]] < parseInt(secondValues[0])) {
                    nextInstruction = secondValues[1];
                }
            } else if(i.includes(">")) {
                let values = i.split(">");
                let secondValues = values[1].split(":");
                if(part[values[0]] > parseInt(secondValues[0])) {
                    nextInstruction = secondValues[1];
                }
            } else {
                nextInstruction = i;
            }
            index++;
        }   
    }
});

let total = 0;
accepted.forEach(p => {
    total += p.x;
    total += p.m;
    total += p.a;
    total += p.s;
});

console.log(total);

// Otetaan ensin tilanne että x:0-4000, m:0-4000, a:0-4000, s:0-4000
// aloitetaan ekasta ohjeesta ja katsotaan mitä se koskee ja jakaudutaan sen mukaisesti kahtia
// esimerkissä olis että skenaariot on että s 0-1350 ja s 1351-4000
// näistä toinen menee loppuun, toinen ei
// toinen vaihtoehto ois et selvittää eka kaikki reitit mitkä tulee acceptoitua, ehkä aloitan siitä

let paths = [];

let finalPaths = [];
paths.push({ path: ['in'], ranges: { x: { min: 1, max: 4000 }, m: { min: 1, max: 4000 }, a: { min: 1, max: 4000 }, s: { min: 1, max: 4000 } }});

while(paths.length > 0) {
    let current = paths.shift();
    let next = current.path[current.path.length - 1];
    if(next.includes('A')) {
        // Huomioitavaa ehdot
        if(next.includes(":")) {
            if(next.includes("<")) {
                let values = next.split("<");
                let secondValues = values[1].split(":");
                if(current.ranges[values[0]].max > parseInt(secondValues[0])) {
                    let newRanges = JSON.parse(JSON.stringify(current.ranges));
                    newRanges[values[0]].max = parseInt(secondValues[0]) - 1;
                    finalPaths.push({ path: [...current.path], ranges: newRanges });
                }
            } else if(i.includes(">")) {
                let values = next.split(">");
                let secondValues = values[1].split(":");
                if(current.ranges[values[0]].min < parseInt(secondValues[0])) {
                    let newRanges = JSON.parse(JSON.stringify(current.ranges));
                    newRanges[values[0]].min = parseInt(secondValues[0]) + 1;
                    finalPaths.push({ path: [...current.path], ranges: newRanges });
                }
            }
            finalPaths.push(current);
        } else {
            finalPaths.push(current);
        }
        continue;
    }
    if(next.includes('R')) {
        continue;
    }

    let parts = instructions.get(next);
    let pathValues = JSON.parse(JSON.stringify(current.ranges));
    for(let k = 0; k < parts.length; k++) {
        let i = parts[k];
        if(i.includes("<")) {
            let values = i.split("<");
            let secondValues = values[1].split(":");
            if(pathValues[values[0]].max > parseInt(secondValues[0])) {
                let newRanges = JSON.parse(JSON.stringify(pathValues));
                newRanges[values[0]].max = parseInt(secondValues[0]) - 1;
                paths.push({ path: [...current.path, secondValues[1]], ranges: newRanges });
                // Jatketaan käänteisellä seuraavaan ehtoon
                if(pathValues[values[0]].min < parseInt(secondValues[0])) {
                    pathValues[values[0]].min = parseInt(secondValues[0]);
                }
            }
        } else if(i.includes(">")) {
            let values = i.split(">");
            let secondValues = values[1].split(":");
            if(pathValues[values[0]].min < parseInt(secondValues[0])) {
                let newRanges = JSON.parse(JSON.stringify(pathValues));
                newRanges[values[0]].min = parseInt(secondValues[0]) + 1;
                paths.push({ path: [...current.path, secondValues[1]], ranges: newRanges });
                // Jatketaan käänteisellä seuraavaan ehtoon
                if(pathValues[values[0]].max > parseInt(secondValues[0])) {
                    pathValues[values[0]].max = parseInt(secondValues[0]);
                }
            }
        } else {
            paths.push({ path: [...current.path, i], ranges: pathValues });
            break;
        }

    }
}

let result = 0;
finalPaths.forEach(a => {
    let t = 1;
    Object.entries(a.ranges).forEach(([key, value]) => {
        t *= (value.max - value.min + 1);
    })
    result += t;
});

console.log(result);