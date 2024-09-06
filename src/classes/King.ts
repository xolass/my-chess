import { isSamePosition, isTryingToCaptureAlly } from "@/auxFunctions";
import { Board, Coordinates } from "@/types";

export class King {
  static isKingWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
    const isMovingOneSquare = Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;

    return isMovingOneSquare && (isHorizontal || isVertical || isDiagonal);
  }

  static canKingMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (!this.isKingWayOfMoving(from, to)) return false;

    return true;
  }
}
