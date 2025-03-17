import { CastleManager } from "@/shared/classes/CastleManager";
import { EnPassantManager } from "@/shared/classes/EnPassantManager";
import { Coordinates, MoveFlags } from "@/shared/types";
import { nameClassRelation } from "@/shared/utils";
import { Turn } from "./Turn";

export class MoveExecutor {
  static executeMove(turn: Turn, from: Coordinates, to: Coordinates, flags?: MoveFlags): boolean {
    const piece = turn.board.getSquare(from).piece;
    if (!piece) throw new Error("Invalid move: no piece at this position.");

    if (CastleManager.isCastleMove(from, to)) {
      const isShortCastle = CastleManager.isShortCastle(from, to);
      CastleManager.performCastleMove(turn.board, turn.currentPlayer, isShortCastle);
    } else if (EnPassantManager.isEnPassant(piece, to, turn.enPassantTargetSquare)) {
      EnPassantManager.executeEnPassant(turn.board, from, to, turn.currentPlayer);
    } else {
      this.performRegularMove(turn, from, to, flags);
    }
    return true;
  }

  private static performRegularMove(turn: Turn, from: Coordinates, to: Coordinates, flags?: MoveFlags): void {
    const startSquare = turn.board.getSquare(from);
    const endSquare = turn.board.getSquare(to);
    const piece = startSquare.piece;
    if (!piece) return;
    if (flags?.promotion) {
      const PieceClass = nameClassRelation[flags.promotion.promotionPiece];
      endSquare.placePiece(new PieceClass(turn.currentPlayer, to, flags.promotion.promotionPiece));
    } else {
      endSquare.placePiece(piece);
      piece.setPosition(to);
    }
    startSquare.removePiece();
  }
}
