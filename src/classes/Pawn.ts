import { canCapture, getBoardCoordinate, getPieceColor, isSamePosition } from "@/auxFunctions";
import { gameState } from "@/classes/GameState";
import { Board, Coordinates, FenColors } from "@/types";

export class Pawn {
  private static isEnPeasant(to: Coordinates, enPeasentTargetSquare: string) {
    return getBoardCoordinate(to) === enPeasentTargetSquare;
  }

  private static isFirstMove(pieceColor: FenColors, from: Coordinates) {
    if (pieceColor === "w" && from.row === 6) return true;
    if (pieceColor === "b" && from.row === 1) return true;

    return false;
  }

  private static canCapture(pieceColor: FenColors, from: Coordinates, to: Coordinates) {
    if (pieceColor === "w") {
      if (Math.abs(from.col - to.col) !== 1 || from.row - to.row !== 1) return false;
    } else if (pieceColor === "b") {
      if (Math.abs(from.col - to.col) !== 1 || from.row - to.row !== -1) return false;
    }

    return true;
  }

  static isPawnWayOfMoving(board: Board, from: Coordinates, to: Coordinates, enPeasentTargetSquare: string) {
    const piece = board[from.row][from.col];
    if (!piece) return false;
    const pieceColor = getPieceColor(piece);
    const target = board[to.row][to.col];

    if (target) {
      if (this.canCapture(pieceColor, from, to)) return true;
      return false;
    }
    if (this.isEnPeasant(to, enPeasentTargetSquare)) return true;

    if (from.col !== to.col) return false;

    if (this.isFirstMove(pieceColor, from)) {
      if (Math.abs(from.row - to.row) === 2) return true;
    }

    if (pieceColor === "w") {
      if (from.row - to.row > 1) return false;
    } else if (pieceColor === "b") {
      if (from.row - to.row < -1) return false;
    }

    return true;
  }
  static canPawnMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    const enPeasentTargetSquare = gameState.enPassantTargetSquare;

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (this.isTherePieceBetween(board, from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (!this.isPawnWayOfMoving(board, from, to, enPeasentTargetSquare)) return false;

    return true;
  }

  static isTherePieceBetween(board: Board, from: Coordinates, to: Coordinates) {
    for (let i = from.row + 1; i < to.row; i++) {
      if (board[i][from.col]) return true;
    }

    return false;
  }
}
