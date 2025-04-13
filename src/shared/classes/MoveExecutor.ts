import { Board } from "@/shared/classes/Board";
import { CastleManager } from "@/shared/classes/CastleManager";
import { EnPassantManager } from "@/shared/classes/EnPassantManager";
import { Coordinates, MoveFlags, Promotion } from "@/shared/types";
import { nameClassRelation } from "@/shared/utils";
import { Turn } from "./Turn";

export class MoveExecutor {
  static executeMove(turn: Turn, from: Coordinates, to: Coordinates, flags?: MoveFlags): boolean {
    const { board } = turn;
    const piece = board.getSquare(from).piece;
    if (!piece) throw new Error("Invalid move: no piece at this position.");

    console.log("castleMove", from, to);
    if (CastleManager.isCastleMove(from, to)) {
      console.log("castleMove");
      const isShortCastle = CastleManager.isShortCastle(from, to);
      CastleManager.performCastleMove(board, turn.currentPlayer, isShortCastle);
    } else if (EnPassantManager.isEnPassant(piece, to, turn.enPassantTargetSquare)) {
      EnPassantManager.executeEnPassant(board, from, to, turn.currentPlayer);
    } else if (flags?.promotion) {
      this.promotePiece(turn, from, to, flags.promotion);
    } else {
      this.moveThePieces(board, from, to);
    }
    return true;
  }

  private static moveThePieces(board: Board, from: Coordinates, to: Coordinates): void {
    const startSquare = board.getSquare(from);
    const endSquare = board.getSquare(to);
    const piece = startSquare.piece;
    if (!piece) return;

    endSquare.placePiece(piece);
    piece.setPosition(to);
    startSquare.removePiece();
  }

  private static promotePiece(turn: Turn, from: Coordinates, to: Coordinates, promotion: Promotion): void {
    const startSquare = turn.board.getSquare(from);
    const endSquare = turn.board.getSquare(to);
    const piece = startSquare.piece;
    if (!piece) return;

    const PieceClass = nameClassRelation[promotion.promotionPiece];

    endSquare.placePiece(new PieceClass(turn.currentPlayer, to, promotion.promotionPiece));
    startSquare.removePiece();
  }
}
