import { isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function useRookActions() {

  const isRook = (piece: string) => piece.toLowerCase() === 'r'

  const canRookMove = (board: Board, from: Coordinates, to: Coordinates) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isRook(piece)) return false

    if (isSamePosition(from, to)) return false

    if (from.col === to.col && from.row !== to.row) {
      return true
    }

    if (from.col !== to.col && from.row === to.row) {
      return true
    }
    return false
  }

  return {
    isRook,
    canRookMove
  }
}