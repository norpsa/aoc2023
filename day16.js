import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day16.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split(""));
});

let beams = [{ row: 0, column: -1, direction: 'right' }];
let energized  = [];
for(let i = 0; i < data.length; i++) {
    let row = [];
    for(let j = 0; j < data[0].length; j++) {
        row.push({ left: false, right: false, up: false, down: false });
    }
    energized.push(row);
}

while(beams.length > 0) {
    let newBeams = [];
    for(let k = 0; k < beams.length; k++) {
        let rowOffSet = 0;
        let columnOffSet = 0;
        if(beams[k].direction === 'right') {
            columnOffSet = 1;
        } else if(beams[k].direction === 'left') {
            columnOffSet = -1;
        } if(beams[k].direction === 'up') {
            rowOffSet = -1;
        } if(beams[k].direction === 'down') {
            rowOffSet = 1;
        }
        
        // tsekataan poistuuko
        let r = beams[k].row + rowOffSet;
        let c = beams[k].column + columnOffSet;
        if(r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
            continue;
        }

        let next = data[r][c];
        let d = beams[k].direction;
        if (next === '.') {
            beams[k]['row'] = r;
            beams[k]['column'] = c;
        } else if(next === '/') {
            beams[k]['row'] = r;
            beams[k]['column'] = c;
            if(d === 'right') {
                beams[k].direction = 'up';
            } else if (d === 'left') {
                beams[k].direction = 'down';
            } else if (d === 'up') {
                beams[k].direction = 'right';
            } else if (d === 'down') {
                beams[k].direction = 'left';
            }
        } else if(next === "\\") {
            beams[k]['row'] = r;
            beams[k]['column'] = c;
            if(d === 'right') {
                beams[k].direction = 'down';
            } else if (d === 'left') {
                beams[k].direction = 'up';
            } else if (d === 'up') {
                beams[k].direction = 'left';
            } else if (d === 'down') {
                beams[k].direction = 'right';
            }
        } else if(next === '-') {
            if(d === 'right' || d === 'left') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
            } else {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                beams[k]['direction'] = 'left';
                if(!energized[r][c]['right']) {
                    newBeams.push({row: r, column: c, direction: 'right' });
                }
            }
        } else if(next === '|') {
            if(d === 'up' || d === 'down') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
            } else {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                beams[k]['direction'] = 'up';
                if(!energized[r][c]['down']) {
                    newBeams.push({row: r, column: c, direction: 'down' });
                }
            }
        }
        if(!energized[r][c][beams[k].direction]) {
            newBeams.push({row: beams[k].row, column: beams[k].column, direction: beams[k].direction});
        }
        energized[r][c][beams[k].direction] = true;

    }
    beams = [];
    newBeams.forEach(beam => beams.push(beam));
}

let total = 0;
for(let i = 0; i < energized.length; i++) {
    for(let j = 0; j < energized[0].length; j++) {
        if(energized[i][j].down || energized[i][j].left || energized[i][j].right || energized[i][j].up) {
            total++;
        }
    }
}

console.log(total);

// PART 2
// RIGHT
let highest = 0;
for(let x = 0; x < data.length; x++) {
    let beams = [{ row: x, column: -1, direction: 'right' }];
    let energized  = [];
    for(let i = 0; i < data.length; i++) {
        let row = [];
        for(let j = 0; j < data[0].length; j++) {
            row.push({ left: false, right: false, up: false, down: false });
        }
        energized.push(row);
    }

    while(beams.length > 0) {
        let newBeams = [];
        for(let k = 0; k < beams.length; k++) {
            let rowOffSet = 0;
            let columnOffSet = 0;
            if(beams[k].direction === 'right') {
                columnOffSet = 1;
            } else if(beams[k].direction === 'left') {
                columnOffSet = -1;
            } if(beams[k].direction === 'up') {
                rowOffSet = -1;
            } if(beams[k].direction === 'down') {
                rowOffSet = 1;
            }
            
            // tsekataan poistuuko
            let r = beams[k].row + rowOffSet;
            let c = beams[k].column + columnOffSet;
            if(r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
                continue;
            }

            let next = data[r][c];
            let d = beams[k].direction;
            if (next === '.') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
            } else if(next === '/') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'up';
                } else if (d === 'left') {
                    beams[k].direction = 'down';
                } else if (d === 'up') {
                    beams[k].direction = 'right';
                } else if (d === 'down') {
                    beams[k].direction = 'left';
                }
            } else if(next === "\\") {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'down';
                } else if (d === 'left') {
                    beams[k].direction = 'up';
                } else if (d === 'up') {
                    beams[k].direction = 'left';
                } else if (d === 'down') {
                    beams[k].direction = 'right';
                }
            } else if(next === '-') {
                if(d === 'right' || d === 'left') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'left';
                    if(!energized[r][c]['right']) {
                        newBeams.push({row: r, column: c, direction: 'right' });
                    }
                }
            } else if(next === '|') {
                if(d === 'up' || d === 'down') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'up';
                    if(!energized[r][c]['down']) {
                        newBeams.push({row: r, column: c, direction: 'down' });
                    }
                }
            }
            if(!energized[r][c][beams[k].direction]) {
                newBeams.push({row: beams[k].row, column: beams[k].column, direction: beams[k].direction});
            }
            energized[r][c][beams[k].direction] = true;

        }
        beams = [];
        newBeams.forEach(beam => beams.push(beam));
    }

    let total = 0;
    for(let i = 0; i < energized.length; i++) {
        for(let j = 0; j < energized[0].length; j++) {
            if(energized[i][j].down || energized[i][j].left || energized[i][j].right || energized[i][j].up) {
                total++;
            }
        }
    }
    if(total > highest) {
        highest = total;
    }
}

