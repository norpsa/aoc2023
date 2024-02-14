import { readFileSync } from 'fs';

let data = [];
readFileSync('input_day11.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split(""));
});

const findGalaxies = (array) => {
    const galaxies = [];
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[0].length; j++) {
            if(array[i][j] === '#') {
                galaxies.push({row: i, column: j});
            }
        }
    }
    return galaxies;
}

const calculateDistances = (array, multiplier) => {
    const containsGalaxyRow = [];
    for(let i = 0; i < array.length; i++) {
        if(array[i].every(a => a === '.')) {
            containsGalaxyRow.push(false);
        } else {
            containsGalaxyRow.push(true);
        }
    }

    let containsGalaxyColumn = [];
    for(let j = 0; j < array[0].length; j++) {
        let galaxy = false;
        for(let i = 0; i < array.length; i++) {
            if(array[i][j] === '#') {
                galaxy = true;
                break;
            }
        }
        containsGalaxyColumn.push(galaxy);
    }

    const galaxies = findGalaxies(array);

    let sum = 0;

    for(let i = 0; i < galaxies.length - 1; i++) {
        for(let j = i + 1; j < galaxies.length; j++) {
            let emptyRowsBetween = 0;
            for(let x = galaxies[i].row; x < galaxies[j].row; x++) {
                if(!containsGalaxyRow[x]) {
                    emptyRowsBetween++;
                }
            }

            let biggerColumn = Math.max(galaxies[i].column, galaxies[j].column);
            let smallerColumn = Math.min(galaxies[i].column, galaxies[j].column);
            let emptyColumnsBetween = 0;
            for(let x = smallerColumn; x < biggerColumn; x++) {
                if(!containsGalaxyColumn[x]) {
                    emptyColumnsBetween++;
                }
            }

            let dist = Math.abs(galaxies[i].row - galaxies[j].row) + Math.abs(galaxies[i].column - galaxies[j].column);
            dist += (emptyColumnsBetween + emptyRowsBetween)*(multiplier - 1);
            sum += dist;
        }
    }

    return sum;
}

console.log("PART1", calculateDistances(data, 2));
console.log("PART2", calculateDistances(data, 1000000));

