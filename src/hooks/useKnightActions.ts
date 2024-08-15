import { canCapture, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function useKnightActions() {

  const isKnight = (piece: string) => piece.toLowerCase() === 'n'

  const canKnightMove = (board: Board, from: Coordinates, to: Coordinates) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isKnight(piece)) return false

    if (isSamePosition(from, to)) return false

    if (isTherePieceBetween(board, from, to)) return false

    if (!canCapture(board, from, to)) return false

    if (!isKnightWayOfMoving(from, to)) return false

    return true
  }

  const isKnightWayOfMoving = (from: Coordinates, to: Coordinates) => {
    return (Math.abs(from.col - to.col) === 2 && Math.abs(from.row - to.row) === 1) || (Math.abs(from.col - to.col) === 1 && Math.abs(from.row - to.row) === 2)
  }

  const isTherePieceBetween = (_board: Board, _from: Coordinates, _to: Coordinates) => {
    return false
  }


  return {
    isKnight,
    canKnightMove,
    isTherePieceBetween
  }
}