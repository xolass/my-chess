import { Square } from "./classes/Square.ts";

export type Coordinates = {
  row: number;
  col: number;
};

export type Cell = string;

export type PieceLetter =
  | "p"
  | "P"
  | "r"
  | "R"
  | "n"
  | "N"
  | "b"
  | "B"
  | "q"
  | "Q"
  | "k"
  | "K";

export type PieceIdentifier = "p" | "r" | "n" | "b" | "q" | "k";

export type Move = {
  from?: Coordinates;
  to?: Coordinates;
  flags?: MoveFlags;
};

export type Grid = Square[][];

export type ReturnFromGetMovesFromPGN = {
  moves: Array<Move>;
};

export enum Colors {
  WHITE = "w",
  BLACK = "b",
}

export type Promotion = {
  isPromotion: boolean;
  promotionPiece: PieceIdentifier;
};

export type Castle = {
  isShortCastle: boolean;
  isLongCastle: boolean;
  color: Colors;
};

export type EnPassant = {
  enPassantTargetSquare: Coordinates;
};

export type MoveFlags = {
  enPassant?: EnPassant;
  promotion?: Promotion;
  castle?: Castle;
};
