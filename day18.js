import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day18.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let values = line.split(" ");
    data.push({ direction: values[0], meters: parseInt(values[1]), color: values[2] });
});

let r = 0;
let c = 0;
let points = [];
points.push({r, c});

let corners = [];

data.forEach(line => {
    let d = line.direction;
    let rc = 0;
    let cc = 0;
    if(d === 'R') {
        cc = 1;
    }
    if(d === 'L') {
        cc = -1;
    }
    if(d === 'U') {
        rc = -1;
    }
    if(d === 'D') {
        rc = 1;
    }

    corners.push({r, c});
    for(let i = 0; i < line.meters; i++) {
        r += rc;
        c += cc;
        points.push({r, c});
    }
});

/*points = points.sort((a,b) => a.r - b.r);

let minR = points[0].r;
let maxR = points[points.length - 1].r;

points = points.sort((a,b) => a.c - b.c);

let minC = points[0].c;
let maxC = points[points.length - 1].c;*/

// 0 = minR eli kaikkeen lisätään minR

/*let map = [];
for(let i = 0; i <= maxR + Math.abs(minR); i++){
    map.push(Array(maxC + Math.abs(minC) + 1).fill('.'));
}

points.forEach(point => {
    map[point.r + Math.abs(minR)][point.c + Math.abs(minC)] = '#';
}); */

/*for(let i = 0; i < map.length; i++) {
    let row = "";
    for(let j = 0; j < map[0].length; j++) {
        row += map[i][j];
    }
    console.log(row);
}*/
// SHOELACE
const shoeLace = () => {
    let sum1 = 0;
    let sum2 = 0;
    for(let i = 0; i < corners.length - 1; i++) {
        sum1 += corners[i].c * corners[i+1].r;
        sum2 += corners[i].r * corners[i+1].c;
    }

    sum1 += corners[corners.length - 1].c*corners[0].r 
    sum2 += corners[corners.length - 1].r*corners[0].c
    
    let area = Math.abs(sum1 - sum2) / 2;

    let interior_points = (points.length - 1) / -2 + 1 + area;

    let result = interior_points + points.length - 1;
    return result;
}
console.log("PART1", shoeLace());

// PART 2
corners = [];
let pointsLength = 0;
data.forEach(line => {
    let hex = line.color;
    let d = hex[7];
    let meters = parseInt(hex.substr(2, 5), 16);
    let rc = 0;
    let cc = 0;
    if(d === '0') {
        cc = 1;
    }
    if(d === '2') {
        cc = -1;
    }
    if(d === '3') {
        rc = -1;
    }
    if(d === '1') {
        rc = 1;
    }

    corners.push({r, c});
    for(let i = 0; i < meters; i++) {
        r += rc;
        c += cc;
        pointsLength++;
    }
});

let sum1 = 0;
let sum2 = 0;
for(let i = 0; i < corners.length - 1; i++) {
    sum1 += corners[i].c * corners[i+1].r;
    sum2 += corners[i].r * corners[i+1].c;
}

sum1 += corners[corners.length - 1].c*corners[0].r 
sum2 += corners[corners.length - 1].r*corners[0].c

let area = Math.abs(sum1 - sum2) / 2;

let interior_points = (pointsLength - 1) / -2 + 1 + area;

let result = interior_points + pointsLength - 1;

console.log("PART2", result);
