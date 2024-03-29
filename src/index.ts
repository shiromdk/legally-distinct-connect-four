import { createBoard, type Board } from './feature/engine/board'
import minimax from './feature/engine/minimax'
import { pickBestMove } from './feature/engine/scoring'

const board: Board = [
  [1, 2, 2, 2, 1, 2, 0],
  [0, 1, 1, 1, 2, 2, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]

console.log(minimax(board, 5, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true, 1))

// console.log(minimax(board, 10, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, false, 1))
