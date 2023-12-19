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

let testData3 = ['.F----7F7F7F7F-7....',
                '.|F--7||||||||FJ....',
                '.||.FJ||||||||L7....',
                'FJL7L7LJLJ||LJ.L-7..',
                'L--J.L7...LJS7F-7L7.',
                '....F-J..F7FJ|L7L7L7',
                '....L7.F7||L7|.L7L7|',
                '.....|FJLJ|FJ|F7|.LJ',
                '....FJL-7.||.||||...',
                '....L---J.LJ.LJLJ...']

let testData4 = ['FF7FSF7F7F7F7F7F---7',
                'L|LJ||||||||||||F--J',
                'FL-7LJLJ||||||LJL-77',
                'F--JF--7||LJLJ7F7FJ-',
                'L---JF-JLJ.||-FJLJJ7',
                '|F|F-JF---7F7-L7L|7|',
                '|FFJF7L7F-JF7|JL---7',
                '7-L-JL7||F7|L7F-7F7|',
                'L.L7LFJ|||||FJL7||LJ',
                'L7JLJL-JLJLJL--JLJ.L']

test('part1 - data 1', ()=>{
    expect(getSolutionPart1(testData)).toBe(4)
})

test('part1 - data 2', ()=>{
    expect(getSolutionPart1(testData2)).toBe(8)
})

test('part2 - data 1', ()=>{
    expect(getSolutionPart2(testData3)).toBe(8)
})

test('part2 - data 2', ()=>{
    expect(getSolutionPart2(testData4)).toBe(10)
})
