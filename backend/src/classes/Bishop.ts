import { Colors, Coordinates } from "../types.ts";
import { Board } from "./Board.ts";
import MoveNotation from "./MoveNotation.ts";
import { Piece } from "./Piece.ts";

export class Bishop extends Piece {
  constructor(
    public override color: Colors,
    public override coordinates: Coordinates
  ) {
    super(color, coordinates, "b");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }
  override isValidMove(board: Board, move: MoveNotation): boolean {
    const from = this.coordinates;
    const { to } = move;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isBishopWayOfMoving(from, to)) return false;
    return true;
  }

  private isBishopWayOfMoving(from: Coordinates, to: Coordinates) {
    return Math.abs(from.col - to.col) === Math.abs(from.row - to.row);
  }
}
