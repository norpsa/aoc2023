import { readFileSync } from 'fs';

let map = [];
readFileSync('input_day10.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    const values = line.split("").map(a => { 
       return { pipe: a, mainLoop: false };
    });
    map.push(values);
});

// Find start
let startRow = 0;
let startColumn = 0;
for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[0].length; j++) {
        if(map[i][j].pipe === 'S') {
            startRow = i;
            startColumn = j;
            map[i][j]['isStart'] = true;
            break;
        }
    }
}

// Find what shape is start
const canConnectToStart = [];
// LEFT
if(startColumn > 0) {
    let point = map[startRow][startColumn - 1];
    if(point.pipe === 'L' || point.pipe === 'F' || point.pipe === '-') {
        canConnectToStart.push("WEST");
    }
}

// RIGHT
if(startColumn < map[0].length - 1) {
    let point = map[startRow][startColumn + 1];
    if(point.pipe === '7' || point.pipe === 'J' || point.pipe === '-') {
        canConnectToStart.push("EAST");
    }
}

// UP
if(startRow > 0) {
    let point = map[startRow - 1][startColumn];
    if(point.pipe === '|' || point.pipe === '7' || point.pipe === 'F') {
        canConnectToStart.push("NORTH");
    }
}

// DOWN
if(startRow < map.length - 1) {
    let point = map[startRow + 1][startColumn];
    if(point.pipe === 'L' || point.pipe === 'J' || point.pipe === '|') {
        canConnectToStart.push("SOUTH");
    }
}

if(canConnectToStart[0] === 'WEST' && canConnectToStart[1] === 'EAST') {
    map[startRow][startColumn]['pipe'] = '-';
}

if(canConnectToStart[0] === 'WEST' && canConnectToStart[1] === 'NORTH') {
    map[startRow][startColumn]['pipe'] = 'J';
}

if(canConnectToStart[0] === 'WEST' && canConnectToStart[1] === 'SOUTH') {
    map[startRow][startColumn]['pipe'] = '7';
}

if(canConnectToStart[0] === 'EAST' && canConnectToStart[1] === 'NORTH') {
    map[startRow][startColumn]['pipe'] = 'L';
}

if(canConnectToStart[0] === 'EAST' && canConnectToStart[1] === 'SOUTH') {
    map[startRow][startColumn]['pipe'] = 'F';
}

if(canConnectToStart[0] === 'NORTH' && canConnectToStart[1] === 'SOUTH') {
    map[startRow][startColumn]['pipe'] = '|';
}

const findConnections = (row, column) => {
    const connections = [];
    let pipe = map[row][column]['pipe'];
    //NORTH
    if(row > 0 && (pipe === '|' || pipe === 'L' || pipe === 'J') &&
     (map[row - 1][column]['pipe'] === '|' || map[row - 1][column]['pipe'] === '7' || map[row - 1][column]['pipe'] === 'F')) {
        connections.push({ row: row - 1, column: column });
    }

    //SOUTH
    if(row < map.length - 1 && (pipe === '|' || pipe === '7' || pipe === 'F') &&
     (map[row + 1][column]['pipe'] === '|' || map[row + 1][column]['pipe'] === 'L' || map[row + 1][column]['pipe'] === 'J')) {
        connections.push({ row: row + 1, column: column });
    }

    //EAST
    if(column < map[0].length - 1 && (pipe === '-' || pipe === 'L' || pipe === 'F') &&
     (map[row][column + 1]['pipe'] === '-' || map[row][column + 1]['pipe'] === '7' || map[row][column + 1]['pipe'] === 'J')) {
        connections.push({ row: row, column: column + 1 });
    }

    //WEST
    if(column > 0 && (pipe === '-' || pipe === '7' || pipe === 'J') &&
     (map[row][column - 1]['pipe'] === '-' || map[row][column - 1]['pipe'] === 'L' || map[row][column - 1]['pipe'] === 'F')) {
        connections.push({ row: row, column: column - 1 });
    }
    return connections;
}

let path = [];
let current = { row: startRow, column: startColumn };
let end = false;

while(!end) {
    // lähetään alusta ja etsitään mihin yhdistyy
    // otetaan niistä eka jossa ei oo jo käyty
    // mennään siihen ja toistetaan kunnes ollaan taas alussa
    path.push(current);
    map[current.row][current.column]['mainLoop'] = true;
    let connections = findConnections(current.row, current.column);
    
    // OTETAAN POIS NE JOSSA ON JO KÄYTY
    connections = connections.filter(a => {
        if(path.filter(x => x.row === a.row && x.column === a.column).length > 0) {
            return false;
        }
        return true;
    });
    if(connections.length === 0) {
        end = true;
        break;
    }

    current = connections[0];
}

