import { Board } from "@/controllers/classes/Board";
import { Game } from "@/controllers/classes/Game";
import { Piece } from "@/controllers/classes/Piece";
import { Colors, Coordinates, Move } from "@/types";

export class GameUtils {
  static isPieceBeingAttacked(board: Board, piece?: Piece): boolean {
    if (!piece) return false;
    const square = board.getSquare(piece.coordinates);

    return piece.color === Colors.WHITE
      ? !!square.getBlackAttackingPieces(board).length
      : !!square.getWhiteAttackingPieces(board).length;
  }

  static isSquareAttacked(board: Board, coordinates: Coordinates, currentPlayer: Colors) {
    const square = board.getSquare(coordinates);

    if (currentPlayer === Colors.WHITE) return !!square.getBlackAttackingPieces(board).length;
    if (currentPlayer === Colors.BLACK) return !!square.getWhiteAttackingPieces(board).length;
  }

  static doesMoveRemoveCheck(game: Game, move: Move): boolean {
    const simulatedGame = game.clone();
    // when we makeMove it dont change
    const playerLeavingCheck = simulatedGame.currentPlayer;

    simulatedGame.makeMove({ from: move.from, to: move.to });

    const [king] = simulatedGame.board.getPiecesOfAKind("k", playerLeavingCheck);
    if (!king) return false;

    const isKingStillBeingAttacked = GameUtils.isPieceBeingAttacked(simulatedGame.board, king);

    // Check if the king is still in check after the move
    return !isKingStillBeingAttacked;
  }
}
