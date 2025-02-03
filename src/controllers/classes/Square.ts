import { directionToCoordinates } from "@/controllers/auxFunctions";
import type { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";
import type { Piece } from "./Piece";

export class Square {
  constructor(public coordinates: Coordinates, public piece?: Piece) {}

  placePiece(piece: Piece) {
    this.piece = piece;
  }

  removePiece() {
    this.piece = undefined;
  }

  public getAllAttackingPieces(board: Board) {
    const attackingPieces = this.getAttackingPieces(board);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board);

    return [...attackingPieces, ...attackingPieceFromLPositions];
  }

  public getWhiteAttackingPieces(board: Board): Array<Piece> {
    const allAttackingPieces = this.getAllAttackingPieces(board);
    const whiteAttackingPieces = allAttackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.WHITE);

    return whiteAttackingPieces;
  }

  public getBlackAttackingPieces(board: Board): Array<Piece> {
    const allAttackingPieces = this.getAllAttackingPieces(board);

    const blackAttackingPieces = allAttackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.BLACK);

    return blackAttackingPieces;
  }

  private getAttackingPieces(board: Board): Piece[] {
    const attackingPieces = Object.entries(directionToCoordinates)
      .map(([key, value]) => {
        if (key === "same") return;

        let loopIndex = 0;

        do {
          loopIndex++;

          // sum first to avoid checking the current square
          const tempCell = {
            row: this.coordinates.row + value.row * loopIndex,
            col: this.coordinates.col + value.col * loopIndex,
          };

          if (!board.isInsideBoard(tempCell)) break;

          const possiblePiece = board.getSquare({ row: tempCell.row, col: tempCell.col });

          if (!possiblePiece.piece) continue;

          if (possiblePiece.piece.name === "k") {
            // king walks only 1 square
            if (loopIndex > 1) return;
          }
          if (!value.pieces.includes(possiblePiece.piece.pieceLetter)) {
            return;
          }

          return possiblePiece.piece;
        } while (true);
      })
      .filter((piece) => Boolean(piece)) as Piece[];

    return attackingPieces;
  }

  getAttackingPieceFromLPositions(board: Board): Piece[] {
    const lPositions = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    const attackingKnights = lPositions
      .map((modifier) => {
        const rowModified = this.coordinates.row + modifier.row;
        const colModified = this.coordinates.col + modifier.col;

        if (!board.isInsideBoard({ row: rowModified, col: colModified })) return;

        const cellInLPositiion = { row: rowModified, col: colModified };
        const piece = board.getSquare({ row: cellInLPositiion.row, col: cellInLPositiion.col }).piece;

        if (!piece) return;

        if (piece.name === "n") return piece;

        return;
      })
      .filter((piece) => piece) as Piece[];

    return attackingKnights;
  }
}
