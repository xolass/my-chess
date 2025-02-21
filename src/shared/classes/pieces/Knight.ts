import { Coordinates } from "@/shared/types";

import { Board } from "@/shared/classes/Board";
import { Piece } from "@/shared/classes/Piece";
import { Colors } from "@/shared/types";

export class Knight extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "n");
  }

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (!board.isInsideBoard(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (!this.isKnightWayOfMoving(from, to)) return false;

    return true;
  }

  override calculatePossibleMoves(board: Board): Array<Coordinates> {
    const directions = [
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];
    const moves = directions
      .map((direction) => {
        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };

        if (board.isInsideBoard(next) && this.isValidMove(board, next)) {
          return next;
        }
      })
      .filter(Boolean) as Coordinates[];

    return moves;
  }

  override getAllDirectionMoves(board: Board): Array<Coordinates> {
    const directions = [
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];
    const moves = directions
      .map((direction) => {
        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };

        if (board.isInsideBoard(next)) {
          return next;
        }
      })
      .filter(Boolean) as Coordinates[];

    return moves;
  }

  private isKnightWayOfMoving(from: Coordinates, to: Coordinates) {
    return (
      (Math.abs(from.col - to.col) === 2 && Math.abs(from.row - to.row) === 1) ||
      (Math.abs(from.col - to.col) === 1 && Math.abs(from.row - to.row) === 2)
    );
  }
}
