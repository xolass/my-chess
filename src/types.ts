export type Coordinates = {
  row: number;
  col: number
}

export type Board = Array<Array<Piece | null>>

export type FenColors = 'w' | 'b'

export type Piece = 'p' | 'P' | 'r' | 'R' | 'n' | 'N' | 'b' | 'B' | 'q' | 'Q' | 'k' | 'K'

export type FenPieces = `${string}/${string}/${string}/${string}/${string}/${string}/${string}/${string}`

export type FenType = `${FenPieces} ${FenColors} ${string} ${string} ${string} ${string}`

export interface GenericPiece {
  color: FenColors
}

export interface GenericPieceAsset {
  size: number;
}