import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day17.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split("").map(a => parseInt(a)));
});

let score = [];
for(let i = 0; i < data.length; i++) {
    let row = [];
    for(let j = 0; j < data[0].length; j++) {
        row.push({ right: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] , left: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], up: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], down: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] });
    }
    score.push(row);
}

let fscore = [];
for(let i = 0; i < data.length; i++) {
    let row = [];
    for(let j = 0; j < data[0].length; j++) {
        row.push({ right: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] , left: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], up: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], down: [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] });
    }
    fscore.push(row);
}

let queue = [];
let lowest = Number.MAX_SAFE_INTEGER;
// ekalla suunnalla ei väliä koska sameDirection 0;
queue.push({row: 0, column: 0, direction: 'empty', heatLoss: 0, sameDirection: 0, path: [] });
while(queue.length > 0) {
    let current = queue.shift();
    if(current.row === data.length - 1 && current.column === data[0].length - 1) {
        if(current.heatLoss < lowest) {
            lowest = current.heatLoss;
        }
    }
    if(current.row > 0 && current.direction !== 'down' && (current.direction !== 'up' || current.sameDirection < 3)) {
        let sameDirection = current.direction === 'up' ? current.sameDirection + 1 : 1;
        if(score[current.row - 1][current.column]['up'][sameDirection - 1] > current.heatLoss + data[current.row - 1][current.column] &&
        queue.findIndex(a => a.row === current.row - 1 && a.column === current.column && a.direction === 'up' && a.sameDirection === sameDirection) === -1) {
            queue.push({ row: current.row - 1, column: current.column, direction: 'up', 
                heatLoss: current.heatLoss + data[current.row - 1][current.column], sameDirection});
            score[current.row - 1][current.column]['up'][sameDirection - 1] = current.heatLoss + data[current.row - 1][current.column];
            fscore[current.row - 1][current.column]['up'][sameDirection - 1]  = current.heatLoss + data[current.row - 1][current.column] + data.length - (current.row - 1) + data[0].length - current.column;
        }
    }
    if(current.row < data.length - 1 && current.direction !== 'up' && (current.direction !== 'down' || current.sameDirection < 3)) {
        let sameDirection = current.direction === 'down' ? current.sameDirection + 1 : 1;
        if(score[current.row + 1][current.column]['down'][sameDirection - 1] > current.heatLoss + data[current.row + 1][current.column] &&
        queue.findIndex(a => a.row === current.row + 1 && a.column === current.column && a.direction === 'down' && a.sameDirection === sameDirection) === -1) {
            queue.push({ row: current.row + 1, column: current.column, direction: 'down', 
                heatLoss: current.heatLoss + data[current.row + 1][current.column], sameDirection });
            score[current.row + 1][current.column]['down'][sameDirection - 1] = current.heatLoss + data[current.row + 1][current.column];
            fscore[current.row + 1][current.column]['down'][sameDirection - 1]  = current.heatLoss + data[current.row + 1][current.column] + data.length - (current.row + 1) + data[0].length - current.column;
        }

    }
    if(current.column < data[0].length - 1 && current.direction !== 'left' && (current.direction !== 'right' || current.sameDirection < 3)) {
        let sameDirection = current.direction === 'right' ? current.sameDirection + 1 : 1;
        if(score[current.row][current.column + 1]['right'][sameDirection - 1] > current.heatLoss + data[current.row][current.column + 1] &&
        queue.findIndex(a => a.row === current.row && a.column === current.column + 1 && a.direction === 'right' && a.sameDirection === sameDirection) === -1) {
            queue.push({ row: current.row, column: current.column + 1, direction: 'right', 
                heatLoss: current.heatLoss + data[current.row][current.column + 1], sameDirection });
            score[current.row][current.column + 1]['right'][sameDirection - 1] = current.heatLoss + data[current.row][current.column + 1];
            fscore[current.row][current.column + 1]['right'][sameDirection - 1]  = current.heatLoss + data[current.row][current.column + 1] + data.length - current.row + data[0].length - (current.column + 1);
        }
    }
    if(current.column > 0 && current.direction !== 'right' && (current.direction !== 'left' || current.sameDirection < 3)) {
        let sameDirection = current.direction === 'left' ? current.sameDirection + 1 : 1;
        if(score[current.row][current.column - 1]['left'][sameDirection - 1] > current.heatLoss + data[current.row][current.column - 1] &&
            queue.findIndex(a => a.row === current.row && a.column === current.column - 1 && a.direction === 'left' && a.sameDirection === sameDirection) === -1) {
            queue.push({ row: current.row, column: current.column - 1, direction: 'left', 
                heatLoss: current.heatLoss + data[current.row][current.column - 1], sameDirection });
            score[current.row][current.column - 1]['left'][sameDirection - 1] = current.heatLoss + data[current.row][current.column - 1];
            fscore[current.row][current.column - 1]['left'][sameDirection - 1]  = current.heatLoss + data[current.row][current.column - 1] + data.length - current.row + data[0].length - (current.column - 1);
        }
    }
    queue = queue.sort((a,b) => fscore[a.row][a.column][a.direction][a.sameDirection - 1] - fscore[b.row][b.column][b.direction][b.sameDirection - 1]);
}

