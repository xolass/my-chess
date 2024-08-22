import { canCapture, getBoardCoordinate, getPieceColor, isSamePosition, isTherePieceBetween } from "@/auxFunctions";
import { Board, Cell, Coordinates, FenColors } from "@/types";

export class Pawn {
  private static isEnPassant(to: Coordinates, enPassantTargetSquare: Cell) {
    return getBoardCoordinate(to) === enPassantTargetSquare;
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

  static isPawnWayOfMoving(board: Board, from: Coordinates, to: Coordinates, enPassantTargetSquare: Cell) {
    const piece = board[from.row][from.col];
    if (!piece) return false;
    const pieceColor = getPieceColor(piece);
    const target = board[to.row][to.col];

    if (target) {
      if (this.canCapture(pieceColor, from, to)) return true;
      return false;
    }
    if (this.isEnPassant(to, enPassantTargetSquare)) return true;

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
  static canPawnMove(board: Board, from: Coordinates, to: Coordinates, enPassantTargetSquare: Cell) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (isTherePieceBetween(board, from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (!this.isPawnWayOfMoving(board, from, to, enPassantTargetSquare)) return false;

    return true;
  }
}
