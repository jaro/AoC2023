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
    let map = parseMap(lines)

    let path1 = new Array()
    let path2 = new Array()

    let start = getStart(map)
    path1.push(start)
    path2.push(start)

    let directions = nextSteps(start[0], start[1], map)

    var position1 = directions[0]
    var position2 = directions[1]
    path1.push(position1)
    path2.push(position2)

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
                path1.push(next1[0])
                position1 = next1[0]
            }
        }
        if (!done2) {
            let allNext2 = nextSteps(position2[0], position2[1], map)
            next2 = allNext2.filter(p => (p[0] != prev2[0] || p[1] != prev2[1]))
            prev2 = position2

            if (next2.length > 0) {
                steps2++
                path2.push(next2[0])
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

    path2.pop()
    while(path2.length > 0) {
        path1.push(path2.pop())
    }

    let eMap = expandMap(map)
    let ePath = expandPath(path1)

    let markedMap = markPathInMap(eMap, ePath)
    let convertedMarkedMap = markNotLoopPositions(markedMap)

    console.log(convertedMarkedMap.map(row => row.join()))

    // Use the --stack-size=10000 for node to avoid getting exceed stack size error
    return findInnerIslands(convertedMarkedMap)
}

function findInnerIslands(map) {
    var unvisited = map.map((row, rIndex) => row.map((col, cIndex) => [cIndex, rIndex, col]).
    filter(v => v[2] == '.')).flat()
    var islands = new Array()

    while (unvisited.length > 0) {
        let start = unvisited[0]
        var island = new Array()
        island.push([start[0],start[1]])
        traverseNode(start, island, map)
        
        var newUnvisited = new Array()

        for (uNode of unvisited) {
            let contains = island.filter(n => (n[0] == uNode[0] && n[1] == uNode[1]))
            if (contains.length == 0){
                newUnvisited.push(uNode)
            }
        }
        unvisited = newUnvisited

        islands.push(island)
    }

    var edge = function(n) {
        return (n[0] == 0 || 
            n[1] == 0 || 
            n[0] == (map[0].length-1) || 
            n[1] == (map.length-1))
    }

    let innerIslands = islands.filter(island => (island.filter(n => edge(n)).length == 0 )) 

    let compactIslands = innerIslands.flat().filter(n => (n[0]%2 != 1 && n[1]%2 != 1))
    return (compactIslands.length)
}

function traverseNode(node, visited, map) {
    var adjecentNodes = new Array()
    for (adjNode of findAdjecents(map, node[0], node[1])) { 
        if (visited.filter(n => (n[0]==adjNode[0] && n[1]==adjNode[1])).length == 0) {
            adjecentNodes.push(adjNode)
        }
    }

    adjecentNodes.map(n => visited.push(n))

    for (adjNode of adjecentNodes) {
        traverseNode(adjNode, visited, map)
    }
}

function findAdjecents(map, x, y) {
    var adjecents = new Array()

    if (x>0) {
        let node = map[y][x-1]
        if (node == '.')
            adjecents.push([x-1, y])
    }
    if (x<(map[0].length-1)) {
        let node = map[y][parseInt(x)+1]
        if (node == '.')
            adjecents.push([parseInt(x)+1, y])
    }
    if (y>0) {
        let node = map[y-1][x]
        if (node == '.')
            adjecents.push([x, y-1])
    }
    if (y<(map.length-1)) {
        let node = map[parseInt(y)+1][x]
        if (node == '.')
            adjecents.push([x, parseInt(y)+1])
    }

    return adjecents
}

function markNotLoopPositions(map) {
    var newMap = Array()

    for (row of map) {
        var innerMap = new Array()
        for (col of row) {
            if (col == 'X')
                innerMap.push(col)
            else
                innerMap.push('.')
        }
        newMap.push(innerMap)
    }

    return newMap
}

function markPathInMap(map, path) {
    for (var i=0;i<path.length;i++) {
        let p1 = path[i]
        let p2 = (i+1) == path.length ? path[0] : path[i+1]

        if (p1[0] == p2[0]) { //Same x value
            for (var y=Math.min(p1[1], p2[1]);y<=Math.max(p1[1], p2[1]);y++) {
                map[y][p1[0]] = 'X'
            }
        }
        if (p1[1] == p2[1]) { //Same y value
            for (var x=Math.min(p1[0], p2[0]);x<=Math.max(p1[0], p2[0]);x++) {
                map[p1[1]][x] = 'X'
            }
        }
    }

    return map
}

function expandPath(path) {
    return path.map(point => point.map(cord => cord*2))
}

function expandMap(map) {
    var expandedMap = new Array()

    for(row in map) {
        var expandedRow = new Array()

        for(col in map[row]) {
            expandedRow.push(map[row][col])
            if (col < (map[row].length-1))
                expandedRow.push('.')
        }

        var emptyRow = new Array(expandedRow.length)
        emptyRow.fill('.', 0)
        expandedMap.push(expandedRow)
        if (row < (map.length-1))
            expandedMap.push(emptyRow)
    }

    return expandedMap
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