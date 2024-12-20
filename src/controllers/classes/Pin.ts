import { Direction, directionToCoordinates, getDirection } from "@/controllers/auxFunctions";
import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";

export class Pin {
  pinnedPiece: Coordinates | undefined;
  constructor(private board: Board, private piecePosition: Coordinates, private currentPlayer: Colors) {
    this.pinnedPiece = this.getPinnedPiece();
  }

  public getPinnedPiece(): Coordinates | undefined {
    const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);
    if (!king) throw new Error("no king (get pinned piece)");

    const directions = Object.entries(directionToCoordinates);

    const kingPos = king.coordinates;

    for (const [key, direction] of directions) {
      if (key === "same") continue;

      let foundAllyPiece = null;
      const currentPos = { row: kingPos.row, col: kingPos.col };

      while (true) {
        currentPos.row = currentPos.row + direction.row;
        currentPos.col = currentPos.col + direction.col;

        if (!this.board.isInsideBoard(currentPos)) break;

        const square = this.board.getSquare(currentPos);
        const currentPiece = square.piece;

        if (!currentPiece) continue;

        if (currentPiece.color === this.currentPlayer) {
          // First ally piece in the line
          if (foundAllyPiece) break; // Second ally piece - no pin

          foundAllyPiece = { position: currentPos, piece: currentPiece };
        } else {
          // Enemy piece encountered
          if (direction.pieces.includes(currentPiece.pieceLetter)) {
            return {
              row: this.piecePosition.row,
              col: this.piecePosition.col,
            };
          }
          break;
        }
      }
    }
    return;
  }

  public getPinningPiece() {
    if (!this.pinnedPiece) return;

    const direction = this.getPinDirection();

    const { row, col } = directionToCoordinates[direction];

    const tempCoordinates = { row: this.pinnedPiece.row + row, col: this.pinnedPiece.col + col };

    while (this.board.isInsideBoard(tempCoordinates)) {
      const piece = this.board.getSquare(tempCoordinates).piece;

      if (!piece) continue;

      return piece;
    }
  }

  public getPinDirection(): Direction {
    if (!this.pinnedPiece) throw new Error("no pinned piece");

    const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);
    if (!king) throw new Error("no king");

    return getDirection(king.coordinates, this.pinnedPiece);
  }
}
