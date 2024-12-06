import { Bishop } from "@/controllers/classes/Bishop";
import { King } from "@/controllers/classes/King";
import { Knight } from "@/controllers/classes/Knight";
import { Pawn } from "@/controllers/classes/Pawn";
import { Piece } from "@/controllers/classes/Piece";
import { Queen } from "@/controllers/classes/Queen";
import { Rook } from "@/controllers/classes/Rook";
import { Colors, Coordinates, PieceIdentifier } from "@/types";

type PieceConstructor = new (color: Colors, position: Coordinates, name: PieceIdentifier) => Piece;

export const nameClassRelation: Record<PieceIdentifier, PieceConstructor> = {
  p: Pawn,
  b: Bishop,
  n: Knight,
  r: Rook,
  k: King,
  q: Queen,
};
