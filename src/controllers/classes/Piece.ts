import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates, PieceIdentifier, PieceLetter } from "@/types";

export abstract class Piece {
  pieceLetter: PieceLetter;
  legalMoves: Coordinates[] = [];
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

  abstract calculatePossibleMoves(board: Board): Array<Coordinates>;

  abstract calculateAttackingSquares(board: Board): Array<Coordinates>;

  static isCapture(board: Board, to: Coordinates) {
    const target = board.getSquare({ row: to.row, col: to.col }).piece;
    return !!target;
  }
}
