import { Coordinate, FenType, Piece } from "./types";

const currentFEN: FenType = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const moves: Array<string> = []

const getPiecesPartOfFEN = (FEN: FenType) => FEN.split(' ')[0]


export const getMoves = () => moves
export function getBoardAsMatrix() {
  const boardAsFEN = getPiecesPartOfFEN(currentFEN)
  const rows = boardAsFEN.split('/')

  const boardMatrix = rows.map((row) => getRowAsArray(row))

  return boardMatrix
}

function getRowAsArray(row: string) {
  const cells: Array<Piece | null> = []
  Array.from(row).forEach((char) => {
    if (Number.isNaN(Number(char))) {
      return cells.push(char as Piece)
    }

    const emptySpaces = Number(char)
    cells.push(...Array.from<null>({ length: emptySpaces }).fill(null))
  })

  return cells
}

export const getPieceInCell = ({ row, col }: Coordinate) => getBoardAsMatrix()[col][row]

export function movePiece(from: Coordinate, to: Coordinate) {
}