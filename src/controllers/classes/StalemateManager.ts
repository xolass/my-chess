import { Board } from "@/controllers/classes/Board";
import { GameUtils } from "@/controllers/classes/GameUtils";
import { Colors } from "@/types";

export class StalemateManager {
  static isStalemate(board: Board, currentPlayer: Colors) {
    const pieces = board.getPieces(currentPlayer);

    const totalLegalMoves = pieces.reduce((prevValue, piece) => {
      return prevValue + piece.legalMoves.length;
    }, 0);

    if (totalLegalMoves === 0) {
      const [king] = board.getPiecesOfAKind("k", currentPlayer);
      if (!king) return false;

      if (!GameUtils.isPieceBeingAttacked(board, king)) {
        return true;
      }
    }

    return false;
  }
}
