import { Board, Coordinates, Piece } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}

export function getPieceColor(piece: string) {
  return piece === piece.toUpperCase() ? 'white' : 'black'
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

export const isBishopWayOfMoving = (from: Coordinates, to: Coordinates) => {
  return Math.abs(from.col - to.col) === Math.abs(from.row - to.row)
}

export const isRookWayOfMoving = (from: Coordinates, to: Coordinates) => {
  return from.col === to.col || from.row === to.row
}

export const isQueenWayOfMoving = (from: Coordinates, to: Coordinates) => {
  return isRookWayOfMoving(from, to) || isBishopWayOfMoving(from, to)
}

export const isKingWayOfMoving = (from: Coordinates, to: Coordinates) => {
  const isWalkingMoreThan1VerticalSquare = Math.abs(from.row - to.row) > 1
  const isWalkingMoreThan1HorizontalSquare = Math.abs(from.col - to.col) > 1

  return !isWalkingMoreThan1VerticalSquare && !isWalkingMoreThan1HorizontalSquare

}
export function isPawnWayOfMoving(board: Board, from: Coordinates, to: Coordinates, enPeasentTargetSquare: string) {
  const piece = board[from.row][from.col]
  if (!piece) return false
  const pieceColor = getPieceColor(piece)
  const target = board[to.row][to.col]

  function isEnPeasant(to: Coordinates) {
    return getBoardCoordinate(to) === enPeasentTargetSquare
  }

  function isFirstMove() {
    if (pieceColor === 'white' && from.row === 6) return true
    if (pieceColor === 'black' && from.row === 1) return true

    return false
  }

  function canCapture() {
    if (pieceColor === 'white') {
      if (Math.abs(from.col - to.col) !== 1 || from.row - to.row !== 1) return false
    }
    else if (pieceColor === 'black') {
      if (Math.abs(from.col - to.col) !== 1 || from.row - to.row !== -1) return false
    }

    return true
  }


  if (target) {
    if (canCapture()) return true
    return false
  }
  if (isEnPeasant(to)) return true


  if (from.col !== to.col) return false

  if (Math.abs(from.row - to.row) === 2 && !isFirstMove()) return false

  if (pieceColor === 'white') {
    if (from.row < to.row) return false
  } else if (pieceColor === 'black') {
    if (from.row > to.row) return false
  }

  return true
}

export const getDirection = (from: Coordinates, to: Coordinates) => {
  if (from.row < to.row && from.col < to.col) return 'downRight'
  if (from.row < to.row && from.col > to.col) return 'downLeft'
  if (from.row > to.row && from.col < to.col) return 'upRight'
  if (from.row > to.row && from.col > to.col) return 'upLeft'

  return 'wtf'
}
