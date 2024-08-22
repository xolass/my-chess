import { canCapture, isSamePosition, isTherePieceBetween } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export class Rook {
  static isRookWayOfMoving(from: Coordinates, to: Coordinates) {
    return from.col === to.col || from.row === to.row;
  }
  static canRookMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (isTherePieceBetween(board, from, to)) return false;

    if (!this.isRookWayOfMoving(from, to)) return false;

    return true;
  }
}
