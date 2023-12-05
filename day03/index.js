const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    var matrix = createMatrix(lines)
    var sum = 0

    const r = new RegExp("\\d+", "g");
    for (row in lines) {
        let results = lines[row].matchAll(r)
        for (result of results) {
            if (isSymbolAdjecent(matrix, row, result.index, result[0].length)) {
                sum += parseInt(result[0])
            }
          }
    }

    return sum
}

function isSymbolAdjecent(matrix, row, col, size) {
    const notSymbol ='0123456789.'
    let startX = Math.max(0, col-1)
    let stopX = Math.min(matrix[0].length-1, col+size)
    let startY = Math.max(0, row-1)
    let stopY = Math.min(matrix.length-1, parseInt(row)+1)
    
    for (var x=startX;x<=stopX;x++) {
        for (var y=startY;y<=stopY;y++) {
            if (!notSymbol.includes(matrix[y][x]))
                return true
        }
    }
        
    return false
}

function isStarAdjecent(matrix, row, col, size) {
    let startX = Math.max(0, col-1)
    let stopX = Math.min(matrix[0].length-1, col+size)
    let startY = Math.max(0, row-1)
    let stopY = Math.min(matrix.length-1, parseInt(row)+1)
    
    for (var x=startX;x<=stopX;x++) {
        for (var y=startY;y<=stopY;y++) {
            if ("*" === matrix[y][x])
                return y + '-' + x
        }
    }
        
    return ""
}

function createMatrix(lines) {
    var matrix = new Array(lines.length)
    for (var row=0;row<lines.length;row++) {
        matrix[row] = new Array(lines[row].length)
        for (var col=0;col<lines[row].length;col++) {
            matrix[row][col] = lines[row].charAt(col)
        }
    }

    console.log('Created matrix ' + matrix.length + ' x ' + matrix[0].length)
    
    return matrix
}

function getSolutionPart2(lines) {
    var matrix = createMatrix(lines)
    var gearRatios = new Map();
    var ratio = 0
    
    const r = new RegExp("\\d+", "g");
    for (row in lines) {
        let results = lines[row].matchAll(r)
        for (result of results) {
            let starPosition = isStarAdjecent(matrix, row, result.index, result[0].length)
            if (starPosition !== "") {
                if (!gearRatios.has(starPosition)) {
                    gearRatios.set(starPosition, [result[0]])
                } else {
                    let value = gearRatios.get(starPosition)
                    value.push(result[0])
                    gearRatios.set(starPosition, value)
                }
            }
        }
    }

    for (sizes of gearRatios.values()) {
        if (sizes.length == 2) {
            ratio += (sizes[0]*sizes[1])
        }
    }

    return ratio
}


const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}