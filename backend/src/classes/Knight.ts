import { Colors, Coordinates } from "../types.ts";
import { Board } from "./Board.ts";
import MoveNotation from "./MoveNotation.ts";
import { Piece } from "./Piece.ts";

export class Knight extends Piece {
  constructor(
    public override color: Colors,
    public override coordinates: Coordinates
  ) {
    super(color, coordinates, "n");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }

  override isValidMove(_board: Board, move: MoveNotation): boolean {
    const { to } = move;
    const from = this.coordinates;

    if (!this.isKnightWayOfMoving(from, to)) return false;

    return true;
  }

  private isKnightWayOfMoving(from: Coordinates, to: Coordinates) {
    return (
      (Math.abs(from.col - to.col) === 2 &&
        Math.abs(from.row - to.row) === 1) ||
      (Math.abs(from.col - to.col) === 1 && Math.abs(from.row - to.row) === 2)
    );
  }
}
