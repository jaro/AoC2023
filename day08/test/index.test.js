const {getSolutionPart1, getSolutionPart2} = require('../index')

let testData = ['LLR',
                '',
                'AAA = (BBB, BBB)',
                'BBB = (AAA, ZZZ)',
                'ZZZ = (ZZZ, ZZZ)']

let testData2 = ['LR',
    '',
    '11A = (11B, XXX)',
    '11B = (XXX, 11Z)',
    '11Z = (11B, XXX)',
    '22A = (22B, XXX)',
    '22B = (22C, 22C)',
    '22C = (22Z, 22Z)',
    '22Z = (22B, 22B)',
    'XXX = (XXX, XXX)']

test('part1', ()=>{
    expect(getSolutionPart1(testData)).toBe(6)
})

test('part2', ()=>{
    expect(getSolutionPart2(testData2)).toBe(6)
})
