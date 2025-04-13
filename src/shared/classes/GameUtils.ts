import { Board } from "@/shared/classes/Board";
import { Move } from "@/shared/classes/Move";
import { Piece } from "@/shared/classes/Piece";
import { Colors, Coordinates } from "@/shared/types";
import { MoveExecutor } from "./MoveExecutor";
import { Turn } from "./Turn";

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

  static doesMoveRemoveCheck(turn: Turn, move: Move): boolean {
    const clonedTurn = turn.clone();
    // when we makeMove it dont change
    const playerLeavingCheck = clonedTurn.currentPlayer;

    MoveExecutor.executeMove(clonedTurn, move.from, move.to, move.flags);

    const [king] = clonedTurn.board.getPiecesOfAKind("k", playerLeavingCheck);
    if (!king) return false;

    const isKingStillBeingAttacked = GameUtils.isPieceBeingAttacked(clonedTurn.board, king);

    // Check if the king is still in check after the move
    return !isKingStillBeingAttacked;
  }
}
