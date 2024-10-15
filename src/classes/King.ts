import { isSamePosition, isTryingToCaptureAlly } from "@/auxFunctions";
import { Cell } from "@/classes/Cell";
import { Board, Coordinates, PieceLetter } from "@/types";

export class King {
  static isKing(piece: PieceLetter) {
    return piece === "k" || piece === "K";
  }

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

  static isKingInCheck(board: Board, kingPosition: Coordinates): boolean {
    const king = board[kingPosition.row][kingPosition.col];

    if (king === "K") return Cell.isBeingAttackedByBlackPieces(board, kingPosition);
    if (king === "k") return Cell.isBeingAttackedByWhitePieces(board, kingPosition);

    return false;
  }
}
