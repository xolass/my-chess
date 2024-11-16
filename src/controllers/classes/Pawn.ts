import {
  coordinateToMoveNotation,
  getDirection,
  isSamePosition,
  isTryingToCaptureAlly,
} from "@/controllers/auxFunctions";
import { Colors, Coordinates, EnPassantTargetSquare } from "@/types";

import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";

export class Pawn extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "p");
  }

  override isMovingRightDirection(_target: Coordinates): boolean {
    return true;
  }

  override isValidMove(board: Board, move: MoveNotation): boolean {
    const { to } = move;
    const from = this.coordinates;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isPawnWayOfMoving(board, move)) return false;

    return true;
  }

  isPawnWayOfMoving(board: Board, move: MoveNotation): boolean {
    const { to } = move;
    const from = this.coordinates;

    if (this.isTryingToGoBackwards(to)) return false;

    if (this.isEnPassant(board, move)) return true;

    if (this.validCapture(board, to)) {
      return true;
    }

    if (from.col !== to.col) return false;

    if (Math.abs(from.row - to.row) > 2) return false;
    if (Math.abs(from.row - to.row) === 2) {
      return this.isFirstMove;
    }

    return true;
  }

  private validCapture(board: Board, to: Coordinates) {
    const from = this.coordinates;
    const toSquare = board.getSquare(to);

    if (!toSquare.piece) return false;

    if (toSquare.piece.color === this.color) return false;

    if (Math.abs(from.col - to.col) !== 1) return false;

    // is moving up the board
    if (this.color === Colors.WHITE && from.row - to.row === 1) {
      return true;
    }

    // is moving down the board
    if (this.color === Colors.BLACK && from.row - to.row === -1) {
      return true;
    }

    return false;
  }

  private isEnPassant(board: Board, move: MoveNotation) {
    const { to } = move;

    if (!move.isCapture) return false;
    if (board.getSquare(to).piece) return false;

    return true;
  }

  private isTryingToGoBackwards(to: Coordinates) {
    const from = this.coordinates;

    if (this.color === Colors.WHITE && from.row - to.row > 0) return false;
    if (this.color === Colors.BLACK && from.row - to.row < 0) return false;

    return true;
  }

  get isFirstMove() {
    if (this.color === Colors.WHITE && this.coordinates.row === 6) return true;
    if (this.color === Colors.BLACK && this.coordinates.row === 1) return true;

    return false;
  }

  static isEnPassant(board: Board, from: Coordinates, to: Coordinates) {
    const fromPiece = board.getSquare({ row: from.row, col: from.col }).piece;
    const target = board.getSquare({ row: to.row, col: to.col }).piece;
    if (!fromPiece) return false;
    if (target) return false;

    const direction = getDirection(from, to);

    if (fromPiece.color === Colors.WHITE) {
      if (direction === "upRight" || direction === "upLeft") return true;
    } else if (fromPiece.color === Colors.BLACK) {
      if (direction === "downRight" || direction === "downLeft") return true;
    }

    return false;
  }

  static canEnPassant(to: Coordinates, enPassantTargetSquare: EnPassantTargetSquare) {
    const isRightSquare = coordinateToMoveNotation(to) === enPassantTargetSquare;
    const isRightRow = to.row === 2 || to.row === 5;

    return isRightSquare && isRightRow;
  }
}