console.log("PART 1", path.length / 2);

// Muunnetaan kaikki mikä ei oo mainLoopia maaksi koska aivan sama
for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[0].length; j++) {
        if(!map[i][j].mainLoop) {
            map[i][j]['pipe'] = '.';
        }
    }
}

// Täytetään välit niin
let addedRows = [];
for(let i = 0; i <  map.length - 1; i++) {
    addedRows.push(map[i].map(a => a.pipe));
    let newRow = [];
    for(let j = 0; j < map[0].length; j++) {
        if(map[i][j].pipe === '.'|| map[i+1][j].pipe === '.' || ((map[i][j].pipe === '-' || map[i][j].pipe === 'L' || map[i][j].pipe === 'J') &&
        (map[i+1][j].pipe === '-' || map[i + 1][j].pipe === '7' || map[i + 1][j].pipe === 'F'))) {
            newRow.push('X');
        } else {
            newRow.push('|')
        }
    }
    addedRows.push(newRow);
}

// Täytetään toisen suuntaiset välit
let addedColumns = [];
for(let i = 0; i < addedRows.length; i++) {
    let newRow = [];
    for(let j = 0; j < addedRows[0].length - 1; j++) {
        newRow.push(addedRows[i][j]);
        if(addedRows[i][j] === '.'|| addedRows[i][j + 1] === '.' || addedRows[i][j] === 'X'|| addedRows[i][j + 1] === 'X' || ((addedRows[i][j] === '|' || addedRows[i][j] === 'J' || addedRows[i][j] === '7') &&
        (addedRows[i][j + 1] === '|' || addedRows[i][j + 1] === 'L' || addedRows[i][j + 1] === 'F'))) {
            newRow.push('X');
        } else {
            newRow.push('-')
        }
    }
    newRow.push(addedRows[i][addedRows[0].length - 1]);
    addedColumns.push(newRow);
}

// Tehdään alustava etsintä pisteistä jotka vois olla sisällä
let areasInside = [];
for(let i = 1; i < addedColumns.length; i++) {
    let lastPipe = addedColumns[i].findLastIndex(a => (a !== '.' && a !== 'X'));
    let firstPipe = addedColumns[i].findIndex(a => (a !== '.' && a !== 'X'));
    for(let j = firstPipe; j < lastPipe; j++) {
        if(addedColumns[i][j] === '.') {
            areasInside.push({row: i, column: j});
        }
    }
}

// Koitetaan etsiä polku reunalle, tää ei toimi esimerkki inputeilla koska niissä ei jää tyhjät reunat, mut oikeesti jää
let sum = 0;
areasInside.forEach(point => {
    let explored = [];
    explored.push(point);
    let steps = [];
    steps.push({ row: point.row, column: point.column });
    let enclosed = true;
    while(steps.length > 0) {
        let current = steps.shift();
        let possibleSteps = [];
        // Jos päästään ulos niin lopetetaan sit
        if((current.row === 0 || current.column === 0 || current.row === addedColumns.length - 1 || current.column === addedColumns[0].length - 1) &&
            addedColumns[current.row][current.column] === '.') {
            enclosed = false;
            break;
        }
        explored.push({ row: current.row, column: current.column });
        // LEFT
        if(current.column > 0 && (addedColumns[current.row][current.column - 1] === '.' || addedColumns[current.row][current.column - 1] === 'X')) {
            possibleSteps.push({row: current.row, column: current.column - 1 });
        }

        // RIGHT
        if(current.column < addedColumns[0].length - 1 && (addedColumns[current.row][current.column + 1] === '.' || addedColumns[current.row][current.column + 1] === 'X')) {
            possibleSteps.push({row: current.row, column: current.column + 1 });
        }

        // DOWN
        if(current.row < addedColumns.length - 1 && (addedColumns[current.row + 1][current.column] === '.' || addedColumns[current.row + 1][current.column] === 'X')) {
            possibleSteps.push({row: current.row + 1, column: current.column });
        }

        // UP
        if(current.row > 0 && (addedColumns[current.row - 1][current.column] === '.' || addedColumns[current.row - 1][current.column] === 'X')) {
            possibleSteps.push({row: current.row - 1, column: current.column });
        }

        possibleSteps.forEach(a => {
            if(explored.findIndex(x => x.row === a.row && x.column === a.column) === -1 && steps.findIndex(x => x.row === a.row && x.column === a.column) === -1) {
                steps.push(a);
            }
        });
    }
    if(enclosed) {
        sum++;
    }
});

console.log(sum);