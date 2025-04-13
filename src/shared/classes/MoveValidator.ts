import { Move } from "@/shared/classes/Move";
import { Turn } from "./Turn";

export class MoveValidator {
  public static validateMove(turn: Turn, move: Move): boolean {
    const { from, to } = move;
    const { board, currentPlayer } = turn;

    const startSquare = board.getSquare(from);
    const piece = startSquare.piece;

    if (!piece) return false;

    if (piece.color !== currentPlayer) return false;

    if (!piece.isValidMove(board, to)) {
      console.info("not valid move");
      return false;
    }

    return true;
  }
}
