import { canCapture, isSamePosition } from "../auxFunctions";
import { Board, Cell, Coordinates } from "../types";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Piece {
  static canPieceMove(board: Board, from: Coordinates, to: Coordinates, enPassantTargetSquare: Cell) {
    const piece = board[from.row][from.col];

    if (!piece) return false;

    if (isSamePosition(from, to)) return false;

    if (!canCapture(board, from, to)) return false;

    if (!this.isPieceWayOfMoving(board, from, to, enPassantTargetSquare)) return false;

    return true;
  }

  static isPieceWayOfMoving(board: Board, from: Coordinates, to: Coordinates, enPassantTargetSquare: Cell) {
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
      return Pawn.canPawnMove(board, from, to, enPassantTargetSquare);
    }
  }
}
