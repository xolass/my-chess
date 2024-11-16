import { Colors, Coordinates, PieceIdentifier, PieceLetter } from "../types.ts";
import { Board } from "./Board.ts";
import MoveNotation from "./MoveNotation.ts";

export abstract class Piece {
  pieceLetter: PieceLetter;
  constructor(
    public color: Colors,
    public coordinates: Coordinates,
    public name: PieceIdentifier
  ) {
    this.pieceLetter =
      this.color === Colors.WHITE
        ? (this.name.toUpperCase() as PieceLetter)
        : (this.name.toLowerCase() as PieceLetter);
  }

  setPosition(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  abstract isValidMove(board: Board, move: MoveNotation): boolean;

  abstract isMovingRightDirection(_target: Coordinates): boolean; // implement this only in the game project
}
