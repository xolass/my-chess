import { getPieceColor } from "@/controllers/auxFunctions";
import { Pawn } from "@/controllers/classes/Pawn";
import { Board, Colors, Coordinates, PieceLetter, PromotionOptions } from "@/types";

export class Promotion {
  static isPromotion(board: Board, from: Coordinates, to: Coordinates): boolean {
    const piece = board[from.row][from.col];
    if (!piece) return false;

    if (!Pawn.isPawn(piece)) return false;

    if (!Pawn.isPawnWayOfMoving(board, from, to)) return false;

    if (getPieceColor(piece) === Colors.WHITE) {
      if (to.row === 0) return true;
    }
    if (getPieceColor(piece) === Colors.BLACK) {
      if (to.row === 7) return true;
    }

    return false;
  }

  static promote(board: Board, from: Coordinates, to: Coordinates, promotionPiece: PromotionOptions): Board {
    const boardCopy = structuredClone(board);

    const piece = boardCopy[from.row][from.col];
    if (!piece) return boardCopy;

    const pieceColor = getPieceColor(piece);

    if (pieceColor === Colors.WHITE) {
      boardCopy[to.row][to.col] = promotionPiece.toUpperCase() as PieceLetter;
    } else if (pieceColor === Colors.BLACK) {
      boardCopy[to.row][to.col] = promotionPiece.toLowerCase() as PieceLetter;
    }

    boardCopy[from.row][from.col] = null;

    return boardCopy;
  }
}
