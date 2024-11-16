import { Colors, Coordinates } from "../types.ts";
import { Board } from "./Board.ts";
import MoveNotation from "./MoveNotation.ts";
import { Piece } from "./Piece.ts";

export class Rook extends Piece {
  constructor(
    public override color: Colors,
    public override coordinates: Coordinates
  ) {
    super(color, coordinates, "r");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }

  override isValidMove(board: Board, move: MoveNotation): boolean {
    const from = this.coordinates;
    const { to } = move;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isRookWayOfMoving(from, to)) return false;

    return true;
  }

  private isRookWayOfMoving(from: Coordinates, to: Coordinates) {
    return from.col === to.col || from.row === to.row;
  }
}
