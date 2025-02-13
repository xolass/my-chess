import { Board } from "@/shared/classes/Board";
import { CastleManager } from "@/shared/classes/CastleManager";
import { Colors, FenCastle, Move } from "@/shared/types";

export class MoveValidator {
  static isValidMove(board: Board, move: Move, currentPlayer: Colors, castleStatus: FenCastle): boolean {
    const startSquare = board.getSquare(move.from);
    const piece = startSquare.piece;

    if (!piece || piece.color !== currentPlayer) {
      console.info("Invalid move: Not player's turn or no piece found.");
      return false;
    }

    if (
      CastleManager.isCastleMove(move.from, move.to) &&
      !CastleManager.canCastle(board, move.from, move.to, castleStatus)
    ) {
      return false;
    }

    return piece.isValidMove(board, move.to);
  }
}
