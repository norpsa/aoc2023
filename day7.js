import { readFileSync } from 'fs';

const data = [];
readFileSync('input_day7.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    const values = line.split(" ");
    data.push({ hand: values[0], bet: parseInt(values[1])});
});

// PART 1
const cardValue = {
    'A': 14, 'K' : 13, 'Q' : 12, 'J' : 11, 'T' : 10, '9' : 9, '8' : 8, '7' : 7, '6' : 6, '5' : 5, '4': 4, '3': 3, '2' : 2
};

// 7 five of a kind
// 6 four of a kind
// 5 three of a kind
// 4 fullhouse
// 3 two pair
// 2 one pair
// 1 high card

const getGameResult = (cards) => {
    if (cards[0].amount === 5) {
        return 7;
    } else if(cards[0].amount === 4) {
        return 6;
    } else if(cards[0].amount === 3 && cards[1].amount === 2) {
        return 5;
    } else if(cards[0].amount === 3) {
        return 4;
    } else if(cards[0].amount === 2 && cards[1].amount === 2) {
        return 3;
    } else if(cards[0].amount === 2) {
        return 2;
    } else {
        return 1;
    }
}

const sortResults = (a,b) => {
    if(a.result > b.result) {
        return 1;
    }
    if(a.result === b.result) {
        for(let i = 0; i < 5; i++) {
            if(cardValue[a.game.hand.charAt(i)] > cardValue[b.game.hand.charAt(i)]) {
                return 1;
            } else if(cardValue[a.game.hand.charAt(i)] < cardValue[b.game.hand.charAt(i)]) {
                return -1;
            }
        }
        return 0;
    }
    return -1;
}

let results = [];
data.forEach(game => {
    const cards = Object.keys(cardValue).map(card => {
        return { card, amount: game.hand.split(card).length - 1}
    }).sort((a, b) => b.amount - a.amount);

    results.push({game, result: getGameResult(cards)});

});

let sorted = results.sort(sortResults);

let result = 0;

for(let i = 0; i < sorted.length; i++) {
    result += (i+1)*sorted[i].game.bet;
}

console.log(result);

// PART 2

cardValue['J'] = 0;

results = [];
data.forEach(game => {
    const cards = Object.keys(cardValue).map(card => {
        return { card, amount: game.hand.split(card).length - 1}
    }).sort((a, b) => b.amount - a.amount);

    // Replace J with card with highest amount
    let jokers = cards.filter(a => a.card === 'J')[0].amount;
    let filtered = cards.filter(a => a.card !== 'J');
    if(jokers > 0) {
        filtered[0].amount = filtered[0].amount + jokers;
    }

    results.push({game, result: getGameResult(filtered)});

});

sorted = results.sort(sortResults);

result = 0;

for(let i = 0; i < sorted.length; i++) {
    result += (i+1)*sorted[i].game.bet;
}

console.log(result);