// LEFT
for(let x = 0; x < data.length; x++) {
    let beams = [{ row: x, column: data[0].length, direction: 'left' }];
    let energized  = [];
    for(let i = 0; i < data.length; i++) {
        let row = [];
        for(let j = 0; j < data[0].length; j++) {
            row.push({ left: false, right: false, up: false, down: false });
        }
        energized.push(row);
    }

    while(beams.length > 0) {
        let newBeams = [];
        for(let k = 0; k < beams.length; k++) {
            let rowOffSet = 0;
            let columnOffSet = 0;
            if(beams[k].direction === 'right') {
                columnOffSet = 1;
            } else if(beams[k].direction === 'left') {
                columnOffSet = -1;
            } if(beams[k].direction === 'up') {
                rowOffSet = -1;
            } if(beams[k].direction === 'down') {
                rowOffSet = 1;
            }
            
            // tsekataan poistuuko
            let r = beams[k].row + rowOffSet;
            let c = beams[k].column + columnOffSet;
            if(r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
                continue;
            }

            let next = data[r][c];
            let d = beams[k].direction;
            if (next === '.') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
            } else if(next === '/') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'up';
                } else if (d === 'left') {
                    beams[k].direction = 'down';
                } else if (d === 'up') {
                    beams[k].direction = 'right';
                } else if (d === 'down') {
                    beams[k].direction = 'left';
                }
            } else if(next === "\\") {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'down';
                } else if (d === 'left') {
                    beams[k].direction = 'up';
                } else if (d === 'up') {
                    beams[k].direction = 'left';
                } else if (d === 'down') {
                    beams[k].direction = 'right';
                }
            } else if(next === '-') {
                if(d === 'right' || d === 'left') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'left';
                    if(!energized[r][c]['right']) {
                        newBeams.push({row: r, column: c, direction: 'right' });
                    }
                }
            } else if(next === '|') {
                if(d === 'up' || d === 'down') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'up';
                    if(!energized[r][c]['down']) {
                        newBeams.push({row: r, column: c, direction: 'down' });
                    }
                }
            }
            if(!energized[r][c][beams[k].direction]) {
                newBeams.push({row: beams[k].row, column: beams[k].column, direction: beams[k].direction});
            }
            energized[r][c][beams[k].direction] = true;

        }
        beams = [];
        newBeams.forEach(beam => beams.push(beam));
    }

    let total = 0;
    for(let i = 0; i < energized.length; i++) {
        for(let j = 0; j < energized[0].length; j++) {
            if(energized[i][j].down || energized[i][j].left || energized[i][j].right || energized[i][j].up) {
                total++;
            }
        }
    }
    if(total > highest) {
        highest = total;
    }
}

