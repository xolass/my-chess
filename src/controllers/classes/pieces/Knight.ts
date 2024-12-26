import { Coordinates } from "@/types";

import { directionToCoordinates } from "@/controllers/auxFunctions";
import { Board } from "@/controllers/classes/Board";
import { Piece } from "@/controllers/classes/Piece";
import { Colors } from "@/types";

export class Knight extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "n");
  }

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (!board.isInsideBoard(to)) return false

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (!this.isKnightWayOfMoving(from, to)) return false;

    return true;
  }

  override calculateLegalMoves(board: Board): Array<Coordinates> {
    const directions = [
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: 2, col: -1 },
      { row: 2, col: 1 }
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

  override calculateAttackingSquares(board: Board): Array<Coordinates> {
    const directions = [
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: 2, col: -1 },
      { row: 2, col: 1 }
    ];

    const moves = directions
      .map((direction) => {

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };
        if (this.isAttackingThisSquare(board, next)) {
          return next;
        }
      })
      .filter(Boolean) as Coordinates[];

    return moves;
  }

  private isAttackingThisSquare(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (board.isInsideBoard(to)) return false;

    if (this.isSamePosition(to)) return false;

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
