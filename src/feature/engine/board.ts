class Board {
  static WIDTH: number = 7
  static HEIGHT: number = 6

  private readonly board: number[][]
  private moves: number

  constructor () {
    this.board = Array(Board.HEIGHT)
      .fill(null)
      .map(() => Array(Board.WIDTH).fill(0))
    this.moves = 0
  }

  isValidLocation = (column: number): boolean => {
    return this.board[Board.HEIGHT - 1][column] === 0
  }

  getCurrentPlayer = (): number => {
    return 1 + (this.moves % 2)
  }

  getNextAvailableRow = (column: number): number => {
    for (let i = 0; i < Board.HEIGHT; i++) {
      if (this.board[i][column] === 0) {
        return i
      }
    }
    return -1
  }

  getState = (): number[][] => {
    return this.board
  }

  play = (column: number): boolean => {
    if (this.isValidLocation(column)) {
      const row = this.getNextAvailableRow(column)
      this.board[row][column] = this.getCurrentPlayer()
      this.moves++
      return true
    }
    return false
  }

  printBoard = (): void => {
    let boardString = ''
    for (let i = Board.HEIGHT - 1; i >= 0; i--) {
      boardString = boardString + this.board[i].join('') + '\n'
    }
    console.log(boardString)
  }

  hasWon = (player: number): boolean => {
    return this.winningMoveHorizontal(player) || this.winningMoveVertical(player) || this.winningMoveDiagonalNegative(player) || this.winningMoveDiagonalPositive(player)
  }

  winningMoveHorizontal = (player: number): boolean => {
    for (let column = 0; column < Board.WIDTH - 3; column++) {
      for (let row = 0; row < Board.HEIGHT; row++) {
        if (
          this.board[row][column] === player &&
          this.board[row][column + 1] === player &&
          this.board[row][column + 2] === player &&
          this.board[row][column + 3] === player
        ) {
          return true
        }
      }
    }
    return false
  }

  winningMoveVertical = (player: number): boolean => {
    for (let column = 0; column < Board.WIDTH; column++) {
      for (let row = 0; row < Board.HEIGHT - 3; row++) {
        if (
          this.board[row][column] === player &&
          this.board[row + 1][column] === player &&
          this.board[row + 2][column] === player &&
          this.board[row + 3][column] === player
        ) {
          return true
        }
      }
    }
    return false
  }

  winningMoveDiagonalPositive = (player: number): boolean => {
    for (let column = 0; column < Board.WIDTH - 3; column++) {
      for (let row = 0; row < Board.HEIGHT - 3; row++) {
        if (
          this.board[row][column] === player &&
          this.board[row + 1][column + 1] === player &&
          this.board[row + 2][column + 2] === player &&
          this.board[row + 3][column + 3] === player
        ) {
          return true
        }
      }
    }
    return false
  }

  winningMoveDiagonalNegative = (player: number): boolean => {
    for (let column = 0; column < Board.WIDTH - 3; column++) {
      for (let row = 3; row < Board.HEIGHT; row++) {
        if (
          this.board[row][column] === player &&
          this.board[row - 1][column + 1] === player &&
          this.board[row - 2][column + 2] === player &&
          this.board[row - 3][column + 3] === player
        ) {
          return true
        }
      }
    }
    return false
  }

  scorePosition = (player: number): number => {

    return 0
  }
}

export default Board
