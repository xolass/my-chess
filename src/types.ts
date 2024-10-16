export type Coordinates = {
  row: number;
  col: number;
};

export enum Colors {
  WHITE = "w",
  BLACK = "b",
}

export type Cell = `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"}${"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"}`;

export type Board = Array<Array<PieceLetter | null>>;

export type FenColors = Colors.WHITE | Colors.BLACK;

export type PieceLetter = "p" | "P" | "r" | "R" | "n" | "N" | "b" | "B" | "q" | "Q" | "k" | "K";

export type PromotionOptions = "r" | "n" | "b" | "q";

export type EnPassantTargetSquare = Cell | "-";

export type FenCastle =
  | "KQkq"
  | "KQk"
  | "KQq"
  | "Kkq"
  | "Qkq"
  | "KQ"
  | "Kk"
  | "Kq"
  | "Qk"
  | "Qq"
  | "kq"
  | "K"
  | "Q"
  | "k"
  | "q"
  | "-";

export type FenPiecesSection = `${string}/${string}/${string}/${string}/${string}/${string}/${string}/${string}`;

export type FenType = `${string} ${string} ${string} ${string} ${string} ${string}`;

export interface GenericPiece {
  color: FenColors;
}

export interface GenericPieceAsset {
  size?: number;
}
