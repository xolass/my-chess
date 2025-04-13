import { Colors, Coordinates } from "@/shared/types";

import { Board } from "@/shared/classes/Board";
import { Move } from "@/shared/classes/Move";
import { Piece } from "@/shared/classes/Piece";
import { directionToCoordinates } from "@/shared/utils";

export class Queen extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "q");
  }

  override calculatePossibleMoves(board: Board): Array<Move> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };
        const lineMoves: Move[] = [];

        while (board.isInsideBoard(next) && this.isValidMove(board, next)) {
          const move = new Move(this.coordinates, next);

          lineMoves.push(move);
          if (board.getSquare(next).piece) break;

          next = { row: next.row + direction.row, col: next.col + direction.col };
        }
        return lineMoves;
      })
      .flat()
      .filter(Boolean) as Move[];

    return moves;
  }

  override getAllDirectionMoves(board: Board): Array<Move> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };
        const lineMoves: Move[] = [];

        while (board.isInsideBoard(next)) {
          const move = new Move(this.coordinates, next);

          lineMoves.push(move);

          next = { row: next.row + direction.row, col: next.col + direction.col };
        }
        return lineMoves;
      })
      .flat()
      .filter(Boolean) as Move[];

    return moves;
  }

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (!board.isInsideBoard(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isQueenWayOfMoving(from, to)) return false;

    return true;
  }

  private isQueenWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);

    return isHorizontal || isVertical || isDiagonal;
  }
}
