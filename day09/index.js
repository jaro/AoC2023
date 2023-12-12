const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let reports = lines.map(line => createReport(line))
    let extrapolatedReports = reports.map(report => extrapolateReport(report))
    
    let result = extrapolatedReports.map(report => report[0].pop()).reduce((a,b) => a+b)

    return result
}

function getSolutionPart2(lines) {
    let reports = lines.map(line => createReport(line))
    let extrapolatedReports = reports.map(report => extrapolateHistoricalReport(report))
    
    let result = extrapolatedReports.map(report => report[0][0]).reduce((a,b) => a+b)

    return result
}

function extrapolateReport(report) {
    report[report.length-1].push(0)

    for (var i=(report.length-1);i>0;i--) {
        let diff = report[i][report[i].length-1]
        let extpValue = (report[i-1][report[i-1].length-1] + diff)
        report[i-1].push(extpValue)
    }

    return report
}

function extrapolateHistoricalReport(report) {
    report[report.length-1].unshift(0)

    for (var i=(report.length-1);i>0;i--) {
        let diff = report[i][0]
        let extpValue = (report[i-1][0] - diff)
        report[i-1].unshift(extpValue)
    }

    return report
}

function createReport(line) {
    let historyMap = new Array()
    historyMap.push(line.split(' ').map(value => parseInt(value)))

    while(!historyMap[historyMap.length-1].every(value => (value == 0))) {
        historyMap.push(createDiffArr(historyMap[historyMap.length-1]))
    }

    return historyMap
}

function createDiffArr(arr) {
    var diff = new Array()

    for(var i=0;i<(arr.length-1);i++) {
        diff.push(arr[i+1]-arr[i])
    }

    return diff
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(getSolutionPart1(inputDataLinesStrings()))
else
    console.log(getSolutionPart2(inputDataLinesStrings()))

module.exports = {
    getSolutionPart1, getSolutionPart2
}