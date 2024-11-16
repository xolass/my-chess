import { directionToCoordinates, isTryingToCaptureAlly } from "@/controllers/auxFunctions";
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

  static isBeingAttackedByWhitePieces(board: Board, cell: Coordinates): boolean {
    const attackingPieces = this.getAttackingPiece(board, cell);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board, cell);

    const whiteAttackingPieces = attackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.WHITE);
    const whiteAttackingKnights = attackingPieceFromLPositions.filter(
      (attackingKnights) => attackingKnights.color === Colors.WHITE
    );

    if (whiteAttackingPieces.length || whiteAttackingKnights.length) {
      return true;
    }

    return false;
  }

  static isBeingAttackedByBlackPieces(board: Board, cell: Coordinates): boolean {
    const attackingPieces = this.getAttackingPiece(board, cell);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board, cell);

    const blackAttackingPieces = attackingPieces.filter((attackingPiece) => attackingPiece.color === Colors.BLACK);
    const blackAttackingKnights = attackingPieceFromLPositions.filter(
      (attackingKnights) => attackingKnights.color === Colors.BLACK
    );

    if (blackAttackingPieces.length || blackAttackingKnights.length) {
      return true;
    }

    return false;
  }

  private static getAttackingPiece(board: Board, cell: Coordinates): Piece[] {
    const attackingPieces = Object.values(directionToCoordinates)
      .map((value) => {
        const tempCell = { ...cell };
        do {
          tempCell.row = tempCell.row + value.row;
          tempCell.col = tempCell.col + value.col;

          const piece = board.getSquare({ row: tempCell.row, col: tempCell.col }).piece;
          if (!piece) continue;

          if (isTryingToCaptureAlly(board, cell, tempCell)) return null;
          if (value.pieces.includes(piece.name)) return piece;

          continue;
        } while (tempCell.row > 0 && tempCell.col > 0 && tempCell.row < 7 && tempCell.col < 7);
      })
      .filter((piece) => piece) as Piece[];

    return attackingPieces;
  }

  private static getAttackingPieceFromLPositions(board: Board, cell: Coordinates): Piece[] {
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
        const cellInLPositiion = { row: cell.row + modifier.row, col: cell.col + modifier.col };
        const piece = board.getSquare({ row: cellInLPositiion.row, col: cellInLPositiion.col }).piece;

        if (!piece) return null;

        if (isTryingToCaptureAlly(board, cell, cellInLPositiion)) return null;

        if (piece.name === "n") return piece;

        return null;
      })
      .filter((piece) => piece) as Piece[];

    return attackingKnights;
  }
}
