import { canCapture, getDirection, isBishopWayOfMoving, isQueenWayOfMoving, isRookWayOfMoving, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function useQueenActions() {

  const isQueen = (piece: string) => piece.toLowerCase() === 'q'

  const canQueenMove = (board: Board, from: Coordinates, to: Coordinates) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isQueen(piece)) return false

    if (isSamePosition(from, to)) return false

    if (isTherePieceBetween(board, from, to)) return false

    if (!canCapture(board, from, to)) return false

    if (!isQueenWayOfMoving(from, to)) return false

    return true
  }


  const isTherePieceBetween = (board: Board, from: Coordinates, to: Coordinates) => {
    const isMovingLikeRook = isRookWayOfMoving(from, to)
    const isMovingLikeBishop = isBishopWayOfMoving(from, to)

    if (isMovingLikeRook) {
      if (from.col === to.col) {
        const start = Math.min(from.row, to.row)
        const end = Math.max(from.row, to.row)
        for (let i = start + 1; i < end; i++) {
          if (board[i][from.col]) return true
        }
      }

      if (from.row === to.row) {
        const start = Math.min(from.col, to.col)
        const end = Math.max(from.col, to.col)
        for (let i = start + 1; i < end; i++) {
          if (board[from.row][i]) return true
        }
      }

      return false
    } else if (isMovingLikeBishop) {
      const lengthWalked = Math.abs(from.row - to.row)

      const direction = getDirection(from, to)

      const directionFunction = {
        downRight(i: number) {
          return { row: from.row + i, col: from.col + i }
        },
        downLeft(i: number) {
          return { row: from.row + i, col: from.col - i }
        },
        upRight(i: number) {
          return { row: from.row - i, col: from.col + i }
        },
        upLeft(i: number) {
          return { row: from.row - i, col: from.col - i }
        },
        wtf(_i: number) {
          return { row: from.row, col: from.col }
        }
      }

      for (let i = 1; i < lengthWalked; i++) {
        const { row, col } = directionFunction[direction](i)
        if (board[row][col]) return true
      }

      return false
    }

    return false

  }

  return {
    isQueen,
    canQueenMove,
    isTherePieceBetween
  }
}