export type Coordinates = {
  row: number;
  col: number;
};

export type Board = Array<Array<PieceLetter | null>>;

export type FenColors = "w" | "b";

export type PieceLetter = "p" | "P" | "r" | "R" | "n" | "N" | "b" | "B" | "q" | "Q" | "k" | "K";

export type FenPiecesSection = `${string}/${string}/${string}/${string}/${string}/${string}/${string}/${string}`;

export type FenType = `${FenPiecesSection} ${FenColors} ${string} ${string} ${string} ${string}`;

export interface GenericPiece {
  color: FenColors;
}

export interface GenericPieceAsset {
  size: number;
}