// LEFT
for(let x = 0; x < data[0].length; x++) {
    let beams = [{ row: -1, column: x, direction: 'down' }];
    let energized  = [];
    for(let i = 0; i < data.length; i++) {
        let row = [];
        for(let j = 0; j < data[0].length; j++) {
            row.push({ left: false, right: false, up: false, down: false });
        }
        energized.push(row);
    }

    while(beams.length > 0) {
        let newBeams = [];
        for(let k = 0; k < beams.length; k++) {
            let rowOffSet = 0;
            let columnOffSet = 0;
            if(beams[k].direction === 'right') {
                columnOffSet = 1;
            } else if(beams[k].direction === 'left') {
                columnOffSet = -1;
            } if(beams[k].direction === 'up') {
                rowOffSet = -1;
            } if(beams[k].direction === 'down') {
                rowOffSet = 1;
            }
            
            // tsekataan poistuuko
            let r = beams[k].row + rowOffSet;
            let c = beams[k].column + columnOffSet;
            if(r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
                continue;
            }

            let next = data[r][c];
            let d = beams[k].direction;
            if (next === '.') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
            } else if(next === '/') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'up';
                } else if (d === 'left') {
                    beams[k].direction = 'down';
                } else if (d === 'up') {
                    beams[k].direction = 'right';
                } else if (d === 'down') {
                    beams[k].direction = 'left';
                }
            } else if(next === "\\") {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'down';
                } else if (d === 'left') {
                    beams[k].direction = 'up';
                } else if (d === 'up') {
                    beams[k].direction = 'left';
                } else if (d === 'down') {
                    beams[k].direction = 'right';
                }
            } else if(next === '-') {
                if(d === 'right' || d === 'left') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'left';
                    if(!energized[r][c]['right']) {
                        newBeams.push({row: r, column: c, direction: 'right' });
                    }
                }
            } else if(next === '|') {
                if(d === 'up' || d === 'down') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'up';
                    if(!energized[r][c]['down']) {
                        newBeams.push({row: r, column: c, direction: 'down' });
                    }
                }
            }
            if(!energized[r][c][beams[k].direction]) {
                newBeams.push({row: beams[k].row, column: beams[k].column, direction: beams[k].direction});
            }
            energized[r][c][beams[k].direction] = true;

        }
        beams = [];
        newBeams.forEach(beam => beams.push(beam));
    }

    let total = 0;
    for(let i = 0; i < energized.length; i++) {
        for(let j = 0; j < energized[0].length; j++) {
            if(energized[i][j].down || energized[i][j].left || energized[i][j].right || energized[i][j].up) {
                total++;
            }
        }
    }
    if(total > highest) {
        highest = total;
    }
}

// UP
for(let x = 0; x < data[0].length; x++) {
    let beams = [{ row: data.length, column: x, direction: 'up' }];
    let energized  = [];
    for(let i = 0; i < data.length; i++) {
        let row = [];
        for(let j = 0; j < data[0].length; j++) {
            row.push({ left: false, right: false, up: false, down: false });
        }
        energized.push(row);
    }

    while(beams.length > 0) {
        let newBeams = [];
        for(let k = 0; k < beams.length; k++) {
            let rowOffSet = 0;
            let columnOffSet = 0;
            if(beams[k].direction === 'right') {
                columnOffSet = 1;
            } else if(beams[k].direction === 'left') {
                columnOffSet = -1;
            } if(beams[k].direction === 'up') {
                rowOffSet = -1;
            } if(beams[k].direction === 'down') {
                rowOffSet = 1;
            }
            
            // tsekataan poistuuko
            let r = beams[k].row + rowOffSet;
            let c = beams[k].column + columnOffSet;
            if(r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
                continue;
            }

            let next = data[r][c];
            let d = beams[k].direction;
            if (next === '.') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
            } else if(next === '/') {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'up';
                } else if (d === 'left') {
                    beams[k].direction = 'down';
                } else if (d === 'up') {
                    beams[k].direction = 'right';
                } else if (d === 'down') {
                    beams[k].direction = 'left';
                }
            } else if(next === "\\") {
                beams[k]['row'] = r;
                beams[k]['column'] = c;
                if(d === 'right') {
                    beams[k].direction = 'down';
                } else if (d === 'left') {
                    beams[k].direction = 'up';
                } else if (d === 'up') {
                    beams[k].direction = 'left';
                } else if (d === 'down') {
                    beams[k].direction = 'right';
                }
            } else if(next === '-') {
                if(d === 'right' || d === 'left') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'left';
                    if(!energized[r][c]['right']) {
                        newBeams.push({row: r, column: c, direction: 'right' });
                    }
                }
            } else if(next === '|') {
                if(d === 'up' || d === 'down') {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                } else {
                    beams[k]['row'] = r;
                    beams[k]['column'] = c;
                    beams[k]['direction'] = 'up';
                    if(!energized[r][c]['down']) {
                        newBeams.push({row: r, column: c, direction: 'down' });
                    }
                }
            }
            if(!energized[r][c][beams[k].direction]) {
                newBeams.push({row: beams[k].row, column: beams[k].column, direction: beams[k].direction});
            }
            energized[r][c][beams[k].direction] = true;

        }
        beams = [];
        newBeams.forEach(beam => beams.push(beam));
    }

    let total = 0;
    for(let i = 0; i < energized.length; i++) {
        for(let j = 0; j < energized[0].length; j++) {
            if(energized[i][j].down || energized[i][j].left || energized[i][j].right || energized[i][j].up) {
                total++;
            }
        }
    }
    if(total > highest) {
        highest = total;
    }
}

console.log(highest);