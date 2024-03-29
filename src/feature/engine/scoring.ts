import { getAllValidLocations, getNextOpenRow, playPiece } from './board'
import type { Board } from './board'
import { copy2dArray } from './helper'
const ROW_COUNT: number = 6
const COLUMN_COUNT: number = 7
const WINDOW_LENGTH: number = 4
const EMPTY = 0
const PLAYER_PIECE: number = 1
const AI_PIECE: number = 2

export function scorePosition (board: number[][], piece: number): number {
  let score: number = 0

  // Score center column
  const centerArray: number[] = board.map(row => row[Math.floor(COLUMN_COUNT / 2)])
  const centerCount: number = centerArray.filter(item => item === piece).length
  score += centerCount * 3

  // Score Horizontal
  for (let r = 0; r < ROW_COUNT; r++) {
    for (let c = 0; c <= COLUMN_COUNT - WINDOW_LENGTH; c++) {
      const window: number[] = board[r].slice(c, c + WINDOW_LENGTH)
      score += evaluateWindow(window, piece)
    }
  }

  // Score Vertical
  for (let c = 0; c < COLUMN_COUNT; c++) {
    for (let r = 0; r <= ROW_COUNT - WINDOW_LENGTH; r++) {
      const window: number[] = []
      for (let i = 0; i < WINDOW_LENGTH; i++) {
        window.push(board[r + i][c])
      }
      score += evaluateWindow(window, piece)
    }
  }

  // Score positive sloped diagonal
  for (let r = 0; r <= ROW_COUNT - WINDOW_LENGTH; r++) {
    for (let c = 0; c <= COLUMN_COUNT - WINDOW_LENGTH; c++) {
      const window: number[] = []
      for (let i = 0; i < WINDOW_LENGTH; i++) {
        window.push(board[r + i][c + i])
      }
      score += evaluateWindow(window, piece)
    }
  }

  // Score negative sloped diagonal
  for (let r = 0; r <= ROW_COUNT - WINDOW_LENGTH; r++) {
    for (let c = 0; c <= COLUMN_COUNT - WINDOW_LENGTH; c++) {
      const window: number[] = []
      for (let i = 0; i < WINDOW_LENGTH; i++) {
        window.push(board[r + WINDOW_LENGTH - 1 - i][c + i])
      }
      score += evaluateWindow(window, piece)
    }
  }

  return score
}
export const pickBestMove = (board: Board, player: number): number => {
  const validLocations: number[] = getAllValidLocations(board)

  let bestScore = -10000
  let bestColumn = validLocations[0]
  for (const column of validLocations) {
    const newBoard: Board = copy2dArray(board)
    const row: number = getNextOpenRow(newBoard, column)
    playPiece(newBoard, row, column, player)
    const score = scorePosition(newBoard, player)
    if (score > bestScore) {
      // console.log(column)
      bestScore = score
      bestColumn = column
    }
  }
  return bestColumn
}

export function countOccurrences<T> (window: T[], value: T): number {
  const count = window.reduce((acc, item) => acc + (item === value ? 1 : 0), 0)
  return count
}

function evaluateWindow (window: number[], piece: number): number {
  let score: number = 0
  let oppPiece: number = PLAYER_PIECE

  if (piece === PLAYER_PIECE) {
    oppPiece = AI_PIECE
  }

  if (window.filter(item => item === piece).length === 4) {
    score += 100
  } else if (window.filter(item => item === piece).length === 3 && window.filter(item => item === EMPTY).length === 1) {
    score += 5
  } else if (window.filter(item => item === piece).length === 2 && window.filter(item => item === EMPTY).length === 2) {
    score += 2
  }

  if (window.filter(item => item === oppPiece).length === 3 && window.filter(item => item === EMPTY).length === 1) {
    score -= 4
  }

  return score
}
