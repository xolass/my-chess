export type Coordinates = {
  row: number;
  col: number
}

export type Board = Array<Array<Piece | null>>

export type Colors = 'w' | 'b'

export type Piece = 'p' | 'P' | 'r' | 'R' | 'n' | 'N' | 'b' | 'B' | 'q' | 'Q' | 'k' | 'K'

export type FenType = `${string}/${string}/${string}/${string}/${string}/${string}/${string}/${string} ${Colors} ${string}`

export interface GenericPiece {
  color: Colors
}

export interface GenericPieceAsset {
  size: number;
}