import { CastleManager } from "@/controllers/classes/CastleManager";
import { EnPassantManager } from "@/controllers/classes/EnPassantManager";
import { Game } from "@/controllers/classes/Game";
import { Coordinates, MoveFlags } from "@/types";
import { nameClassRelation } from "@/utils";

export class MoveExecutor {
  static executeMove(game: Game, from: Coordinates, to: Coordinates, flags?: MoveFlags): boolean {
    const piece = game.board.getSquare(from).piece;
    if (!piece) throw new Error("Invalid move: no piece at this position.");

    if (CastleManager.isCastleMove(from, to)) {
      const isShortCastle = CastleManager.isShortCastle(from, to);
      CastleManager.performCastleMove(game.board, game.currentPlayer, isShortCastle);
    } else if (EnPassantManager.isEnPassant(piece, to, game.enPassantTargetSquare)) {
      EnPassantManager.executeEnPassant(game.board, from, to, game.currentPlayer);
    } else {
      this.performRegularMove(game, from, to, flags);
    }
    return true;
  }

  private static performRegularMove(game: Game, from: Coordinates, to: Coordinates, flags?: MoveFlags): void {
    const startSquare = game.board.getSquare(from);
    const endSquare = game.board.getSquare(to);
    const piece = startSquare.piece;
    if (!piece) return;
    if (flags?.promotion) {
      const PieceClass = nameClassRelation[flags.promotion.promotionPiece];
      endSquare.placePiece(new PieceClass(game.currentPlayer, to, flags.promotion.promotionPiece));
    } else {
      endSquare.placePiece(piece);
      piece.setPosition(to);
    }
    startSquare.removePiece();
  }
}
