import { Coordinates } from "../types.ts";
import { Piece } from "./Piece.ts";

export class Square {
  constructor(
    public coordinates: Coordinates,
    public piece: Piece | null = null
  ) {}

  placePiece(piece: Piece) {
    this.piece = piece;
  }

  removePiece() {
    this.piece = null;
  }
}
