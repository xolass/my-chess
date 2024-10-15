import {
  coordinateToMoveNotation,
  getDirection,
  getPieceColor,
  isSamePosition,
  isTherePieceBetween,
  isTryingToCaptureAlly,
} from "@/auxFunctions";
import { Board, Colors, Coordinates, EnPassantTargetSquare, FenColors, PieceLetter } from "@/types";

export class Pawn {
  static isPawn(piece: PieceLetter) {
    return piece === "p" || piece === "P";
  }
  static isEnPassant(board: Board, from: Coordinates, to: Coordinates) {
    const fromPiece = board[from.row][from.col];
    const target = board[to.row][to.col];
    if (!fromPiece) return false;
    if (target) return false;

    const direction = getDirection(from, to);

    if (fromPiece === "p") {
      if (direction === "downRight" || direction === "downLeft") return true;
    } else if (fromPiece === "P") {
      if (direction === "upRight" || direction === "upLeft") return true;
    }

    return false;
  }

  static canEnPassant(to: Coordinates, enPassantTargetSquare: EnPassantTargetSquare) {
    const isRightSquare = coordinateToMoveNotation(to) === enPassantTargetSquare;
    const isRightRow = to.row === 2 || to.row === 5;

    return isRightSquare && isRightRow;
  }

  static enPassant(board: Board, from: Coordinates, to: Coordinates): Board {
    const newBoard = structuredClone(board);
    const piece = newBoard[from.row][from.col];
    if (!piece) return board;

    if (piece === "P" && to.row === 2) {
      newBoard[to.row + 1][to.col] = null;
      newBoard[from.row][from.col] = null;
      newBoard[to.row][to.col] = piece;
    }

    if (piece === "p" && to.row === 5) {
      newBoard[to.row - 1][to.col] = null;
      newBoard[from.row][from.col] = null;
      newBoard[to.row][to.col] = piece;
    }

    return newBoard;
  }

  private static isTryingToGoBackwards(pieceColor: FenColors, from: Coordinates, to: Coordinates) {
    if (pieceColor === Colors.WHITE && from.row - to.row > 0) return false;
    if (pieceColor === Colors.BLACK && from.row - to.row < 0) return false;

    return true;
  }
  private static isTryingToCapture(from: Coordinates, to: Coordinates) {
    return from.col !== to.col && from.row !== to.row;
  }

  private static isFirstMove(pieceColor: FenColors, from: Coordinates) {
    if (pieceColor === Colors.WHITE && from.row === 6) return true;
    if (pieceColor === Colors.BLACK && from.row === 1) return true;

    return false;
  }

  static getEnPassantTargetSquare(piece: PieceLetter, from: Coordinates, to: Coordinates): EnPassantTargetSquare {
    if (piece !== "p" && piece !== "P") return "-";

    const colorModifier = piece === "P" ? 1 : -1;

    if (Math.abs(from.row - to.row) === 2) {
      return coordinateToMoveNotation({ row: to.row + colorModifier, col: from.col });
    }

    return "-";
  }

  private static validCapture(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!piece) return false;
    if (!target) return false;

    if (Math.abs(from.col - to.col) !== 1) return false;

    // is moving up the board
    if (getPieceColor(piece) === Colors.WHITE && from.row - to.row === 1) {
      return true;
    }

    // is moving down the board
    if (getPieceColor(piece) === Colors.BLACK && from.row - to.row === -1) {
      return true;
    }

    return false;
  }

  static isPawnWayOfMoving(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    const pieceColor = getPieceColor(piece);

    if (this.isTryingToGoBackwards(pieceColor, from, to)) return false;

    if (this.isTryingToCapture(from, to)) {
      if (this.validCapture(board, from, to)) {
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
  static canPawnMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (isTherePieceBetween(board, from, to)) return false;

    if (!this.isPawnWayOfMoving(board, from, to)) return false;

    return true;
  }
}
