import { Board, Coordinates } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}


export function getBoardCoordinate({ col, row }: Coordinates) {
  const boardRow = 8 - row
  const boardCol = String.fromCharCode(97 + col)

  return `${boardCol}${boardRow}`
}

export const canCapture = (board: Board, from: Coordinates, to: Coordinates) => {
  const piece = board[from.row][from.col]
  const target = board[to.row][to.col]

  if (!target) return true // is not capturing, is moving to an empty cell
  if (!piece) return false

  const pieceColor = piece === piece.toUpperCase() ? 'white' : 'black'
  const tartgetColor = target === target.toUpperCase() ? 'white' : 'black'

  if (pieceColor === tartgetColor) return false

  return true
}
