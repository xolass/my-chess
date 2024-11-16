import { isSamePosition, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";
import { Colors, Coordinates } from "@/types";

export class Bishop extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "b");
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

    if (!this.isBishopWayOfMoving(from, to)) return false;
    return true;
  }

  private isBishopWayOfMoving(from: Coordinates, to: Coordinates) {
    return Math.abs(from.col - to.col) === Math.abs(from.row - to.row);
  }
}
