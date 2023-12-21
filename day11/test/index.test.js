const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['...#......',
                '.......#..',
                '#.........',
                '..........',
                '......#...',
                '.#........',
                '.........#',
                '..........',
                '.......#..',
                '#...#.....']

test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(374)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData)).toBe(2)
})
