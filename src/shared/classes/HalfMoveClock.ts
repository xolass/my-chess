import { Piece } from "@/shared/classes/Piece";

export class HalfMoveClock {
  static shouldReset(piece: Piece, targetPiece?: Piece) {
    if (targetPiece) return true;

    if (piece.name === "p") {
      return true;
    }

    return false;
  }
}
