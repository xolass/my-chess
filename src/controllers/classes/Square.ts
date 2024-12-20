import { directionToCoordinates } from "@/controllers/auxFunctions";
import type { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";
import type { Piece } from "./Piece";

export class Square {
  constructor(public coordinates: Coordinates, public piece: Piece | null = null) {}

  placePiece(piece: Piece) {
    this.piece = piece;
  }

  removePiece() {
    this.piece = null;
  }

  public getWhiteAttackingPieces(board: Board): Array<Piece> {
    const attackingPieces = this.getAttackingPiece(board);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board);

    const allAttackingPieces = [...attackingPieces, ...attackingPieceFromLPositions];

    const whiteAttackingPieces = allAttackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.WHITE);

    return whiteAttackingPieces;
  }

  public getBlackAttackingPieces(board: Board): Array<Piece> {
    const attackingPieces = this.getAttackingPiece(board);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board);

    const allAttackingPieces = [...attackingPieces, ...attackingPieceFromLPositions];

    const blackAttackingPieces = allAttackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.BLACK);

    return blackAttackingPieces;
  }

  private getAttackingPiece(board: Board): Piece[] {
    const attackingPieces = Object.entries(directionToCoordinates)
      .map(([key, value]) => {
        if (key === "same") return null;

        const tempCell = {
          row: this.coordinates.row + value.row,
          col: this.coordinates.col + value.col,
        };

        while (board.isInsideBoard(tempCell)) {
          // sum first to avoid checking the current square

          console.log(tempCell, key, value);

          const possiblePiece = board.getSquare({ row: tempCell.row, col: tempCell.col });

          if (!possiblePiece.piece) continue;

          if (!value.pieces.includes(possiblePiece.piece.pieceLetter)) {
            return null;
          }

          tempCell.row = tempCell.row + value.row;
          tempCell.col = tempCell.col + value.col;

          return possiblePiece.piece;
        }
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

        if (!board.isInsideBoard({ row: rowModified, col: colModified })) return null;

        const cellInLPositiion = { row: rowModified, col: colModified };
        const piece = board.getSquare({ row: cellInLPositiion.row, col: cellInLPositiion.col }).piece;

        if (!piece) return null;

        if (piece.name === "n") return piece;

        return null;
      })
      .filter((piece) => piece) as Piece[];

    return attackingKnights;
  }
}
