import { canCapture, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export class Knight {
  static canKnightMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (!this.isKnightWayOfMoving(from, to)) return false;

    return true;
  }

  static isKnightWayOfMoving(from: Coordinates, to: Coordinates) {
    return (
      (Math.abs(from.col - to.col) === 2 && Math.abs(from.row - to.row) === 1) ||
      (Math.abs(from.col - to.col) === 1 && Math.abs(from.row - to.row) === 2)
    );
  }
}
