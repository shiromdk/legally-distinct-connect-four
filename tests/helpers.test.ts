import { copy2dArray } from '../src/feature/engine/helper'

describe('helper test' , ()=>{
    let numberArray = [[1,1,1],[1,1,1]]
    it('check count', ()=>{
        expect(copy2dArray(numberArray)).toStrictEqual([[1,1,1],[1,1,1]])
    })

})