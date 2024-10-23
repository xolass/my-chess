import { isSamePosition, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
import { Board, Coordinates, PieceLetter } from "@/types";

export class Knight {
  static isKnight(piece: PieceLetter) {
    return piece === "N" || piece === "n";
  }
  static isKnightWayOfMoving(from: Coordinates, to: Coordinates) {
    return (
      (Math.abs(from.col - to.col) === 2 && Math.abs(from.row - to.row) === 1) ||
      (Math.abs(from.col - to.col) === 1 && Math.abs(from.row - to.row) === 2)
    );
  }
  static canKnightMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (!this.isKnightWayOfMoving(from, to)) return false;

    return true;
  }
}
