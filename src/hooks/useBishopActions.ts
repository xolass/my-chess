import { canCapture, getDirection, isBishopWayOfMoving, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export function useBishopActions() {

  const isBishop = (piece: string) => piece.toLowerCase() === 'b'

  const canBishopMove = (board: Board, from: Coordinates, to: Coordinates) => {
    const piece = board[from.row][from.col]

    if (!piece) return false
    if (!isBishop(piece)) return false

    if (isSamePosition(from, to)) return false

    if (isTherePieceBetween(board, from, to)) return false

    if (!canCapture(board, from, to)) return false

    if (!isBishopWayOfMoving(from, to)) return false

    return true
  }

  const isTherePieceBetween = (board: Board, from: Coordinates, to: Coordinates) => {
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


  return {
    isBishop,
    canBishopMove,
    isTherePieceBetween
  }
}