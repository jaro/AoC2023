const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let space = parseSpace(lines)
    let expandedSpace = expandSpace(space)
    let cords = getCordinates(expandedSpace)

    return calcDistans(cords)
}

function getSolutionPart2(lines) {
    let space = parseSpace(lines)
    let cords = getCordinates(space)
    let empty = getEmptyRowsAndCols(space)
    console.log(empty)

    return calcDistans(cords)
}

function getEmptyRowsAndCols(space) {
    let emptyRows = new Array()
    let emptyCols = new Array()

    for (line in space) {
        if (!space[line].join('').includes('#')) {
            emptyRows.push(line)
        }
    }
    for (col in space[0]) {
        if ((space.map(row => row[col]).filter(c => c == '#')).length == 0) {
            emptyCols.push(col)
        }
    }

    return [emptyRows, emptyCols]
}

function calcDistans(cords) {
    var distance = 0

    for (var i=0;i<cords.length;i++) {
        for (var j=0;j<cords.length;j++) {
            if (i != j) {
                let dist = Math.abs(cords[i][0]-cords[j][0]) + Math.abs(cords[i][1]-cords[j][1])
                distance += dist
            }
        }
    }

    return (distance/2)
}

function calcDistance(star1, star2, empty, size) {
    let minX = Math.min(star1[0], star2[0])
    let minY = Math.min(star1[1], star2[1])
    let maxX = Math.max(star1[0], star2[0])
    let maxY = Math.max(star1[1], star2[1])

    let emptyBetweenX = empty[0].filter(n => (n > minX && n < maxX)).length
    let emptyBetweenY = empty[1].filter(n => (n > minX && n < maxX)).length

    return (maxX-minX) + (emptyBetweenX*size) + (maxY-minY) + (emptyBetweenY*size)
}

function parseSpace(lines) {
    var map = new Array()

    for (line in lines) {
        let mapRow = new Array()
        for (row in lines[line]) {
            mapRow.push(lines[line][row])
        }
        map.push(mapRow)
    }

    return map
}

function getCordinates(space){
    var stars = new Array()

    for (line in space) {
        for (row in space[line]) {
            if (space[line][row] === '#') {
                stars.push([row, line])
            }
        }
    }

    return stars
}

function expandSpace(space) {
    let expandSpace = new Array()
    
    for (line of space) {
        expandSpace.push([...line])
        
        if (!line.join('').includes('#')) {
            let emptyRow = new Array(space[0].length)
            emptyRow.fill('.')
            expandSpace.push(emptyRow)
        }
    }
    var numExpanded = 0
    for (col in space[0]) {
        if ((space.map(row => row[col]).filter(c => c == '#')).length == 0) {
            for (row of expandSpace) {
                row.splice((parseInt(col)+numExpanded),0,'.')
            }
            numExpanded++
        }
    }

    return expandSpace
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}