const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['Time:      7  15   30',
                'Distance:  9  40  200']

let testData2 = ['Time:      71530',
                'Distance:  940200']

test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(288)
})

test('part2', ()=>{
    expect(getSolutionPart1(testData2)).toBe(71503)
})
