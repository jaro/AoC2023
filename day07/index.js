const fs = require('fs')

const deckWithJack = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const deckWithJoker = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
const hands = {FIVE:70, FOUR:60, HOUSE:50, THREE:40, TWO_PAIR:30, PAIR:20, HIGH:10}

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let games = parseGames(lines)

    let sortedGames = games.sort((a,b) => sortGame(a, b))
    let points = sortedGames.map((game, index) => (game[2] * (index+1))).reduce((a,b) => a+b)

    return points
}

function getSolutionPart2(lines) {
    let games = parseGames(lines)

    let sortedGames = games.sort((a,b) => sortGame2(a, b))
    let points = sortedGames.map((game, index) => (game[2] * (index+1))).reduce((a,b) => a+b)

    return points
}

function getKey(value) {
    switch(value) {
        case 70: 
            return 'FIVE'
            break
        case 60:
            return 'FOUR'
            break
        case 50:
            return 'HOUSE'
            break
        case 40:
            return 'THREE'
            break
        case 30:
            return 'TWO PAIR'
            break
        case 20:
            return 'PAIR'
            break
        case 10:
            return 'HIGH'
            break
    }
}

function sortGame(a, b) {
    let pointsA = calcHand(a)
    let pointsB = calcHand(b)

    if (pointsA>pointsB)
        return 1
    else if (pointsB>pointsA)
        return -1
    else {
        for (cardIndex in a[0]) {
            if (deckWithJack.indexOf(a[0][cardIndex]) > deckWithJack.indexOf(b[0][cardIndex]))
                return 1
            else if (deckWithJack.indexOf(a[0][cardIndex]) < deckWithJack.indexOf(b[0][cardIndex]))
                return -1
        }
    }
    
    return 0
}

function sortGame2(a, b) {
    let pointsA = calcHand2(a)
    let pointsB = calcHand2(b)

    if (pointsA>pointsB)
        return 1
    else if (pointsB>pointsA)
        return -1
    else {
        for (cardIndex in a[0]) {
            if (deckWithJoker.indexOf(a[0][cardIndex]) > deckWithJoker.indexOf(b[0][cardIndex]))
                return 1
            else if (deckWithJoker.indexOf(a[0][cardIndex]) < deckWithJoker.indexOf(b[0][cardIndex]))
                return -1
        }
    }
    
    return 0
}

function calcHand(hand) {
    let rankValues = Array.from(hand[1].values())
    
    if ((rankValues.filter(v => v==5)).length == 1)
        return hands.FIVE
    else if (rankValues.filter(v => v==4).length == 1)
        return hands.FOUR
    else if (rankValues.filter(v => v==2).length == 2)
        return hands.TWO_PAIR
    else if (rankValues.filter(v => (v==3 ||v==2)).length == 2)
        return hands.HOUSE
    else if (rankValues.filter(v => v==3).length == 1)
        return hands.THREE
    else if (rankValues.filter(v => v==2).length == 1)
        return hands.PAIR
    else
        return hands.HIGH
}

function calcHand2(hand) {
    var map = new Map(hand[1])
    
    let jokers = map.get('J')
    map.set('J', 0)
    let rankValues = Array.from(map.values())
    
    if (rankValues.filter(v => (v+jokers)>=5).length >= 1) {
        return hands.FIVE
    } else if (rankValues.filter(v => (v+jokers)>=4).length >= 1) {
        return hands.FOUR
    }
    if (jokers == 2) {
        if (rankValues.filter(v => (v==2)).length >= 1) {
            return hands.HOUSE
        } else if (rankValues.filter(v => (v==1)).length >= 1) {
            return hands.THREE
        } else { //alltid tvåpar
            return hands.TWO_PAIR
        }
    } else if (jokers == 1) {
        if (rankValues.filter(v => (v==2)).length >= 2) {
            return hands.HOUSE
        } else if (rankValues.filter(v => (v==3)).length >= 1) {
            return hands.HOUSE
        } else if(rankValues.filter(v => v==2).length >= 1) {
            return hands.THREE
        } else {
            return hands.PAIR
        }
    } else {
        if (rankValues.filter(v => v==2).length == 2)
            return hands.TWO_PAIR
        else if (rankValues.filter(v => (v==3 ||v==2)).length == 2)
            return hands.HOUSE
        else if (rankValues.filter(v => v==3).length == 1)
            return hands.THREE
        else if (rankValues.filter(v => v==2).length == 1)
            return hands.PAIR
        else
            return hands.HIGH
    }
}

function getRankMap(hand) {
    var map = new Map(deckWithJack.map(r => [r, 0]))

    for (card of hand) {
        let value = map.get(card)
        map.set(card, (value+1))
    }

    return map
}

function parseGames(lines) {
    var hands = new Array()
    var rankMaps = new Array()
    var bets = new Array()
    
    for (line of lines) {
        hands.push(Array.from(line.split(' ')[0]))
        rankMaps.push(getRankMap(hands[hands.length-1]))
        bets.push(line.split(' ')[1])
    }

    return hands.map((hand, index) => [hand, rankMaps[index], bets[index]])
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}