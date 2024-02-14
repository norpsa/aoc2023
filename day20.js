import { readFileSync } from 'fs';

let modules = [];
readFileSync('input_day20.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let a = line.split(" -> ");
    if(a[0] === 'broadcaster') {
        modules.push({name: 'broadcaster', type: 'broadcaster', destinations: a[1].split(",").map(e => e.trim())});
    }
    if(a[0].startsWith("%")) {
        modules.push({name: a[0].substring(1), type: '%', destinations: a[1].split(",").map(e => e.trim()), state: 'off'});
    }
    if(a[0].startsWith("&")) {
        modules.push({name: a[0].substring(1), type: '&', destinations: a[1].split(",").map(e => e.trim()), memory: new Map()});
    }
});

modules.filter(a => a.type === '&').forEach(m => {
    let inputs = modules.filter(a => a.destinations.find(k => k === m.name));
    inputs.forEach(i => {
        m.memory.set(i.name, 'low');
    });
});
let patterns = new Map();
modules.forEach(a => {
    patterns.set(a.name, []);
});

console.log(modules);
let xl = [];
let ln = [];
let xp = [];
let gp = [];

let lowPulses = 0;
let highPulses = 0;
for(let x = 0; x < 20000; x++) {
    let pulses = [];
    pulses.push({type: 'low', destination: 'broadcaster', source: 'button'});
    lowPulses++;

    while(pulses.length > 0) {
        let current = pulses.shift();
        let destination = modules.find(a => a.name === current.destination);
        if(!destination) {
            continue;
        }
        patterns.get(current.destination).push({type: current.type, count: x });

        if(destination.type === 'broadcaster') {
            destination.destinations.forEach(d => {
                if(current.type === 'low') {
                    lowPulses++;
                } else {
                    highPulses++;
                }
                pulses.push({ type: current.type, destination: d, source: current.destination });
            });
            
        }
        if(destination.type === '%') {
            if(current.type === 'high') {
                // Nothing happens
                continue;
            } else {
                if(destination.state === 'off') {
                    destination['state'] = 'on';
                    destination.destinations.forEach(d => {
                        highPulses++;
                        pulses.push({ type: 'high', destination: d, source: current.destination });
                    });
                } else {
                    destination['state'] = 'off';
                    destination.destinations.forEach(d => {
                        lowPulses++;
                        pulses.push({ type: 'low', destination: d, source: current.destination });
                    });
                }
            } 
        }
        if(destination.type === '&') {
            destination.memory.set(current.source, current.type);
            let allHigh = true;
            destination.memory.forEach((value, key) => {
                if(value === 'low') {
                    allHigh = false;
                }
            });
            if(destination.name === 'df') {
                xl.push({ type: destination.memory.get('xl'), count: x});
                ln.push({ type: destination.memory.get('ln'), count: x});
                xp.push({ type: destination.memory.get('xp'), count: x});
                gp.push({ type: destination.memory.get('gp'), count: x});
            };

            if(allHigh) {
                destination.destinations.forEach(d => {
                    lowPulses++;
                    pulses.push({ type: 'low', destination: d, source: current.destination });
                });
            } else {
                destination.destinations.forEach(d => {
                    highPulses++;
                    pulses.push({ type: 'high', destination: d, source: current.destination });
                });
            }
        }
    }
}
console.log(lowPulses*highPulses);
/*
console.log(modules.find(a => a.name === 'df'));
console.log(patterns.get('xl').filter(a => a.type === 'high').length, patterns.get('xl').filter(a => a.type === 'low').length);
console.log(patterns.get('ln').filter(a => a.type === 'high').length, patterns.get('ln').filter(a => a.type === 'low').length);
console.log(patterns.get('xp').filter(a => a.type === 'high').length, patterns.get('xp').filter(a => a.type === 'low').length);
console.log(patterns.get('gp').filter(a => a.type === 'high').length, patterns.get('gp').filter(a => a.type === 'low').length); */

console.log(xl.filter(a => a.type === 'low').length, xl.filter(a => a.type === 'high').length);
console.log(ln.filter(a => a.type === 'low').length, ln.filter(a => a.type === 'high').length);
console.log(xp.filter(a => a.type === 'low').length, xp.filter(a => a.type === 'high').length);
console.log(gp.filter(a => a.type === 'low').length, gp.filter(a => a.type === 'high').length);

console.log(xl.filter(a => a.type === 'high'));
console.log(ln.filter(a => a.type === 'high'));
console.log(xp.filter(a => a.type === 'high'));
console.log(gp.filter(a => a.type === 'high'));
// tsekataan noista että minkävälein toistaa ja sit otettiin niistä lcm 