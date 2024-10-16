import { isSamePosition, isTurnOfPiece, movePiece, transformMatrixInFEN } from "@/auxFunctions";
import { Castle } from "@/classes/Castle";
import { Fen } from "@/classes/Fen";
import { King } from "@/classes/King";
import { Pawn } from "@/classes/Pawn";
import { Piece } from "@/classes/Piece";
import { useGameState } from "@/gameState";
import { useCallback, useEffect, useMemo } from "react";
import { Coordinates } from "../types";

export function useGameActions() {
  const { addToFenHistory, currentMovingPiece, currentFen, ...state } = useGameState();

  useEffect(() => {
    console.log(state.fenHistory[state.fenHistory.length - 1]);
  }, [state.fenHistory]);

  const boardAsMatrix = useMemo(() => currentFen.getMatrix(), [currentFen]);

  const onPieceDragStart = useCallback(
    (coordinates: Coordinates) => {
      currentMovingPiece.current = coordinates;
    },
    [currentMovingPiece]
  );

  const onPieceDragEnd = (from: Coordinates, to: Coordinates) => {
    if (!currentMovingPiece.current) return;
    const piece = boardAsMatrix[from.row][from.col];
    if (!piece) return;

    const newFen = new Fen(currentFen.fen);

    let board = structuredClone(boardAsMatrix);

    if (isSamePosition(from, to)) return;
    if (!isTurnOfPiece(currentFen.turn, piece)) return;

    // TODO: The king that cant be in check after the move, is the king from the player that is moving
    if (King.isKingInCheck(board, to)) {
      return;
    }

    if (Castle.isCastleMove(from, to) && Castle.canCastle(board, from, to, currentFen.castleStatus)) {
      Castle.castle(board, from, to);
    }
    // if (isPromotion()) {
    //   promotion();
    // } else
    else if (Pawn.isEnPassant(board, from, to) && Pawn.canEnPassant(to, currentFen.enPassantTargetSquare)) {
      board = Pawn.enPassant(board, from, to);
    } else if (Piece.isCapture(board, to) && Piece.canCapture(board, to, currentMovingPiece.current)) {
      board = Piece.capture(board, from, to);
      newFen.resetHalfMoveClock();
    } else if (Piece.isRegularMove(board, to) && Piece.canPieceMove(board, from, to)) {
      board = movePiece(board, from, to);
    } else {
      return;
    }

    if (Pawn.isPawn(piece)) {
      newFen.resetHalfMoveClock();
    }

    const fenPieces = transformMatrixInFEN(board);
    const enPassantTargetSquare = Pawn.getEnPassantTargetSquare(piece, from, to);

    newFen.switchTurns();
    newFen.setFenPieces(fenPieces);
    newFen.setEnPassantTargetSquare(enPassantTargetSquare);

    currentMovingPiece.current = undefined;
    window.boardState = newFen.getMatrix();
    addToFenHistory(newFen);
  };

  return {
    boardAsMatrix,
    onPieceDragStart,
    onPieceDragEnd,
  };
}
