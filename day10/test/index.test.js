const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['.....',
                '.S-7.',
                '.|.|.',
                '.L-J.',
                '.....']

let testData2 = ['..F7.',
                 '.FJ|.',
                 'SJ.L7',
                 '|F--J',
                 'LJ...']

test('part1 - data 1', ()=>{
    expect(getSolutionPart1(testData)).toBe(4)
})

test('part1 - data 2', ()=>{
    expect(getSolutionPart1(testData2)).toBe(8)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData)).toBe(2)
})
