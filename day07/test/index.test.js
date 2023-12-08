const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['32T3K 765',
                'T55J5 684',
                'KK677 28',
                'KTJJT 220',
                'QQQJA 483']

                let testData2 = ['JK7T3 1',
                '76A24 2',
                '5QT64 3',
                '48QA6 4',
                '48JKT 5']
test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(6440)
})

test('part2', ()=>{
    expect(getSolutionPart1(testData2)).toBe(71503)
})
