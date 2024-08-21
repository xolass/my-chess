import { canCapture, isSamePosition } from "@/auxFunctions";
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

    if (this.isTherePieceBetween(board, from, to)) return false;

    if (!this.isRookWayOfMoving(from, to)) return false;

    return true;
  }

  static isTherePieceBetween(board: Board, from: Coordinates, to: Coordinates) {
    if (from.col === to.col) {
      const start = Math.min(from.row, to.row);
      const end = Math.max(from.row, to.row);
      for (let i = start + 1; i < end; i++) {
        if (board[i][from.col]) return true;
      }
    }

    if (from.row === to.row) {
      const start = Math.min(from.col, to.col);
      const end = Math.max(from.col, to.col);
      for (let i = start + 1; i < end; i++) {
        if (board[from.row][i]) return true;
      }
    }

    return false;
  }
}
