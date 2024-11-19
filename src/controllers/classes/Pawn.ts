import { Colors, Coordinates, MoveFlags } from "@/types";

import { Board } from "@/controllers/classes/Board";
import { EnPassant } from "@/controllers/classes/EnPassant";
import { Piece } from "@/controllers/classes/Piece";

export class Pawn extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "p");
  }

  override isMovingRightDirection(_target: Coordinates): boolean {
    return true;
  }

  override isValidMove(board: Board, to: Coordinates, flags?: MoveFlags): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isPawnWayOfMoving(board, to, flags?.enPassant)) return false;

    return true;
  }

  private isPawnWayOfMoving(board: Board, to: Coordinates, enPassant?: boolean): boolean {
    const from = this.coordinates;

    if (this.isTryingToGoBackwards(to)) return false;

    if (enPassant && EnPassant.isEnPassant(board, from, to)) return true;

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
}
