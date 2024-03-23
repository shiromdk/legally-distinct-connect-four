class Position {
  static WIDTH: number = 7
  static HEIGHT: number = 6

  private height: number[]
  private board: number[][]
  private moves: number


  constructor(position?: Position){
    if(position){
      this.height = position.height
      this.board = position.board
      this.moves = position.moves
    }else{
      this.board = []
      this.height = []
      this.moves = 0
    }
  }

  canPlay = (column: number): boolean => {
    return this.height[column] < Position.HEIGHT
  }

  play = (column: number): void => {
    this.board[column][this.height[column]] = 1+this.moves%2;
    this.height[column]++;
    this.moves++;
  }

  playSequence = (sequence: string): void => {
    for(let i = 0; i<sequence.length;i++){
      // let column = sequence.charAt(i) - '1'
    }
  }
  
  isWinningMove = (column: number): boolean => {
    let currentPlayer = (this.moves % 2) + 1
    // Checking Vertical
    if(this.height[column] >= 3 && this.board[column][this.height[column]-1] == currentPlayer  && this.board[column][this.height[column]-2] == currentPlayer  && this.board[column][this.height[column]-3] == currentPlayer){
      return true
    }

    for(let dy = -1; dy <= 1; dy++){
      let nb = 0
      for(let dx = -1; dx<=1; dx+=2){
        for(let x = column+dx, y = this.height[column]+dx*dy; x>=0 && x < Position.WIDTH && y >=0 && y < Position.HEIGHT && this.board[x][y] == currentPlayer; nb++){
          x+=dx;
          y+=dx*dy
        }
      }
      if(nb > 3){
        return true
      }
    }

    return false
  }

  getNumberOfMoves = (): number => {
    return this.moves
  }


}

export default Position