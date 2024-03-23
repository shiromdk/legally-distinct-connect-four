
import Solver from '../src/feature/engine/solver'

let solver = new Solver()

describe('Solver Tests', function(){
    it('initializes new solver', async()=>{
        expect(solver.getNodeCount()).toBe(0)
    })
})