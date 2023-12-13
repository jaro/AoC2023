const fs = require('fs')

// | -> Up/Down
// - -> Left/Right
// L -> Down + Right OR Left + Up
// J -> Right + Up OR Down + Left
// 7 -> Right + Down OR Up + Left
// F -> Up + Right OR Left + Down
// . -> Ground
// S -> Start

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let map = parseMap(lines)

    let start = getStart(map)
    let directions = nextSteps(start[0], start[1], map)

    var position1 = directions[0]
    var position2 = directions[1]
    var prev1 = position1
    var prev2 = position2
    var steps1 = 1
    var steps2 = 1
    var done1 = false
    var done2 = false
    
    while (!done1 || !done2) {
        if (!done1) {
            let allNext1 = nextSteps(position1[0], position1[1], map)
            next1 = allNext1.filter(p => (p[0] != prev1[0] || p[1] != prev1[1]))
            prev1 = position1

            if (next1.length > 0) {
                steps1++
                position1 = next1[0]
            }
        }
        if (!done2) {
            let allNext2 = nextSteps(position2[0], position2[1], map)
            next2 = allNext2.filter(p => (p[0] != prev2[0] || p[1] != prev2[1]))
            prev2 = position2

            if (next2.length > 0) {
                steps2++
                position2 = next2[0]
            }
        }
        
        if (next1.length == 0 || (position1[0] == prev2[0] && position1[1] == prev2[1])) {
            done1 = true
        }
        if (next2.length == 0 || (position2[0] == prev1[0] && position2[1] == prev1[1])) {
            done2 = true
        }
        if ((position1[0] == position2[0]) && position1[1] == position2[1]) {
            done1 = true
            done2 = true
        }
    }

    return Math.max(steps1, steps2)
}

function getSolutionPart2(lines) {

    return 0
}

function getStart(map) {
    var start 
    
    for (row in map) {
        for (col in map[row]) {
            if (map[row][col] == 'S') {
                start = [parseInt(col), parseInt(row)]
            }
        }
    }

    return start
}

function nextSteps(x, y, map) {
    var next = new Array()

    switch(map[y][x]) {
        case '|':
            // Valid down: LJ|
            // Valid up: 7F|
            if ((map.length > (y+1)) && "LJ|".includes(map[y+1][x])) { //Down
                next.push([x, y+1])
            }
            if ((y-1 >= 0) && "7F|".includes(map[y-1][x])) { //Up
                next.push([x, y-1])
            }
            break;
        case 'L':
            // Valid right: -J7
            // Valid up: 7F|
            if ((map[y].length > (x+1)) && "-J7".includes(map[y][x+1])) { //Right
                next.push([x+1, y])
            }
            if ((y-1 >= 0) && "7F|".includes(map[y-1][x])) { //Up
                next.push([x, y-1])
            }
            break;
        case 'J':
            // Valid left: -LF
            // Valid up: 7F|
            if ((x-1 >= 0) && "-LF".includes(map[y][x-1])) { //Left
                next.push([x-1, y])
            }
            if ((y-1 >= 0) && "7F|".includes(map[y-1][x])) { //Up
                next.push([x, y-1])
            }
            break;
        case 'F':
            // Valid right: -J7
            // Valid down: LJ|
            if ((map[y].length > (x+1)) && "-J7".includes(map[y][x+1])) { //Right
                next.push([x+1, y])
            }
            if ((map.length > (y+1)) && "LJ|".includes(map[y+1][x])) { //Down
                next.push([x, y+1])
            }
            break;
        case '7':
            // Valid left: -LF
            // Valid down: LJ|
            if ((x-1 >= 0) && "-LF".includes(map[y][x-1])) { //Left
                next.push([x-1, y])
            }
            if ((map.length > (y+1)) && "LJ|".includes(map[y+1][x])) { //Down
                next.push([x, y+1])
            }
            break;
        case '-':
            // Valid left: -LF
            // Valid right: -J7
            if ((x-1 >= 0) && "-LF".includes(map[y][x-1])) { //Left
                next.push([x-1, y])
            }
            if ((map[y].length > (x+1)) && "-J7".includes(map[y][x+1])) { //Right
                next.push([x+1, y])
            }
            break;
        case 'S':
            // Valid left: -LF
            // Valid right: -J7
            // Valid down: LJ|
            // Valid up: 7F|
            if ((x-1 >= 0) && "-LF".includes(map[y][x-1])) { //Left
                next.push([x-1, y])
            }
            if ((map[y].length > (x+1)) && "-J7".includes(map[y][x+1])) { //Right
                next.push([x+1, y])
            }
            if ((map.length > (y+1)) && "LJ|".includes(map[y+1][x])) { //Down
                next.push([x, y+1])
            }
            if ((y-1 >= 0) && "7F|".includes(map[y-1][x])) { //Up
                next.push([x, y-1])
            }
            break;
    }

    return next
}

function parseMap(lines) {
    var map = new Array()

    for (row of lines) {
        var rowMap = new Array()
        
        for (column of row) {
            rowMap.push(column)
        }
        map.push(rowMap)
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