import { isSamePosition, isTherePieceBetween, isTryingToCaptureAlly } from "@/auxFunctions";
import { Board, Coordinates, PieceLetter } from "@/types";

export class Bishop {
  static isBishop(piece: PieceLetter) {
    return piece === "b" || piece === "B";
  }

  static isBishopWayOfMoving(from: Coordinates, to: Coordinates) {
    return Math.abs(from.col - to.col) === Math.abs(from.row - to.row);
  }

  static canBishopMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (isSamePosition(from, to)) return false;
    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (isTherePieceBetween(board, from, to)) return false;

    if (!this.isBishopWayOfMoving(from, to)) return false;

    return true;
  }
}
