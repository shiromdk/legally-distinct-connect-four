const ROW_COUNT: number = 6
const COLUMN_COUNT: number = 7

export type Board = number[][]

export const createBoard = (): Board => {
  return new Array(ROW_COUNT)
    .fill(null)
    .map(() => Array(COLUMN_COUNT).fill(0))
}

export const playPiece = (board: Board, row: number, column: number, player: number): Board => {
  board[row][column] = player
  return board
}

export const isValidLocation = (board: Board, column: number): boolean => {
  return board[ROW_COUNT - 1][column] === 0
}

export const getAllValidLocations = (board: Board): number[] => {
  const validLocations: number[] = []
  for (let i = 0; i < COLUMN_COUNT; i++) {
    if (isValidLocation(board, i)) {
      validLocations.push(i)
    }
  }
  return validLocations
}

export const getNextOpenRow = (board: Board, column: number): number => {
  for (let row = 0; row < ROW_COUNT; row++) {
    if (board[row][column] === 0) {
      return row
    }
  }
  return -1
}

export const isTerminalNode = (board: Board, player: number): boolean => {
  const opponent = player === 1 ? 2 : 1
  return hasWon(board, player) || hasWon(board, opponent) || getAllValidLocations(board).length === 0
}

export const hasWon = (board: Board, player: number): boolean => {
  return winningMoveHorizontal(board, player) || winningMoveVertical(board, player) || winningMoveDiagonalNegative(board, player) || winningMoveDiagonalPositive(board, player)
}

export const winningMoveHorizontal = (board: Board, player: number): boolean => {
  for (let column = 0; column < COLUMN_COUNT - 3; column++) {
    for (let row = 0; row < ROW_COUNT; row++) {
      if (
        board[row][column] === player &&
          board[row][column + 1] === player &&
          board[row][column + 2] === player &&
          board[row][column + 3] === player
      ) {
        return true
      }
    }
  }
  return false
}

export const winningMoveVertical = (board: Board, player: number): boolean => {
  for (let column = 0; column < COLUMN_COUNT; column++) {
    for (let row = 0; row < ROW_COUNT - 3; row++) {
      if (
        board[row][column] === player &&
          board[row + 1][column] === player &&
          board[row + 2][column] === player &&
          board[row + 3][column] === player
      ) {
        return true
      }
    }
  }
  return false
}

export const winningMoveDiagonalPositive = (board: Board, player: number): boolean => {
  for (let column = 0; column < COLUMN_COUNT - 3; column++) {
    for (let row = 0; row < ROW_COUNT - 3; row++) {
      if (
        board[row][column] === player &&
          board[row + 1][column + 1] === player &&
          board[row + 2][column + 2] === player &&
          board[row + 3][column + 3] === player
      ) {
        return true
      }
    }
  }
  return false
}

export const winningMoveDiagonalNegative = (board: Board, player: number): boolean => {
  for (let column = 0; column < COLUMN_COUNT - 3; column++) {
    for (let row = 3; row < ROW_COUNT; row++) {
      if (
        board[row][column] === player &&
          board[row - 1][column + 1] === player &&
          board[row - 2][column + 2] === player &&
          board[row - 3][column + 3] === player
      ) {
        return true
      }
    }
  }
  return false
}
