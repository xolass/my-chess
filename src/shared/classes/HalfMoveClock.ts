import { Piece } from "@/shared/classes/Piece";

export class HalfMoveClock {
  count = 0;

  public updateHalfClockMove(piece: Piece, targetPiece?: Piece) {
    if (this.shouldReset(piece, targetPiece)) {
      this.count = 0;
    } else {
      this.count += 1;
    }
  }

  public isGameOverForHalfClockMoveRule() {
    return this.count >= 50
  }

  private shouldReset(piece: Piece, targetPiece?: Piece) {
    if (targetPiece) return true;

    if (piece.name === "p") {
      return true;
    }

    return false;
  }
}
