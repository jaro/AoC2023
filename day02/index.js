const fs = require('fs')

function inputDataLinesIntegers(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n").map((x)=>parseInt(x))
}

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let gamesStr = lines.map((str) => str.split(': ')).map((x) => x[1])
    let games = gamesStr.map((game) => parseGame(game))

    var sum = 0
    for (var i=0;i<games.length;i++) {
        if (games[i].isValid()) {
            console.log('Game ' + i + ' is valid')
            sum += (i+1)
        }
    }
    
    return sum
}

function getSolutionPart2(lines) {
    let gamesStr = lines.map((str) => str.split(': ')).map((x) => x[1])
    let games = gamesStr.map((game) => parseGame(game))

    var sum = 0
    for (var i=0;i<games.length;i++) {
        sum += games[i].power()
    }
    
    return sum
}

function parseGame(game) {
    let turns = game.split(";")
    var rounds = []
    
    for (let turn in turns) {
        var blue=0, red=0, green=0
        let colors = turns[turn].trim().split(",")
        for (let index in colors) {
            if (colors[index].includes("red")) {
                red = parseInt(colors[index].trim().split(" ")[0])
            }
            if (colors[index].includes("green")) {
                green = parseInt(colors[index].trim().split(" ")[0])
            }
            if (colors[index].includes("blue")) {
                blue = parseInt(colors[index].trim().split(" ")[0])
            }
        }
        rounds.push(new Turn(red, green, blue))
    }

    return new Game(rounds)
}

class Game {
    constructor(rounds) {
        this.rounds = rounds
    }

    isValid() {
        for (let round in this.rounds) {
            let play = this.rounds[round]
            
            if (!play.isValid()) {
                return false
            }
        }

        return true
    }

    power() {
        var minRed=0
        var minGreen=0
        var minBlue=0

        for (let round in this.rounds) {
            let play = this.rounds[round]
            minRed = Math.max(minRed, play.red)
            minGreen = Math.max(minGreen, play.green)
            minBlue = Math.max(minBlue, play.blue)
        }

        return minRed*minGreen*minBlue
    }
}

class Turn {
    static maxRed = 12
    static maxGreen = 13
    static maxBlue = 14

    constructor(red, green, blue) {
      this.red = red
      this.green = green
      this.blue = blue
    }

    isValid() {
        return this.red <= Turn.maxRed && this.green <= Turn.maxGreen && this.blue <= Turn.maxBlue
    }
  }

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}