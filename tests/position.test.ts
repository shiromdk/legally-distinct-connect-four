import Position from "../src/feature/engine/position"

describe('Position Tests', function(){
    it('initializes new position', async()=>{
        let p = new Position()
        expect(p.getNumberOfMoves()).toBe(0)
        p.playSequence("4444444")
    })
})