import { isSamePosition, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
import { Cell } from "@/controllers/classes/Cell";

import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";
import { Colors, Coordinates } from "@/types";

export class King extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "k");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }

  override isValidMove(board: Board, move: MoveNotation): boolean {
    const from = this.coordinates;
    const { to } = move;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (!this.isKingWayOfMoving(from, to)) return false;

    return true;
  }

  private isKingWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
    const isMovingOneSquare = Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;

    return isMovingOneSquare && (isHorizontal || isVertical || isDiagonal);
  }

  isInCheck(board: Board): boolean {
    const king = board.getSquare(this.coordinates)?.piece;

    if (!king)
      throw new Error("King not found", { cause: { coordinates: this.coordinates, board: board.formatedGrid } });

    if (this.color === Colors.WHITE) return Cell.isBeingAttackedByBlackPieces(board, this.coordinates);
    if (this.color === Colors.BLACK) return Cell.isBeingAttackedByWhitePieces(board, this.coordinates);

    return false;
  }
}
