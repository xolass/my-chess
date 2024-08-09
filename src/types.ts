export type Coordinate = {
  row: number;
  col: number
}
export type Colors = 'w'|'b'

export type Piece = 'p'|'P'|'r'|'R'|'n'|'N'|'b'|'B'|'q'|'Q'|'k'|'K'

export type FenType = `${string}/${string}/${string}/${string}/${string}/${string}/${string}/${string} ${Colors} ${string}`

export interface GenericPiece {
  color: Colors
}

export interface GenericPieceAsset {
  size: number;
}