const fs = require('fs')

function inputDataLinesIntegers(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n").map((x)=>parseInt(x))
}

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    console.log("Runing part 1")
    return lines.map((str) => str.match(/\d/g)).map((x) => parseInt(x[0]+x[x.length-1])).reduce((x,y)=>x+y)
}

function getSolutionPart2(lines) {
    let first = lines.map((str) => firstDigit(str))
    let last = lines.map((str) => lastDigit(str))
    
    var sum = 0
    for (var i=0;i<lines.length;i++) {
        let num = parseInt(first[i]+last[i])
        sum += num
    }

    return sum
}

function firstDigit(str) {
    var map = { 1: "1", 2: "2", 3: "3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9"}

    let indexs = Object.keys(map).map((key) => [key, str.indexOf(key)])
    var min = Number.MAX_SAFE_INTEGER
    var key = map[1]
    for (var i=0;i<indexs.length;i++) {
        if (indexs[i][1] != -1 && indexs[i][1]<min) {
            min = indexs[i][1]
            key = indexs[i][0]
        }
    }

    return map[key]
}

function lastDigit(str) {
    var map = { 1: "1", 2: "2", 3: "3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9"}

    let indexs = Object.keys(map).map((key) => [key, str.lastIndexOf(key)])
    var max = -1
    var key = map[1]
    for (var i=0;i<indexs.length;i++) {
        if (indexs[i][1] != -1 && indexs[i][1]>max) {
            max = indexs[i][1]
            key = indexs[i][0]
        }
    }

    return map[key]
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}