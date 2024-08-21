import { canCapture, getDirection, isSamePosition } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export class Bishop {
  static isBishopWayOfMoving(from: Coordinates, to: Coordinates) {
    return Math.abs(from.col - to.col) === Math.abs(from.row - to.row);
  }

  static canBishopMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (this.isTherePieceBetween(board, from, to)) return false;

    if (!this.isBishopWayOfMoving(from, to)) return false;

    return true;
  }

  static isTherePieceBetween(board: Board, from: Coordinates, to: Coordinates) {
    const lengthWalked = Math.abs(from.row - to.row);

    const direction = getDirection(from, to);

    const directionFunction = {
      downRight(i: number) {
        return { row: from.row + i, col: from.col + i };
      },
      downLeft(i: number) {
        return { row: from.row + i, col: from.col - i };
      },
      upRight(i: number) {
        return { row: from.row - i, col: from.col + i };
      },
      upLeft(i: number) {
        return { row: from.row - i, col: from.col - i };
      },
    };

    for (let i = 1; i < lengthWalked; i++) {
      const { row, col } = directionFunction[direction](i);
      if (board[row][col]) return true;
    }

    return false;
  }
}
