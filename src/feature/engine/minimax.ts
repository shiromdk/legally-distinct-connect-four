import { getAllValidLocations, getNextOpenRow, hasWon, isTerminalNode, playPiece } from './board'
import type { Board } from './board'
import { copy2dArray } from './helper'
import { scorePosition } from './scoring'

const minimax = (board: Board, depth: number, alpha: number, beta: number, maximisingPlayer: boolean, player: number): number[] => {
  const opponent = player === 1 ? 2 : 1
  const validLocations = getAllValidLocations(board)
  const isTerminal = isTerminalNode(board, player)
  if (depth === 0 || isTerminal) {
    if (isTerminal) {
      if (hasWon(board, opponent)) {
        return [-1, 999999]
      } else if (hasWon(board, player)) {
        return [-1, -999999]
      } else {
        return [-1, 0]
      }
    } else {
      return [-1, scorePosition(board, opponent)]
    }
  }
  if (maximisingPlayer) {
    let value = -999999
    let column = validLocations[0]
    for (const col of validLocations) {
      const newBoard: Board = copy2dArray(board)
      const row = getNextOpenRow(board, col)
      playPiece(newBoard, row, col, player)
      const newScore = minimax(newBoard, depth - 1, alpha, beta, false, player)
      if (newScore[1] > value) {
        value = newScore[1]
        column = col
      }
      alpha = Math.max(alpha, value)
      if (alpha >= beta) {
        break
      }
    }
    return [column, value]
  } else {
    let value = 999999
    let column = validLocations[0]
    for (const col of validLocations) {
      const newBoard: Board = copy2dArray(board)
      const row = getNextOpenRow(board, col)
      playPiece(newBoard, row, col, player)
      const newScore = minimax(newBoard, depth - 1, alpha, beta, true, opponent)
      if (newScore[1] < value) {
        value = newScore[1]
        column = col
      }
      beta = Math.min(beta, value)
      if (alpha >= beta) {
        break
      }
    }
    return [column, value]
  }
}

export default minimax
