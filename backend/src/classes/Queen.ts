import { Colors, Coordinates } from "../types.ts";
import { Board } from "./Board.ts";
import MoveNotation from "./MoveNotation.ts";
import { Piece } from "./Piece.ts";

export class Queen extends Piece {
  constructor(
    public override color: Colors,
    public override coordinates: Coordinates
  ) {
    super(color, coordinates, "q");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }
  override isValidMove(board: Board, move: MoveNotation): boolean {
    const from = this.coordinates;
    const { to } = move;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isQueenWayOfMoving(from, to)) return false;

    return true;
  }

  private isQueenWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal =
      Math.abs(from.row - to.row) === Math.abs(from.col - to.col);

    return isHorizontal || isVertical || isDiagonal;
  }
}
