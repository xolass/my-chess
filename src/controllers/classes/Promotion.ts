import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";

export class Promotion {
  static isPromotion(board: Board, from: Coordinates, to: Coordinates): boolean {
    const piece = board.getSquare({ row: from.row, col: from.col }).piece;
    if (!piece) return false;

    if (piece.name !== "p") return false;

    if (!piece.isValidMove(board, from, to)) return false;

    if (piece.color === Colors.WHITE) {
      if (to.row === 0) return true;
    }
    if (piece.color === Colors.BLACK) {
      if (to.row === 7) return true;
    }

    return false;
  }
}
