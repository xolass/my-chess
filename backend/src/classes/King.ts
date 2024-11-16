import { Colors, Coordinates } from "../types.ts";
import { Board } from "./Board.ts";
import MoveNotation from "./MoveNotation.ts";
import { Piece } from "./Piece.ts";

export class King extends Piece {
  constructor(
    public override color: Colors,
    public override coordinates: Coordinates
  ) {
    super(color, coordinates, "k");
  }

  public isMovingRightDirection(_to: Coordinates): boolean {
    return true;
  }

  override isValidMove(_board: Board, move: MoveNotation): boolean {
    const from = this.coordinates;
    const { to } = move;

    if (!this.isKingWayOfMoving(from, to)) return false;

    return true;
  }

  private isKingWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal =
      Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
    const isMovingOneSquare =
      Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;

    return isMovingOneSquare && (isHorizontal || isVertical || isDiagonal);
  }
}
