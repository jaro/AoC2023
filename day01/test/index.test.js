const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
let testData2 = ['two1nine', 'eightwothree', 'abcone2threexyz', 'xtwone3four', '4nineeightseven2', 'zoneight234', '7pqrstsixteen']

test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(142)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData2)).toBe(281)
})
