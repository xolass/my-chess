import { canCapture, getDirection, getPieceColor, isBishopWayOfMoving, isPawnWayOfMoving, isRookWayOfMoving, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function usePawnActions() {

  const isPawn = (piece: string) => piece.toLowerCase() === 'p'

  const canPawnMove = (board: Board, from: Coordinates, to: Coordinates, enPeasentTargetSquare: string) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isPawn(piece)) return false

    if (isSamePosition(from, to)) return false

    if (isTherePieceBetween(board, from, to)) return false

    if (!canCapture(board, from, to)) return false

    if (!isPawnWayOfMoving(board, from, to, enPeasentTargetSquare)) return false

    return true
  }


  const isTherePieceBetween = (board: Board, from: Coordinates, to: Coordinates) => {
    for (let i = from.row + 1; i < to.row; i++) {
      if (board[i][from.col]) return true
    }

    return false

  }

  return {
    isPawn,
    canPawnMove,
    isTherePieceBetween
  }
}