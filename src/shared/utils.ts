import { Piece } from "@/shared/classes/Piece";
import { Bishop } from "@/shared/classes/pieces/Bishop";
import { King } from "@/shared/classes/pieces/King";
import { Knight } from "@/shared/classes/pieces/Knight";
import { Pawn } from "@/shared/classes/pieces/Pawn";
import { Queen } from "@/shared/classes/pieces/Queen";
import { Rook } from "@/shared/classes/pieces/Rook";
import { Colors, Coordinates, PieceIdentifier } from "@/shared/types";

type PieceConstructor = new (color: Colors, position: Coordinates, name: PieceIdentifier) => Piece;

export const nameClassRelation: Record<PieceIdentifier, PieceConstructor> = {
  p: Pawn,
  b: Bishop,
  n: Knight,
  r: Rook,
  q: Queen,
  k: King,
} as const;
