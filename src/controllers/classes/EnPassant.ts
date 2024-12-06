import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";

export class EnPassant {
  static canEnPassant(to: Coordinates, enPassantTargetCoordinates: Coordinates) {
    return to.row === enPassantTargetCoordinates.row && to.col === enPassantTargetCoordinates.col;
  }

  static isEnPassant(board: Board, from: Coordinates, to: Coordinates) {
    const fromPiece = board.getSquare({ row: from.row, col: from.col }).piece;
    const target = board.getSquare({ row: to.row, col: to.col }).piece;

    if (!fromPiece) return false;
    if (fromPiece.name !== "p") return false;
    if (target) return false;

    const colorOffset = fromPiece.color === Colors.WHITE ? 1 : -1;
    const enPassantedPiece = board.getSquare({ row: to.row + colorOffset, col: to.col }).piece;

    if (!enPassantedPiece) return false;

    if (Math.abs(from.col - to.col) !== 1) return false;

    if (fromPiece.color === Colors.WHITE) {
      if (to.row === 2) return true;
    }
    if (fromPiece.color === Colors.BLACK) {
      if (to.row === 5) return true;
    }
  }
}
