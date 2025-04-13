import { Move } from "@/shared/classes/Move";
import { Square } from "@/shared/classes/Square";

export type OnlyOneOf<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

export type Coordinates = {
  row: number;
  col: number;
};

export enum Colors {
  WHITE = "w",
  BLACK = "b",
}

export type LettersGrid = Array<Array<PieceLetter | undefined>>;

export type PieceIdentifier = "p" | "r" | "n" | "b" | "q" | "k";

export type Promotion = {
  promotionPiece: PieceIdentifier;
};

export type Cell = `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"}${"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"}`;

export type Grid = Array<Array<Square>>;

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

export type ReturnFromGetMovesFromPGN = {
  moves: Array<Move>;
};

export type FenPiecesSection = `${string}/${string}/${string}/${string}/${string}/${string}/${string}/${string}`;

export type FenType = `${string} ${string} ${string} ${string} ${string} ${string}`;

export interface GenericPiece {
  color: FenColors;
}

export interface GenericPieceAsset {
  size?: number;
}

export type Castle = {
  isShortCastle: boolean;
  isLongCastle: boolean;
  color: Colors;
};

export type MoveFlags = {
  promotion?: Promotion;
  castle?: Castle;
};
