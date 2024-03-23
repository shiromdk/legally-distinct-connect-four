import Board from '../src/feature/engine/board'

describe('Board Tests', function(){
    let board = new Board()
    it('initializes new solver', async()=>{
     expect(board.getCurrentPlayer()).toBe(1)
    })
    it('checking filling out 1 column', ()=>{
        expect(board.play(1)).toBe(true)
        expect(board.getState()[0][1]).toBe(1)
        expect(board.play(1)).toBe(true)
        expect(board.getState()[1][1]).toBe(2)
        expect(board.play(1)).toBe(true)
        expect(board.play(1)).toBe(true)
        expect(board.play(1)).toBe(true)
        expect(board.play(1)).toBe(true)
        expect(board.play(1)).toBe(false)
    })
    it('checking valid location', ()=>{
        expect(board.isValidLocation(0)).toBe(true)
        expect(board.isValidLocation(1)).toBe(false)
    })
    it('checking next available row', ()=>{
        expect(board.getNextAvailableRow(0)).toBe(0)
        board.play(0)
        expect(board.getNextAvailableRow(0)).toBe(1)
    })
    it('checking horizontal win', ()=> {
        board = new Board()
        board.play(0)
        board.play(0)
        board.play(1)
        board.play(0)
        expect(board.winningMoveHorizontal(1)).toBe(false)
        board.play(2)
        board.play(0)
        board.play(3)
        expect(board.winningMoveHorizontal(1)).toBe(true)
    })
    it('checking vertical win', ()=> {
        board = new Board()
        board.play(0)
        board.play(1)
        board.play(0)
        board.play(1)
        expect(board.winningMoveVertical(1)).toBe(false)
        board.play(0)
        board.play(1)
        board.play(0)
        expect(board.winningMoveVertical(1)).toBe(true)
    })
    it('checking positive win', ()=> {
        board = new Board()
        board.play(0) //1
        board.play(1)

        board.play(1) //1
        board.play(2)

        board.play(2)
        board.play(3)

        board.play(2)
        board.play(3)

        board.play(3)
        board.play(5)

        board.play(3)
        expect(board.winningMoveDiagonalPositive(1)).toBe(true)
        expect(board.winningMoveDiagonalPositive(2)).toBe(false)
    })
    it('checking negative win', ()=> {
        board = new Board()
        board.play(3) //1
        board.play(2)

        board.play(2) //1
        board.play(1)

        board.play(1)
        board.play(0)

        board.play(1)
        board.play(0)

        board.play(0)
        board.play(5)

        board.play(0)
        board.printBoard()
        expect(board.winningMoveDiagonalPositive(1)).toBe(false)
        expect(board.winningMoveDiagonalNegative(1)).toBe(true)
    })
    
})