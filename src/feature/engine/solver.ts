import Position from "./position"

class Solver{
    private nodeCount;
    constructor(){
        this.nodeCount = 0
    }

    negamax = (position: Position): number => {
        this.nodeCount++;
        if(position.getNumberOfMoves() == Position.HEIGHT*Position.WIDTH){
            return 0;
        }

        for(let i = 0; i < Position.WIDTH; i++){
            if(position.canPlay(i) && position.isWinningMove(i)){
                return (Position.WIDTH*Position.HEIGHT+1-position.getNumberOfMoves())/2;
            }
        }

        let bestScore:number = -Position.WIDTH*Position.HEIGHT
        for(let i = 0; i<Position.WIDTH;i++){
            if(position.canPlay(i)){
               let p2 = new Position(position)
               p2.play(i)
               let score: number = -this.negamax(p2)
               if(score > bestScore) {
                bestScore = score
               }
            }
        }
        return bestScore

    }
}

export default Solver