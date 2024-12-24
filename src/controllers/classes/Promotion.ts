import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";

export class Promotion {
  static isPromotion(board: Board, from: Coordinates, to: Coordinates): boolean {
    const piece = board.getSquare(from).piece;
    if (!piece) return false;

    if (piece.name !== "p") return false;

    if (piece.color === Colors.WHITE && to.row !== 0) {
      return false;
    }
    if (piece.color === Colors.BLACK && to.row !== 7) {
      return false;
    }

    if (!piece.isValidMove(board, to)) return false;

    return true;
  }
}
