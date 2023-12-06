const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let races = parseRaces(lines)
    
    return calcMultiple(races)
}

function getSolutionPart2(lines) {
    let races = parseOneRace(lines)

    return calcMultiple(races)
}

function calcMultiple(races) {
    var multiply = new Array()

    for (var i=0;i<races[0].length;i++) {
        let time = races[0][i]
        let distance = races[1][i]
        var wins = 0
        for (var t=0;t<=time;t++) {
            if (calcDistance(time, t) > distance) {
                wins++
            }
        }
        multiply.push(wins)
    }
    
    return multiply.reduce((a,b) => a*b)
}

function calcDistance(time, press) {
    return (time-press)*press
}

function parseRaces(lines) {
    let times = lines[0].split("Time:")[1].trim().split(" ").filter(value=>value.length>0).map(value => parseInt(value))
    let distances = lines[1].split("Distance:")[1].trim().split(" ").filter(value=>value.length>0).map(value => parseInt(value))

    return [times, distances]
}

function parseOneRace(lines) {
    var times = parseInt(lines[0].split("Time:")[1].replaceAll(" ", ""))
    let distances = parseInt(lines[1].split("Distance:")[1].replaceAll(" ", ""))

    return [[times], [distances]]
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}