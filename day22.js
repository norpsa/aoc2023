import { readFileSync } from 'fs';

let data = [];
let maxX = 0;
let maxY = 0;
let maxZ = 0;
readFileSync('input_day22.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let [start, end] = line.split("~");
    start = start.split(",").map(a => parseInt(a));
    end = end.split(",").map(a => parseInt(a));
    if(end[0] > maxX) {
        maxX = end[0];
    }
    if(end[1] > maxY) {
        maxY = end[1];
    }
    if(end[2] > maxZ) {
        maxZ = end[2];
    }
    data.push({ start: {x: start[0], y: start[1], z: start[2]}, end: {x: end[0], y: end[1], z: end[2]} });
});
data = data.sort((a,b) => {
    if(a.start.z !== b.start.z) {
        return a.start.z - b.start.z;
    } else if(a.start.y !== b.start.y) {
        return a.start.y - b.start.y;
    } else {
        return a.start.x - b.start.x;
    }
    
});

let map = [];
for(let z = 0; z <= maxZ; z++) {
    let row = [];
    for(let y = 0; y <= maxY; y++) {
        row.push(Array(maxX + 1).fill(0));
    }
    map.push(row);
}

let brickId = 1;
data.forEach(b => {
    let start = b.start;
    let end = b.end;
    b.brickId = brickId;
    for(let z = start.z; z <= end.z; z++) {
        for(let y = start.y; y <= end.y; y++) {
            for(let x = start.x; x <= end.x; x++) {
                map[z][y][x] = brickId;
            }

        }
    }
    brickId++;
});

data.forEach(b => {
    let movingDown = true;
    while(movingDown) {
        let canMoveDown = true;
        if(b.start.z === 1) {
            canMoveDown = false;
            movingDown = false;
            break;
        }
        for(let y = b.start.y; y <= b.end.y; y++) {
            for(let x = b.start.x; x <= b.end.x; x++) {
                if(map[b.start.z - 1][y][x] !== 0) {
                    canMoveDown = false;
                    break;
                }
            }
        }
        if(canMoveDown) {
            // SIIRRETÄÄN EN OSAA TEHÄ FIKSUSTI
            for(let z = b.start.z; z <= b.end.z; z++) {
                for(let y = b.start.y; y <= b.end.y; y++) {
                    for(let x = b.start.x; x <= b.end.x; x++) {
                        map[z][y][x] = 0;
                    }
                }
            }
            b.start.z = b.start.z - 1;
            b.end.z = b.end.z - 1;
            for(let z = b.start.z; z <= b.end.z; z++) {
                for(let y = b.start.y; y <= b.end.y; y++) {
                    for(let x = b.start.x; x <= b.end.x; x++) {
                        map[z][y][x] = b.brickId;
                    }
                }
            }
        } else {
            movingDown = false;
        }
    }
});

data.forEach(b => {
    // tsekataan mitä tää homma supportaa ja mitkä supporttaa tätä
    let supports = new Set();
    if(b.end.z <= maxZ + 1) {
        for(let y = b.start.y; y <= b.end.y; y++) {
            for(let x = b.start.x; x <= b.end.x; x++) {
                if(map[b.end.z+1][y][x] !== 0) {
                    supports.add(map[b.end.z + 1][y][x]);
                }
            }
        }
    }
    let supportedBy = new Set();
    if(b.start.z > 1) {
        for(let y = b.start.y; y <= b.end.y; y++) {
            for(let x = b.start.x; x <= b.end.x; x++) {
                if(map[b.start.z-1][y][x] !== 0) {
                    supportedBy.add(map[b.start.z - 1][y][x]);
                }
            }
        }
    }
    b.supports = supports;
    b.supportedBy = supportedBy;
});

let disintegratable = new Set();
data.forEach(b => {
    if(b.supports.size === 0) {
        disintegratable.add(b.brickId);
    } else {
        let removable = true;
        b.supports.forEach(value => {
            if(data.find(a => a.brickId === value).supportedBy.size === 1) {
                removable = false;
            }
        });
        if(removable){
            disintegratable.add(b.brickId);
        }
    }
});

console.log(disintegratable.size);

const fallingBricks = (fallen) => {
    let newFallen = new Set([...fallen]);
    fallen.forEach(f => {
        let brick = data.find(a => a.brickId === f);
        brick.supports.forEach(value => {
            let b = data.find(a => a.brickId === value);
            let supported = [...b.supportedBy];
            supported = supported.filter(a => !fallen.has(a));
            if(supported.length < 1) {
                newFallen.add(b.brickId);
            }
        });
    })
    if(newFallen.size === fallen.size) {
        return newFallen;
    }
    return fallingBricks(newFallen);
}

let sum = 0;

data.forEach(b => {
    let set = new Set();
    set.add(b.brickId)
    let result = fallingBricks(set);
    sum += result.size - 1;
});

console.log(sum);