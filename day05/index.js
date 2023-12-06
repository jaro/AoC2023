const fs = require('fs')

function inputDataLinesStrings(filename="input.txt") {
    return fs.readFileSync(filename).toString().trim().split("\n")
}

function getSolutionPart1(lines) {
    let seeds = parseSeeds(lines[0])
    let seed2Soil = parseMap(lines, "seed-to-soil map:")
    let soil2Fertilizer = parseMap(lines, "soil-to-fertilizer map:")
    let fertilizer2Water = parseMap(lines, "fertilizer-to-water map:")
    let water2Light = parseMap(lines, "water-to-light map:")
    let light2Temperature = parseMap(lines, "light-to-temperature map:")
    let temperature2Humidity = parseMap(lines, "temperature-to-humidity map:")
    let humidity2Location = parseMap(lines, "humidity-to-location map:")
    
    let mappings = [seed2Soil, soil2Fertilizer, fertilizer2Water, water2Light, light2Temperature, temperature2Humidity, humidity2Location]

    let result = seeds.map(seed => applyMappings(mappings, seed))

    return result.reduce((a,b) => Math.min(a,b))
}

function getSolutionPart2(lines) {
    let seedRanges = parseSeeds(lines[0])

    let seed2Soil = parseMap(lines, "seed-to-soil map:")
    let soil2Fertilizer = parseMap(lines, "soil-to-fertilizer map:")
    let fertilizer2Water = parseMap(lines, "fertilizer-to-water map:")
    let water2Light = parseMap(lines, "water-to-light map:")
    let light2Temperature = parseMap(lines, "light-to-temperature map:")
    let temperature2Humidity = parseMap(lines, "temperature-to-humidity map:")
    let humidity2Location = parseMap(lines, "humidity-to-location map:")
    
    let mappings = [seed2Soil, soil2Fertilizer, fertilizer2Water, water2Light, light2Temperature, temperature2Humidity, humidity2Location]

    var seeds = new Array()
    var minLocations = new Array()
    
    for (i=0;i<seedRanges.length;i+=2) {
        for (let index=0;index<seedRanges[i+1];index++) {
            seeds.push(seedRanges[i]+index)
            if (seeds.length > 1000000) {
                let result = seeds.map(seed => applyMappings(mappings, seed))
                let minLocation = result.reduce((a,b) => Math.min(a,b))
                //console.log(minLocation)
                minLocations.push(minLocation)
                seeds = new Array()
            }
        }
        let result = seeds.map(seed => applyMappings(mappings, seed))
        let minLocation = result.reduce((a,b) => Math.min(a,b))
        //console.log(minLocation)
        minLocations.push(minLocation)
        seeds = new Array()
        console.log('Finished seed range' + (i+1))
    }

    return minLocations.reduce((a,b) => Math.min(a,b))
}

function applyMappings(mappings, seed) {
    var value = seed
    for (map of mappings) {
        value = useMap(map, value)
    }

    return value
}

function useMap(mappings, value) {
    for (mapping of mappings) {
        let min = mapping[1]
        let max = min + mapping[2]
        if (value >= min && value < max) {
            return mapping[0] + Math.abs(value-min)
        }
    }

    return value
}

function parseSeeds(line) {
    return line.split(": ")[1].split(" ").map(seed => parseInt(seed))
}

function parseSeedRange(line) {
    var seeds = new Array()
    let ranges = line.split(": ")[1].split(" ").map(seed => parseInt(seed))

    //for (i=0;i<ranges.length;i+=2) {
    for (i=0;i<2;i+=2) {
        for (let index=0;index<ranges[i+1];index++) {
            seeds.push(ranges[i]+index)
        }
    }
    //console.log('Seed range: ' + seeds)
    return seeds
}

function parseMap(lines, name) {
    var map = new Array()
    var parse = false
    for (line of lines) {
        if (line === name) {
            parse = true
            continue
        } else if (parse && line.length == 0) {
            return map
        } else if (parse) {
            map.push(line.split(" ").map(value => parseInt(value)))
        }
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