import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";

export class Promotion {
  static isPromotion(board: Board, from: Coordinates, to: Coordinates): boolean {
    const piece = board.getSquare(from).piece;
    if (!piece) return false;

    if (piece.name !== "p") return false;

    if (!piece.isValidMove(board, to)) return false;

    if (piece.color === Colors.WHITE) {
      if (to.row === 0) return true;
    }
    if (piece.color === Colors.BLACK) {
      if (to.row === 7) return true;
    }

    return false;
  }
}
