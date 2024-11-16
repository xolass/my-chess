import { isSamePosition, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
import { Colors, Coordinates } from "@/types";

import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";

export class Queen extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "q");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }

  override isValidMove(board: Board, move: MoveNotation): boolean {
    const from = this.coordinates;
    const { to } = move;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isQueenWayOfMoving(from, to)) return false;

    return true;
  }

  private isQueenWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);

    return isHorizontal || isVertical || isDiagonal;
  }
}
