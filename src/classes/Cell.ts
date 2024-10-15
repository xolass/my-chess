import { directionToCoordinates, getPieceColor, isTryingToCaptureAlly } from "@/auxFunctions";
import { Knight } from "@/classes/Knight";
import { Board, Colors, Coordinates, PieceLetter } from "@/types";

export class Cell {
  private static getAttackingPiece(board: Board, cell: Coordinates): PieceLetter[] {
    const attackingPieces = Object.values(directionToCoordinates)
      .map((value) => {
        const tempCell = { ...cell };
        do {
          tempCell.row = tempCell.row + value.row;
          tempCell.col = tempCell.col + value.col;

          const piece = board[tempCell.row][tempCell.col];
          if (!piece) continue;

          if (isTryingToCaptureAlly(board, cell, tempCell)) return null;
          if (value.pieces.includes(piece)) return piece;

          continue;
        } while (tempCell.row > 0 && tempCell.col > 0 && tempCell.row < 7 && tempCell.col < 7);
      })
      .filter((piece) => piece) as PieceLetter[];

    return attackingPieces;
  }
  private static getAttackingPieceFromLPositions(board: Board, cell: Coordinates): PieceLetter[] {
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
        const piece = board[cellInLPositiion.row][cellInLPositiion.col];

        if (!piece) return null;

        if (isTryingToCaptureAlly(board, cell, cellInLPositiion)) return null;

        if (Knight.isKnight(piece)) return piece;

        return null;
      })
      .filter((piece) => piece) as PieceLetter[];

    return attackingKnights;
  }

  static isBeingAttackedByWhitePieces(board: Board, cell: Coordinates): boolean {
    const attackingPieces = this.getAttackingPiece(board, cell);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board, cell);

    const whiteAttackingPieces = attackingPieces.filter(
      (attackingPiece) => getPieceColor(attackingPiece) === Colors.WHITE
    );
    const whiteAttackingKnights = attackingPieceFromLPositions.filter(
      (attackingKnights) => getPieceColor(attackingKnights) === Colors.WHITE
    );

    if (whiteAttackingPieces.length || whiteAttackingKnights.length) {
      return true;
    }

    return false;
  }

  static isBeingAttackedByBlackPieces(board: Board, cell: Coordinates): boolean {
    const attackingPieces = this.getAttackingPiece(board, cell);
    const attackingPieceFromLPositions = this.getAttackingPieceFromLPositions(board, cell);

    const blackAttackingPieces = attackingPieces.filter(
      (attackingPiece) => getPieceColor(attackingPiece) === Colors.BLACK
    );
    const blackAttackingKnights = attackingPieceFromLPositions.filter(
      (attackingKnights) => getPieceColor(attackingKnights) === Colors.BLACK
    );

    if (blackAttackingPieces.length || blackAttackingKnights.length) {
      return true;
    }

    return false;
  }
}
