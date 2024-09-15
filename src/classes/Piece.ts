import { getPieceColor, isSamePosition, isTryingToCaptureAlly } from "../auxFunctions";
import { Board, Coordinates } from "../types";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Piece {
  static isCapture(board: Board, to: Coordinates) {
    const target = board[to.row][to.col];
    return !!target;
  }

  static canCapture(board: Board, to: Coordinates, movingPiece: Coordinates) {
    const target = board[to.row][to.col];
    const piece = board[movingPiece.row][movingPiece.col];
    if (!target) return false;
    if (!piece) return false;

    if (getPieceColor(piece) === getPieceColor(target)) return false;

    if (!this.isPieceWayOfMoving(board, movingPiece, to)) return false;

    return true;
  }

  static capture(board: Board, movingPiece: Coordinates, capturedPiece: Coordinates) {
    const piece = board[movingPiece.row][movingPiece.col];
    if (!piece) return board;

    const tempBoard = structuredClone(board);
    tempBoard[movingPiece.row][movingPiece.col] = null;

    tempBoard[capturedPiece.row][capturedPiece.col] = piece;

    return tempBoard;
  }

  static isRegularMove(board: Board, to: Coordinates) {
    const target = board[to.row][to.col];
    return !target;
  }
  static canPieceMove(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (!this.isPieceWayOfMoving(board, from, to)) return false;

    return true;
  }

  static isPieceWayOfMoving(board: Board, from: Coordinates, to: Coordinates) {
    const piece = board[from.row][from.col];
    if (piece === "R" || piece === "r") {
      return Rook.canRookMove(board, from, to);
    }
    if (piece === "B" || piece === "b") {
      return Bishop.canBishopMove(board, from, to);
    }
    if (piece === "Q" || piece === "q") {
      return Queen.canQueenMove(board, from, to);
    }
    if (piece === "N" || piece === "n") {
      return Knight.canKnightMove(board, from, to);
    }
    if (piece === "K" || piece === "k") {
      return King.canKingMove(board, from, to);
    }
    if (piece === "P" || piece === "p") {
      return Pawn.canPawnMove(board, from, to);
    }
  }
}
