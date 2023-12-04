const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    var matrix = createMatrix(lines)

    console.log(matrix)
    
    return 0
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
    return 0
}


const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}