import { isSamePosition, isTurnOfPiece, movePiece, transformFenInMatrix, transformMatrixInFEN } from "@/auxFunctions";
import { Pawn } from "@/classes/Pawn";
import { Piece } from "@/classes/Piece";
import { useGameState } from "@/gameState";
import { useCallback, useEffect, useMemo } from "react";
import { Coordinates } from "../types";

export function useGameActions() {
  const { fenPieces, addToFenHistory, switchTurn, currentMovingPiece, ...state } = useGameState();

  useEffect(() => {
    console.log(state.fenHistory[state.fenHistory.length - 1]);
  }, [state.fenHistory]);

  const boardAsMatrix = useMemo(() => transformFenInMatrix(fenPieces), [fenPieces]);

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

    let board = structuredClone(boardAsMatrix);

    if (isSamePosition(from, to)) return;
    if (!isTurnOfPiece(state.turn, piece)) return;

    // if (isCastle()) {
    //   castle();
    // } else
    // if (isPromotion()) {
    //   promotion();
    // } else
    if (Pawn.isEnPassant(board, from, to) && Pawn.canEnPassant(to, state.enPassantTargetSquare)) {
      board = Pawn.enPassant(board, from, to);
    } else if (Piece.isCapture(board, to) && Piece.canCapture(board, to, currentMovingPiece.current)) {
      board = Piece.capture(board, from, to);
    } else if (Piece.isRegularMove(board, to) && Piece.canPieceMove(board, from, to)) {
      board = movePiece(board, from, to);
    } else {
      return;
    }

    // if (isCheck()) {
    //
    // }

    console.log({ board });
    const fenPieces = transformMatrixInFEN(board);
    const newTurn = switchTurn(state.turn);
    const enPassantTargetSquare = Pawn.getEnPassantTargetSquare(piece, from, to);

    currentMovingPiece.current = undefined;
    addToFenHistory(
      `${fenPieces} ${newTurn} ${state.castleStatus} ${enPassantTargetSquare} ${state.halfMoveClock} ${state.turnsCount}`
    );
  };

  return {
    boardAsMatrix,
    onPieceDragStart,
    onPieceDragEnd,
  };
}
