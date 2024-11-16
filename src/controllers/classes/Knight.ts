import { isSamePosition, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
import { Coordinates } from "@/types";

import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";
import { Colors } from "@/types";

export class Knight extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "n");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }

  override isValidMove(board: Board, move: MoveNotation): boolean {
    const { to } = move;
    const from = this.coordinates;

    if (isSamePosition(from, to)) return false;

    if (isTryingToCaptureAlly(board, from, to)) return false;

    if (!this.isKnightWayOfMoving(from, to)) return false;

    return true;
  }

  private isKnightWayOfMoving(from: Coordinates, to: Coordinates) {
    return (
      (Math.abs(from.col - to.col) === 2 && Math.abs(from.row - to.row) === 1) ||
      (Math.abs(from.col - to.col) === 1 && Math.abs(from.row - to.row) === 2)
    );
  }
}
