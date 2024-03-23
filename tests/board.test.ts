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
})