console.log("PART 1", lowest);

score = [];
for(let i = 0; i < data.length; i++) {
    let row = [];
    for(let j = 0; j < data[0].length; j++) {
        row.push({ right: Array(10).fill(Number.MAX_SAFE_INTEGER), up: Array(10).fill(Number.MAX_SAFE_INTEGER), left: Array(10).fill(Number.MAX_SAFE_INTEGER), down: Array(10).fill(Number.MAX_SAFE_INTEGER)});
    }
    score.push(row);
}

fscore = [];
for(let i = 0; i < data.length; i++) {
    let row = [];
    for(let j = 0; j < data[0].length; j++) {
        row.push({ right: Array(10).fill(Number.MAX_SAFE_INTEGER), up: Array(10).fill(Number.MAX_SAFE_INTEGER), left: Array(10).fill(Number.MAX_SAFE_INTEGER), down: Array(10).fill(Number.MAX_SAFE_INTEGER)});
    }
    fscore.push(row);
}

queue = [];
lowest = Number.MAX_SAFE_INTEGER;
// ekalla suunnalla ei väliä koska sameDirection 0;
queue.push({row: 0, column: 0, direction: 'empty', heatLoss: 0, sameDirection: 4 });
while(queue.length > 0) {
    let current = queue.shift();
    if(current.row === data.length - 1 && current.column === data[0].length - 1 && current.sameDirection > 3) {
        if(current.heatLoss < lowest) {
            lowest = current.heatLoss;
        }
    }

    // PAKKO JATKAA SAMAAN SUUNTAAN
    if(current.sameDirection < 4) {
        if(current.direction === 'up' && current.row > 0) {
            let sameDirection = current.direction === 'up' ? current.sameDirection + 1 : 1;
            if(score[current.row - 1][current.column]['up'][sameDirection - 1] > current.heatLoss + data[current.row - 1][current.column] &&
            queue.findIndex(a => a.row === current.row - 1 && a.column === current.column && a.direction === 'up' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row - 1, column: current.column, direction: 'up', 
                    heatLoss: current.heatLoss + data[current.row - 1][current.column], sameDirection});
                score[current.row - 1][current.column]['up'][sameDirection - 1] = current.heatLoss + data[current.row - 1][current.column];
                fscore[current.row - 1][current.column]['up'][sameDirection - 1]  = current.heatLoss + data[current.row - 1][current.column] + data.length - (current.row - 1) + data[0].length - current.column;
            }
        }
        if(current.direction === 'down' && current.row < data.length - 1) {
            let sameDirection = current.direction === 'down' ? current.sameDirection + 1 : 1;
            if(score[current.row + 1][current.column]['down'][sameDirection - 1] > current.heatLoss + data[current.row + 1][current.column] &&
            queue.findIndex(a => a.row === current.row + 1 && a.column === current.column && a.direction === 'down' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row + 1, column: current.column, direction: 'down', 
                    heatLoss: current.heatLoss + data[current.row + 1][current.column], sameDirection });
                score[current.row + 1][current.column]['down'][sameDirection - 1] = current.heatLoss + data[current.row + 1][current.column];
                fscore[current.row + 1][current.column]['down'][sameDirection - 1]  = current.heatLoss + data[current.row + 1][current.column] + data.length - (current.row + 1) + data[0].length - current.column;
            }
        }
        if(current.direction === 'right' && current.column < data[0].length - 1) {
            let sameDirection = current.direction === 'right' ? current.sameDirection + 1 : 1;
            if(score[current.row][current.column + 1]['right'][sameDirection - 1] > current.heatLoss + data[current.row][current.column + 1] &&
            queue.findIndex(a => a.row === current.row && a.column === current.column + 1 && a.direction === 'right' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row, column: current.column + 1, direction: 'right', 
                    heatLoss: current.heatLoss + data[current.row][current.column + 1], sameDirection });
                score[current.row][current.column + 1]['right'][sameDirection - 1] = current.heatLoss + data[current.row][current.column + 1];
                fscore[current.row][current.column + 1]['right'][sameDirection - 1]  = current.heatLoss + data[current.row][current.column + 1] + data.length - current.row + data[0].length - (current.column + 1);
            }
        }
        if(current.direction === 'left' && current.column > 0) {
            let sameDirection = current.direction === 'left' ? current.sameDirection + 1 : 1;
            if(score[current.row][current.column - 1]['left'][sameDirection - 1] > current.heatLoss + data[current.row][current.column - 1] &&
                queue.findIndex(a => a.row === current.row && a.column === current.column - 1 && a.direction === 'left' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row, column: current.column - 1, direction: 'left', 
                    heatLoss: current.heatLoss + data[current.row][current.column - 1], sameDirection });
                score[current.row][current.column - 1]['left'][sameDirection - 1] = current.heatLoss + data[current.row][current.column - 1];
                fscore[current.row][current.column - 1]['left'][sameDirection - 1]  = current.heatLoss + data[current.row][current.column - 1] + data.length - current.row + data[0].length - (current.column - 1);
            }
        }
    } else {
        if((current.row > 3 || (current.row > 3 - current.sameDirection && current.direction === 'up' && current.row > 0)) && current.direction !== 'down' && (current.direction !== 'up' || current.sameDirection < 10)) {
            let sameDirection = current.direction === 'up' ? current.sameDirection + 1 : 1;
            if(score[current.row - 1][current.column]['up'][sameDirection - 1] > current.heatLoss + data[current.row - 1][current.column] &&
            queue.findIndex(a => a.row === current.row - 1 && a.column === current.column && a.direction === 'up' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row - 1, column: current.column, direction: 'up', 
                    heatLoss: current.heatLoss + data[current.row - 1][current.column], sameDirection});
                score[current.row - 1][current.column]['up'][sameDirection - 1] = current.heatLoss + data[current.row - 1][current.column];
                fscore[current.row - 1][current.column]['up'][sameDirection - 1]  = current.heatLoss + data[current.row - 1][current.column] + data.length - (current.row - 1) + data[0].length - current.column;
            }
        }   
        if((current.row < data.length - 4 || (current.row - current.sameDirection < data.length - 4 && current.direction === 'down' && current.row < data.length - 1)) && current.direction !== 'up' && (current.direction !== 'down' || current.sameDirection < 10)) {
            let sameDirection = current.direction === 'down' ? current.sameDirection + 1 : 1;
            if(score[current.row + 1][current.column]['down'][sameDirection - 1] > current.heatLoss + data[current.row + 1][current.column] &&
            queue.findIndex(a => a.row === current.row + 1 && a.column === current.column && a.direction === 'down' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row + 1, column: current.column, direction: 'down', 
                    heatLoss: current.heatLoss + data[current.row + 1][current.column], sameDirection });
                score[current.row + 1][current.column]['down'][sameDirection - 1] = current.heatLoss + data[current.row + 1][current.column];
                fscore[current.row + 1][current.column]['down'][sameDirection - 1]  = current.heatLoss + data[current.row + 1][current.column] + data.length - (current.row + 1) + data[0].length - current.column;
            }

        }
        if((current.column < data[0].length - 4 || (current.column - current.sameDirection < data[0].length - 4 && current.direction === 'right' && current.column < data[0].length - 1)) && current.direction !== 'left' && (current.direction !== 'right' || current.sameDirection < 10)) {
            let sameDirection = current.direction === 'right' ? current.sameDirection + 1 : 1;
            if(score[current.row][current.column + 1]['right'][sameDirection - 1] > current.heatLoss + data[current.row][current.column + 1] &&
            queue.findIndex(a => a.row === current.row && a.column === current.column + 1 && a.direction === 'right' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row, column: current.column + 1, direction: 'right', 
                    heatLoss: current.heatLoss + data[current.row][current.column + 1], sameDirection });
                score[current.row][current.column + 1]['right'][sameDirection - 1] = current.heatLoss + data[current.row][current.column + 1];
                fscore[current.row][current.column + 1]['right'][sameDirection - 1]  = current.heatLoss + data[current.row][current.column + 1] + data.length - current.row + data[0].length - (current.column + 1);
            }
        }
        if((current.column > 3 || (current.column > 3 - current.sameDirection && current.direction === 'left' && current.column > 0)) && current.direction !== 'right' && (current.direction !== 'left' || current.sameDirection < 10)) {
            let sameDirection = current.direction === 'left' ? current.sameDirection + 1 : 1;
            if(score[current.row][current.column - 1]['left'][sameDirection - 1] > current.heatLoss + data[current.row][current.column - 1] &&
                queue.findIndex(a => a.row === current.row && a.column === current.column - 1 && a.direction === 'left' && a.sameDirection === sameDirection) === -1) {
                queue.push({ row: current.row, column: current.column - 1, direction: 'left', 
                    heatLoss: current.heatLoss + data[current.row][current.column - 1], sameDirection });
                score[current.row][current.column - 1]['left'][sameDirection - 1] = current.heatLoss + data[current.row][current.column - 1];
                fscore[current.row][current.column - 1]['left'][sameDirection - 1]  = current.heatLoss + data[current.row][current.column - 1] + data.length - current.row + data[0].length - (current.column - 1);
            }
        }
    }
    queue = queue.sort((a,b) => fscore[a.row][a.column][a.direction][a.sameDirection - 1] - fscore[b.row][b.column][b.direction][b.sameDirection - 1]);
}

console.log("PART2", lowest);