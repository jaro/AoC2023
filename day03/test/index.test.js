const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['467..114..',
                '...*......',
                '..35..633.',
                '......#...',
                '617*......', 
                '.....+.58.', 
                '..592.....',
                '......755.',
                '...$.*....',
                '.664.598..']




test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(4361)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData)).toBe(2286)
})
