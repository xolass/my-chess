import { directionToCoordinates } from "@/controllers/auxFunctions";
import { Board } from "@/controllers/classes/Board";
import { Colors, Coordinates } from "@/types";
import { Piece } from "./Piece";

export class Square {
  constructor(public coordinates: Coordinates, public piece: Piece | null = null) {}

  placePiece(piece: Piece) {
    this.piece = piece;
  }

  removePiece() {
    this.piece = null;
  }

  isBeingAttackedByWhitePieces(board: Board): boolean {
    const attackingPieces = this.getAttackingPiece(board);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board);

    const whiteAttackingPieces = attackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.WHITE);
    const whiteAttackingKnights = attackingPieceFromLPositions.filter(
      (attackingKnights) => attackingKnights.color === Colors.WHITE
    );

    if (whiteAttackingPieces.length || whiteAttackingKnights.length) {
      return true;
    }

    return false;
  }

  isBeingAttackedByBlackPieces(board: Board): boolean {
    const attackingPieces = this.getAttackingPiece(board);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board);

    const allAttackingPieces = [...attackingPieces, ...attackingPieceFromLPositions];

    const blackAttackingPieces = allAttackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.BLACK);

    if (blackAttackingPieces.length) {
      return true;
    }

    return false;
  }

  getAttackingPiece(board: Board): Piece[] {
    const attackingPieces = Object.entries(directionToCoordinates)
      .map(([key, value]) => {
        if (key === "same") return null;

        const tempCell = { ...this.coordinates };

        while (tempCell.row > 0 && tempCell.col > 0 && tempCell.row < 7 && tempCell.col < 7) {
          // sum first to avoid checking the current square
          tempCell.row = tempCell.row + value.row;
          tempCell.col = tempCell.col + value.col;

          const possiblePiece = board.getSquare({ row: tempCell.row, col: tempCell.col });

          if (!possiblePiece.piece) continue;

          if (!value.pieces.includes(possiblePiece.piece.pieceLetter)) {
            return null;
          }

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

        if (rowModified < 0 || rowModified > 7 || colModified < 0 || colModified > 7) return null;

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
