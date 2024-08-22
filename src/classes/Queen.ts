import { canCapture, isSamePosition, isTherePieceBetween } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export class Queen {
  static isQueenWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);

    return isHorizontal || isVertical || isDiagonal;
  }
  static canQueenMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (isTherePieceBetween(board, from, to)) return false;

    if (!this.isQueenWayOfMoving(from, to)) return false;

    return true;
  }
}
