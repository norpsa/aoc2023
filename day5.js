import { readFileSync } from 'fs';
const seeds = [];
const seedSoil = [];
const soilFertilizer = [];
const fertilizerWater = [];
const waterLight = [];
const lightTemperature = [];
const temperatureHumidity = [];
const humidityLocation = [];

readFileSync('input_day5.txt', 'utf-8').split(/\r?\n\n/).forEach(function(group){
    if(group.startsWith("seeds")) {
        group.split(": ")[1].split(" ").forEach(a => seeds.push(parseInt(a)));
    } else if(group.startsWith("seed-to-soil map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            seedSoil.push({ first: values[1], second: values[0], range: values[2]});
        }
    } else if(group.startsWith("soil-to-fertilizer map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            soilFertilizer.push({ first: values[1], second: values[0], range: values[2]});
        }
    } else if(group.startsWith("fertilizer-to-water map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            fertilizerWater.push({ first: values[1], second: values[0], range: values[2]});
        }
    } else if(group.startsWith("water-to-light map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            waterLight.push({ first: values[1], second: values[0], range: values[2]});
        }
    } else if(group.startsWith("light-to-temperature map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            lightTemperature.push({ first: values[1], second: values[0], range: values[2]});
        }
    } else if(group.startsWith("temperature-to-humidity map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            temperatureHumidity.push({ first: values[1], second: values[0], range: values[2]});
        }
    } else if(group.startsWith("humidity-to-location map")) {
        const lines = group.split(/\r?\n/);
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(" ").map(a => parseInt(a));
            humidityLocation.push({ first: values[1], second: values[0], range: values[2]});
        }
    }
});

let lowest = 1000000000;

const findLocation = (seed) => {
    let soil = seed;
    for(let i = 0; i < seedSoil.length; i++) {
        if(seed >= seedSoil[i].first && seed < seedSoil[i].first + seedSoil[i].range) {
            soil = seedSoil[i].second + (seedSoil[i].range - (seedSoil[i].first + seedSoil[i].range - seed));
        }
    }

    let fertilizer = soil;
    for(let i = 0; i < soilFertilizer.length; i++) {
        if(soil >= soilFertilizer[i].first && soil < soilFertilizer[i].first + soilFertilizer[i].range) {
            fertilizer = soilFertilizer[i].second + (soilFertilizer[i].range - (soilFertilizer[i].first + soilFertilizer[i].range - soil));
        }
    }

    let water = fertilizer;
    for(let i = 0; i < fertilizerWater.length; i++) {
        if(fertilizer >= fertilizerWater[i].first && fertilizer < fertilizerWater[i].first + fertilizerWater[i].range) {
            water = fertilizerWater[i].second + (fertilizerWater[i].range - (fertilizerWater[i].first + fertilizerWater[i].range - fertilizer));
        }
    }

    let light = water;
    for(let i = 0; i < waterLight.length; i++) {
        if(water >= waterLight[i].first && water < waterLight[i].first + waterLight[i].range) {
            light = waterLight[i].second + (waterLight[i].range - (waterLight[i].first + waterLight[i].range - water));
        }
    }

    let temperature = light;
    for(let i = 0; i < lightTemperature.length; i++) {
        if(light >= lightTemperature[i].first && light < lightTemperature[i].first + lightTemperature[i].range) {
            temperature = lightTemperature[i].second + (lightTemperature[i].range - (lightTemperature[i].first + lightTemperature[i].range - light));
        }
    }

    let humidity = temperature;
    for(let i = 0; i < temperatureHumidity.length; i++) {
        if(temperature >= temperatureHumidity[i].first && temperature < temperatureHumidity[i].first + temperatureHumidity[i].range) {
            humidity = temperatureHumidity[i].second + (temperatureHumidity[i].range - (temperatureHumidity[i].first + temperatureHumidity[i].range - temperature));
        }
    }

    let location = humidity;
    for(let i = 0; i < humidityLocation.length; i++) {
        if(humidity >= humidityLocation[i].first && humidity < humidityLocation[i].first + humidityLocation[i].range) {
            location = humidityLocation[i].second + (humidityLocation[i].range - (humidityLocation[i].first + humidityLocation[i].range - humidity));
        }
    }
    return location;
}

// PART 1
seeds.forEach(seed => {
    let location = findLocation(seed);

    if(location < lowest) {
        lowest = location;
    }
    
})

console.log("PART 1", lowest);

//PART 2
lowest = 1000000000;
console.time("part2");
for(let k = 0; k < seeds.length; k+=2) {
    for(let seed = seeds[k]; seed < seeds[k] + seeds[k + 1]; seed++) {
        let location = findLocation(seed);

        if(location < lowest) {
            lowest = location;
        }
    }
}
console.timeEnd("part2");

console.log("PART 2", lowest);