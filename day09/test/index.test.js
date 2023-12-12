const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['0 3 6 9 12 15',
                '1 3 6 10 15 21',
                '10 13 16 21 30 45']

test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(114)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData2)).toBe(6)
})
