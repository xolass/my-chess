import { Piece } from "@/controllers/classes/Piece";
import { Bishop } from "@/controllers/classes/pieces/Bishop";
import { King } from "@/controllers/classes/pieces/King";
import { Knight } from "@/controllers/classes/pieces/Knight";
import { Pawn } from "@/controllers/classes/pieces/Pawn";
import { Queen } from "@/controllers/classes/pieces/Queen";
import { Rook } from "@/controllers/classes/pieces/Rook";
import { Colors, Coordinates, PieceIdentifier } from "@/types";

type PieceConstructor = new (color: Colors, position: Coordinates, name: PieceIdentifier) => Piece;

export const nameClassRelation: Record<PieceIdentifier, PieceConstructor> = {
  p: Pawn,
  b: Bishop,
  n: Knight,
  r: Rook,
  q: Queen,
  k: King,
} as const;
