const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['32T3K 765',
                'T55J5 684',
                'KK677 28',
                'KTJJT 220',
                'QQQJA 483']

test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(6440)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData)).toBe(5905)
})
