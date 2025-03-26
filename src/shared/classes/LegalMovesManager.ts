import { EnPassantManager } from "@/shared/classes/EnPassantManager";
import { GameUtils } from "@/shared/classes/GameUtils";
import { MoveValidator } from "@/shared/classes/MoveValidator";
import { King } from "@/shared/classes/pieces/King";
import { Pawn } from "@/shared/classes/pieces/Pawn";
import { Move } from "@/shared/types";
import { getOppositeColor } from "@/shared/utils";
import { Turn } from "./Turn";

export class LegalMovesManager {
  public static calculateLegalMoves(turn: Turn) {
    const { board, currentPlayer, enPassantTargetSquare, castleStatus } = turn;
    const KING_LETTER = "k";
    const colorPieces = board.getPieces(currentPlayer);

    const [king] = board.getPiecesOfAKind(KING_LETTER, currentPlayer);
    const isKingInCheck = GameUtils.isPieceBeingAttacked(board, king);
    let legalMoveCounter = 0;

    const legalMoves = colorPieces.map((piece) => {
      const isKingMoving = piece.name === KING_LETTER;
      const possibleMoves = piece.calculatePossibleMoves(board);

      // Filter moves that are valid and don't leave the king in check
      const validLegalMoves = possibleMoves.filter((to) => {
        const move: Move = { from: piece.coordinates, to };

        if (!MoveValidator.validateMove(turn, move)) return false;

        // If the king is in check, only allow moves that remove the check
        if (isKingInCheck && !GameUtils.doesMoveRemoveCheck(turn, move)) return false;
        if (isKingMoving && GameUtils.isSquareAttacked(board, to, currentPlayer)) return false;

        return true;
      });

      if (piece instanceof Pawn) {
        const enPassantLegalMoves = EnPassantManager.getEnPassantLegalMoves(
          board,
          piece,
          currentPlayer,
          enPassantTargetSquare
        );

        validLegalMoves.push(...enPassantLegalMoves);
      }

      if (piece instanceof King) {
        const kingCastleMoves = piece.getCastlePossibleMoves(board, castleStatus);

        validLegalMoves.push(...kingCastleMoves);
      }

      legalMoveCounter += validLegalMoves.length;
      piece.legalMoves = validLegalMoves;
      return { piece: piece.pieceLetter, validLegalMoves };
    });

    return legalMoves;
  }

  public static calculatePreMoves(turn: Turn) {
    const { board, currentPlayer, castleStatus } = turn;
    const colorPieces = board.getPieces(currentPlayer);
    const oppositeColorPieces = board.getPieces(getOppositeColor(currentPlayer));

    const allPieces = [...oppositeColorPieces, ...colorPieces];

    allPieces.forEach((piece) => {
      const possiblePreMoves = piece.getAllDirectionMoves(board);

      if (piece instanceof King) {
        const kingCastleMoves = piece.getCastlePossibleMoves(board, castleStatus);

        possiblePreMoves.push(...kingCastleMoves);
      }

      piece.preMoves = possiblePreMoves;
    });
  }

  public static clearLastTurnLegalMoves(turn: Turn) {
    const { board, currentPlayer } = turn;
    const lastTurnColorPieces = board.getPieces(getOppositeColor(currentPlayer));

    lastTurnColorPieces.forEach((piece) => {
      piece.legalMoves = [];
    });
  }
}
