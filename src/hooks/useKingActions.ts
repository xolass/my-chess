import { canCapture, isKingWayOfMoving, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function useKingActions() {

  const isKing = (piece: string) => piece.toLowerCase() === 'k'

  const canKingMove = (board: Board, from: Coordinates, to: Coordinates) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isKing(piece)) return false

    if (isSamePosition(from, to)) return false

    if (!canCapture(board, from, to)) return false

    if (!isKingWayOfMoving(from, to)) return false

    return true
  }


  return {
    isKing,
    canKingMove,
  }
}