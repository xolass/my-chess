import { Colors, Coordinates } from "@/shared/types";

import { Board } from "@/shared/classes/Board";
import { Piece } from "@/shared/classes/Piece";
import { directionToCoordinates } from "@/shared/utils";

export class Rook extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "r");
  }

  override calculatePossibleMoves(board: Board): Array<Coordinates> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };
        const lineMoves: Coordinates[] = [];

        while (board.isInsideBoard(next) && this.isValidMove(board, next)) {
          lineMoves.push(next);
          if (board.getSquare(next).piece) break;

          next = { row: next.row + direction.row, col: next.col + direction.col };
        }
        return lineMoves;
      })
      .flat()
      .filter(Boolean) as Coordinates[];

    return moves;
  }

  override getAllDirectionMoves(board: Board): Array<Coordinates> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };
        const lineMoves: Coordinates[] = [];

        while (board.isInsideBoard(next)) {
          lineMoves.push(next);

          next = { row: next.row + direction.row, col: next.col + direction.col };
        }
        return lineMoves;
      })
      .flat()
      .filter(Boolean) as Coordinates[];

    return moves;
  }

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (!board.isInsideBoard(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isRookWayOfMoving(from, to)) return false;

    return true;
  }

  private isRookWayOfMoving(from: Coordinates, to: Coordinates) {
    return from.col === to.col || from.row === to.row;
  }
}
