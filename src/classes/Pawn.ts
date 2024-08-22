import {
  getBoardCoordinate,
  getPieceColor,
  isSamePosition,
  isTherePieceBetween,
  isTryingToCaptureAlly,
} from "@/auxFunctions";
import { Board, Cell, Coordinates, FenColors } from "@/types";

export class Pawn {
  private static isEnPassant(to: Coordinates, enPassantTargetSquare: Cell) {
    return getBoardCoordinate(to) === enPassantTargetSquare;
  }

  private static isTryingToGoBackwards(pieceColor: FenColors, from: Coordinates, to: Coordinates) {
    if (pieceColor === "w" && from.row - to.row > 0) return true;
    if (pieceColor === "b" && from.row - to.row < 0) return true;

    return false;
  }
  private static isTryingToCapture(from: Coordinates, to: Coordinates) {
    return from.col !== to.col && from.row !== to.row;
  }

  private static isFirstMove(pieceColor: FenColors, from: Coordinates) {
    if (pieceColor === "w" && from.row === 6) return true;
    if (pieceColor === "b" && from.row === 1) return true;

    return false;
  }

  private static validCapture(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!piece) return false;
    if (!target) return false;

    if (Math.abs(from.col - to.col) !== 1) return false;

    if (getPieceColor(piece) === "w" && from.row - to.row === 1) {
      // is moving up the board
      return true;
    }
    if (getPieceColor(piece) === "b" && from.row - to.row === -1) {
      // is moving down the board
      return true;
    }

    return false;
  }

  static isPawnWayOfMoving(board: Board, from: Coordinates, to: Coordinates, enPassantTargetSquare: Cell) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    const pieceColor = getPieceColor(piece);

    if (this.isTryingToGoBackwards(pieceColor, from, to)) return false;

    if (this.isTryingToCapture(from, to)) {
      if (this.validCapture(board, from, to) || this.isEnPassant(to, enPassantTargetSquare)) {
        return true;
      }

      return false;
    } else {
      if (from.col !== to.col) return false;

      if (this.isFirstMove(pieceColor, from)) {
        if (Math.abs(from.row - to.row) > 2) return false;
      }

      return true;
    }
  }
  static canPawnMove(board: Board, from: Coordinates, to: Coordinates, enPassantTargetSquare: Cell) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (isTherePieceBetween(board, from, to)) return false;

    if (!this.isPawnWayOfMoving(board, from, to, enPassantTargetSquare)) return false;

    return true;
  }
}
