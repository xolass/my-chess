import { canCapture, isRookWayOfMoving, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function useRookActions() {

  const isRook = (piece: string) => piece.toLowerCase() === 'r'

  const canRookMove = (board: Board, from: Coordinates, to: Coordinates) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isRook(piece)) return false

    if (isSamePosition(from, to)) return false

    if (isTherePieceBetween(board, from, to)) return false

    if (!canCapture(board, from, to)) return false

    if (!isRookWayOfMoving(from, to)) return false

    return true
  }


  const isTherePieceBetween = (board: Board, from: Coordinates, to: Coordinates) => {
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
  }

  return {
    isRook,
    canRookMove,
    isTherePieceBetween
  }
}