const fs = require('fs')

const rank = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const hands = {FIVE:70, FOUR:60, HOUSE:50, THREE:40, TWO_PAIR:30, PAIR:20, HIGH:10}

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let games = parseGames(lines)

    let sortedGames = games.sort((a,b) => sortGame(a, b))
    
    sortedGames.map((game, index) => console.log([game[0], getKey(calcHand(game)), (index+1), game[2], game[2] * (index+1)]))
    let points = sortedGames.map((game, index) => (game[2] * (index+1))).reduce((a,b) => a+b)

    return points
}

function getSolutionPart2(lines) {
    return 0
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

    return "Not Found..."
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
            //console.log('Compare ' + a[0][cardIndex] +'('+rank.indexOf(a[0][cardIndex])+ ') with ' + b[0][cardIndex] +'('+rank.indexOf(b[0][cardIndex])+ ')')
            if (rank.indexOf(a[0][cardIndex]) > rank.indexOf(b[0][cardIndex]))
                return 1
            else if (rank.indexOf(a[0][cardIndex]) < rank.indexOf(b[0][cardIndex]))
                return -1
        }
    }
    
    console.log("Same..." + a[0] + ' == ' + b[0])
    return 0
}

function parseGames(lines) {
    //32T3K 765
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

function getRankMap(hand) {
    var map = new Map(rank.map(r => [r, 0]))

    for (card of hand) {
        let value = map.get(card)
        map.set(card, (value+1))
    }

    return map
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}