import { CastleManager } from "@/shared/classes/CastleManager";
<<<<<<< Updated upstream
import { Game } from "@/shared/classes/Game";
import { Move } from "@/shared/types";

export class MoveValidator {
  public static validateMove(game: Game, move: Move): boolean {
    const { from, to } = move;
    const { board, currentPlayer, castleStatus } = game;
=======
import { Move } from "@/shared/types";
import { Turn } from "./Turn";

export class MoveValidator {
  public static validateMove(turn: Turn, move: Move): boolean {
    const { from, to } = move;
    const { board, currentPlayer, castleStatus } = turn;
>>>>>>> Stashed changes

    const startSquare = board.getSquare(from);
    const piece = startSquare.piece;

    if (!piece) return false;

    if (piece.color !== currentPlayer) return false;

<<<<<<< Updated upstream
    if (CastleManager.isCastleMove(from, to) && !CastleManager.canCastle(board, from, to, castleStatus)) {
      return false;
    }
=======
>>>>>>> Stashed changes

    if (!piece.isValidMove(board, to)) {
      console.info("not valid move");
      return false;
    }

    return true;
  }
}
