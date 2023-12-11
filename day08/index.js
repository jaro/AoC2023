const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let input = parseInput(lines)

    return findPath(input)
}

function getSolutionPart2(lines) {
    let input = parseInput(lines)
    let result = findPaths(input)

    return findlcm(result)
}

function gcd(a, b) { 
    if (b == 0) 
        return a; 
    return gcd(b, a % b); 
} 
 
function findlcm(arr) { 
    let ans = arr[0]; 
  
    for (let i = 1; i < arr.length; i++) 
        ans = (((arr[i] * ans)) / (gcd(arr[i], ans))) 
 
    return ans; 
} 

function findPath(input) {
    let instructions = input[0]
    let leftMap = input[1]
    let rightMap = input[2]

    var count = 0
    var current = 'AAA'
    
    while (true) {
        for (instruction of instructions) {
            if (instruction == 'L') {
                count++
                current = leftMap.get(current)
            } else if (instruction == 'R') {
                count++
                current = rightMap.get(current)
            }

            if (current == 'ZZZ')
                return count
        }
    }
}

function findPaths(input) {
    let instructions = input[0]
    let leftMap = input[1]
    let rightMap = input[2]

    let keys = Array.from(input[1].keys())
    let paths = keys.filter(key => (key.charAt(2) == 'A'))

    var allPaths = new Array()

    for (path of paths) {
        var count = 0
        var loop = true 

        while (loop) {
            for (instruction of instructions) {
                if (instruction == 'L') {
                    count++
                    path = leftMap.get(path)
                } else if (instruction == 'R') {
                    count++
                    path = rightMap.get(path)
                }

                if (path.charAt(2) == 'Z') {
                    allPaths.push(count)
                    loop = false
                }
            }
        }    
    }

    return allPaths
}

function parseInput(lines) {
    var instructions = new Array()
    var leftPath = new Map()
    var rightPath = new Map()

    instructions = lines[0].split("")
    
    for (line of lines.slice(2)) {
        let key = line.split("=")[0].trim()
        let path = line.split("=")[1].trim()
        let values  = path.slice(1,  path.length-1)
        let left = values.split(",")[0].trim()
        let right = values.split(",")[1].trim()

        leftPath.set(key, left)
        rightPath.set(key, right)
    }

    return [instructions, leftPath, rightPath]
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}