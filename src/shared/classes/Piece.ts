import { Board } from "@/shared/classes/Board";
import { Move } from "@/shared/classes/Move";
import { Colors, Coordinates, PieceIdentifier, PieceLetter } from "@/shared/types";

export abstract class Piece {
  pieceLetter: PieceLetter;
  legalMoves: Move[] = [];
  preMoves: Move[] = [];

  constructor(public color: Colors, public coordinates: Coordinates, public name: PieceIdentifier) {
    this.pieceLetter = (this.color === Colors.WHITE ? this.name.toUpperCase() : this.name.toLowerCase()) as PieceLetter;
  }

  setPosition(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  protected isSamePosition(target: Coordinates) {
    return this.coordinates.row === target.row && this.coordinates.col === target.col;
  }

  protected isTryingToCaptureAlly(board: Board, to: Coordinates) {
    const target = board.getSquare(to).piece;
    if (!target) return false; // is not capturing, is moving to an empty cell
    if (this.color !== target.color) return false;

    return true;
  }

  abstract isValidMove(board: Board, to: Coordinates): boolean;

  abstract calculatePossibleMoves(board: Board): Array<Move>;

  abstract getAllDirectionMoves(board: Board): Array<Move>;

  static isCapture(board: Board, to: Coordinates) {
    const target = board.getSquare({ row: to.row, col: to.col }).piece;
    return !!target;
  }
}
