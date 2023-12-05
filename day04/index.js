const fs = require('fs')
const { createSecureContext } = require('tls')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    var sum = 0
    let games = lines.map((line)=>line.split(": ")[1]).map((game) => game.split(" | "))

    for (game of games) {
        let winners = game[0].trim().split(" ").filter(i => i.length != 0).map(i => parseInt(i))
        let numbers = game[1].trim().split(" ").filter(i => i.length != 0).map(i => parseInt(i))
        
        let score = winners.filter(value => numbers.includes(value));
        let numbWin = score.length
        
        if (numbWin > 0) {
            sum += (2 ** (numbWin-1))
        }
    }
    
    return sum
}

function getSolutionPart2(lines) {
    let games = lines.map((line)=>line.split(": ")[1]).map((game) => game.split(" | "))
    var numCards = new Array()

    for (index in lines) {
        numCards.push(1)
    }

    for (index in games) {
        let wins = numbOfWins(games[index])
        if (wins != 0){
            let current = numCards[index]
            for (let i=1;i<=wins;i++) {
                let offset = parseInt(index) + parseInt(i)
                let cnt = numCards[offset]
                numCards[offset] = (cnt+current)
            }
        }
    }

    return numCards.reduce((a,b)=>a+b)
}

function numbOfWins(game) {
    let winners = game[0].trim().split(" ").filter(i => i.length != 0).map(i => parseInt(i))
    let numbers = game[1].trim().split(" ").filter(i => i.length != 0).map(i => parseInt(i))
    
    let score = winners.filter(value => numbers.includes(value));
    
    return score.length
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}