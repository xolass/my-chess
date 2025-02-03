import { Colors, Coordinates } from "@/types";

import { Board } from "@/controllers/classes/Board";
import { Piece } from "@/controllers/classes/Piece";

export class Pawn extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "p");
  }

  override calculatePossibleMoves(board: Board): Array<Coordinates> {
    const moves: Coordinates[] = [];

    const forward = this.color === Colors.WHITE ? -1 : 1;

    const forwardOne = { row: this.coordinates.row + forward, col: this.coordinates.col };
    if (this.isValidMove(board, forwardOne)) {
      moves.push(forwardOne);
    }

    const forwardTwo = { row: this.coordinates.row + 2 * forward, col: this.coordinates.col };
    if (this.isValidMove(board, forwardTwo)) {
      moves.push(forwardTwo);
    }

    const leftCapture = { row: this.coordinates.row + forward, col: this.coordinates.col - 1 };
    if (this.isValidMove(board, leftCapture)) {
      moves.push(leftCapture);
    }

    const rightCapture = { row: this.coordinates.row + forward, col: this.coordinates.col + 1 };
    if (this.isValidMove(board, rightCapture)) {
      moves.push(rightCapture);
    }

    return moves;
  }

  override calculateAttackingSquares(board: Board): Array<Coordinates> {
    const moves: Coordinates[] = [];

    const forward = this.color === Colors.WHITE ? -1 : 1;

    const leftCapture = { row: this.coordinates.row + forward, col: this.coordinates.col - 1 };
    const rightCapture = { row: this.coordinates.row + forward, col: this.coordinates.col + 1 };

    if (board.isInsideBoard(leftCapture)) {
      moves.push(leftCapture);
    }

    if (board.isInsideBoard(leftCapture)) {
      moves.push(rightCapture);
    }

    return moves;
  }

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (!board.isInsideBoard(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isPawnWayOfMoving(board, to)) return false;

    return true;
  }

  private isPawnWayOfMoving(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isTryingToGoBackwards(to)) return false;

    if (this.isCapture(board, from, to)) {
      return this.validCapture(board, to);
    } else {
      if (from.col !== to.col) return false;

      if (Math.abs(from.row - to.row) > 2) return false;
      if (Math.abs(from.row - to.row) === 2) return this.isFirstMove;

      return true;
    }
  }

  private isCapture(board: Board, from: Coordinates, to: Coordinates) {
    const currentPiece = board.getSquare(from).piece;
    const targetPiece = board.getSquare(to).piece;

    return currentPiece && targetPiece;
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

  static isDoubleMove(from: Coordinates, to: Coordinates) {
    return from.col === to.col && Math.abs(from.row - to.row) === 2;
  }
}
