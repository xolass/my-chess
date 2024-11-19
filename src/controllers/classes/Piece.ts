import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates, MoveFlags, PieceIdentifier, PieceLetter } from "@/types";

export abstract class Piece {
  pieceLetter: PieceLetter;
  constructor(public color: Colors, public coordinates: Coordinates, public name: PieceIdentifier) {
    this.pieceLetter = (this.color === Colors.WHITE ? this.name.toUpperCase() : this.name.toLowerCase()) as PieceLetter;
  }

  setPosition(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  isSamePosition(target: Coordinates) {
    return this.coordinates.row === target.row && this.coordinates.col === target.col;
  }

  isTryingToCaptureAlly(board: Board, to: Coordinates) {
    const target = board.getSquare(to).piece;
    if (!target) return false; // is not capturing, is moving to an empty cell
    if (this.color !== target.color) return false;

    return true;
  }

  abstract isValidMove(board: Board, to: Coordinates, flags?: MoveFlags): boolean;

  abstract isMovingRightDirection(_target: Coordinates): boolean; // implement this only in the game project

  static isCapture(board: Board, to: Coordinates) {
    const target = board.getSquare({ row: to.row, col: to.col }).piece;
    return !!target;
  }
}
