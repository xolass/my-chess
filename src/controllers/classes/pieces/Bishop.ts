import { directionToCoordinates } from "@/controllers/auxFunctions";
import { Board } from "@/controllers/classes/Board";
import { Piece } from "@/controllers/classes/Piece";
import { Colors, Coordinates } from "@/types";

export class Bishop extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "b");
  }

  override calculateLegalMoves(board: Board): Array<Coordinates> {
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

  override calculateAttackingSquares(board: Board): Array<Coordinates> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };
        const lineMoves: Coordinates[] = [];

        while (this.isAttackingThisSquare(board, next)) {
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

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isBishopWayOfMoving(from, to)) return false;
    return true;
  }

  private isAttackingThisSquare(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (!board.isInsideBoard(to)) return false;

    if (board.isTherePieceBetween(from, to)) return false;

    if (!this.isBishopWayOfMoving(from, to)) return false;
    return true;
  }

  private isBishopWayOfMoving(from: Coordinates, to: Coordinates) {
    return Math.abs(from.col - to.col) === Math.abs(from.row - to.row);
  }
}