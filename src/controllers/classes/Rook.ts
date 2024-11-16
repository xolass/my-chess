import { isSamePosition, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
import { Colors, Coordinates } from "@/types";

import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";

export class Rook extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "r");
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

    if (!this.isRookWayOfMoving(from, to)) return false;

    return true;
  }

  private isRookWayOfMoving(from: Coordinates, to: Coordinates) {
    return from.col === to.col || from.row === to.row;
  }
}
