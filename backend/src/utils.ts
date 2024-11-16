import { Bishop } from "./classes/Bishop.ts";
import { King } from "./classes/King.ts";
import { Knight } from "./classes/Knight.ts";
import { Pawn } from "./classes/Pawn.ts";
import { Piece } from "./classes/Piece.ts";
import { Queen } from "./classes/Queen.ts";
import { Rook } from "./classes/Rook.ts";
import { Colors, Coordinates, PieceIdentifier } from "./types.ts";

type PieceConstructor = new (
  color: Colors,
  position: Coordinates,
  name: PieceIdentifier
) => Piece;

export const nameClassRelation: Record<PieceIdentifier, PieceConstructor> = {
  p: Pawn,
  b: Bishop,
  n: Knight,
  r: Rook,
  k: King,
  q: Queen,
};
