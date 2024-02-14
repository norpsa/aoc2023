import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day21.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split(""));
});

let plots = [];
let startR = 0;
let startC = 0;
for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data.length; j++) {
        if(data[i][j] === 'S') {
            plots.push({r: i, c: j});
            startR = i;
            startC = j;
            data[i][j] = '.';
        }
    }
}

console.log(startR, startC);
for(let x = 0; x < 64; x++) {
    let newPlots = [];
    plots.forEach(p => {
        let neighbours = [{r: p.r + 1, c: p.c}, {r: p.r - 1, c: p.c}, {r: p.r, c: p.c + 1}, {r: p.r, c: p.c - 1}];
        neighbours = neighbours.filter(a => (a.r >= 0 && a.c >= 0 && a.r < data.length && a.c < data[0].length && data[a.r][a.c] === '.'));
        neighbours.forEach(n => {
            if(!newPlots.find(x => x.r === n.r && x.c === n.c)) {
                newPlots.push(n);
            }
        });
    });
    plots = newPlots;
}

console.log("PART1", plots.length);

let maps = [];
// X rivi y sarake
maps.push({x: 0, y: 0, plots: [{r: startR, c: startC }], amount: 1});

let results = [];
// Tää on ihan liian hidasta
for(let i = 0; i < 458; i++) {
    let newMaps = [];
    let newValuesToMaps = [];
    maps.forEach(m => {
        let newPlots = [];
        m.plots.forEach(p => {
            let neighbours = [{r: p.r + 1, c: p.c}, {r: p.r - 1, c: p.c}, {r: p.r, c: p.c + 1}, {r: p.r, c: p.c - 1}];
            neighbours.forEach(n => {
                if(n.r >= 0 && n.c >= 0 && n.r < data.length && n.c < data[0].length && data[n.r][n.c] === '.') {
                    if(!newPlots.find(x => x.r === n.r && x.c === n.c)) {
                        newPlots.push(n);
                    }
                } else if(n.r < 0) {
                    newValuesToMaps.push({x: m.x - 1, y: m.y, r: data.length - 1, c: n.c});
                } else if(n.c < 0) {
                    newValuesToMaps.push({x: m.x, y: m.y - 1, r: n.r, c: data[0].length - 1});
                } else if(n.r >= data.length) {
                    newValuesToMaps.push({x: m.x + 1, y: m.y, r: 0, c: n.c});
                } else if(n.c >= data[0].length) {
                    newValuesToMaps.push({x: m.x, y: m.y + 1, r: n.r, c: 0 });
                }
            });
        });
        newMaps.push({ x: m.x, y: m.y, plots: newPlots });
    });
    newValuesToMaps.forEach(a => {
        let map = newMaps.find(m => m.x === a.x && m.y === a.y);
        if(map) {
            if(!map.plots.find(x => x.r === a.r && x.c === a.c)) {
                map.plots.push({r: a.r, c: a.c});
            }
        } else {
            newMaps.push({x: a.x, y: a.y, plots: [{r: a.r, c: a.c}]});
        }
    });

    maps = newMaps;
    let steps = 0;
    maps.forEach(m => steps += m.plots.length);
    console.log(steps);
    results.push(steps);
};
let index = 0;
maps.forEach(m => {
    for(let i = 0; i < data.length; i++) {
        let row = "";
        for(let j = 0; j < data[0].length; j++) {
            if(m.plots.find(x => x.r === i && x.c === j)) {
                row += 'O';
            } else {
                row += data[i][j];
            }
        }
        console.log(row);
    }
    console.log(m.x, m.y, m.plots.length);
    console.log();
});

let steps = 0;
maps.forEach(m => steps += m.plots.length);

console.log(results);
console.log("PART2", steps);