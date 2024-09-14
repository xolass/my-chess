import {
  canCapture,
  canEnPassant,
  canPieceMove,
  capture,
  enPassant,
  isCapture,
  isEnPassant,
  isRegularMove,
  isSamePosition,
  movePiece,
  transformFenInMatrix,
} from "@/auxFunctions";
import { useGameState } from "@/gameState";
import { useCallback, useMemo } from "react";
import { Coordinates } from "../types";

export function useGameActions() {
  const { fenPieces, addToFenHistory, switchTurn, currentMovingPiece, ...state } = useGameState();

  const boardAsMatrix = useMemo(() => transformFenInMatrix(fenPieces), [fenPieces]);

  const onPieceDragStart = useCallback(
    (coordinates: Coordinates) => {
      currentMovingPiece.current = coordinates;
    },
    [currentMovingPiece]
  );

  const onPieceDragEnd = useCallback(
    (from: Coordinates, to: Coordinates) => {
      if (!currentMovingPiece.current) return;
      const piece = boardAsMatrix[from.row][from.col];
      if (!piece) return;

      let board = structuredClone(boardAsMatrix);

      if (isSamePosition(from, to)) return;

      if (isCapture(board, to)) {
        if (canCapture(board, to, currentMovingPiece.current)) {
          board = capture(board, from, to);
        }
      } else if (isEnPassant(board, from, to)) {
        if (canEnPassant(to, state.enPassantTargetSquare)) {
          board = enPassant(board, from, to);
        }
      } else if (isRegularMove(board, to)) {
        if (canPieceMove(board, from, to)) {
          board = movePiece(board, from, to);
        }
      }
      // if (isCastle()) {
      //   castle();
      // }
      // if (isPromotion()) {
      //   promotion();
      // }
      // if (isCheck()) {
      //
      // }

      currentMovingPiece.current = undefined;
      // addToFenHistory("pieces whoseTurn castleStatus enPassantTargetSquare halfMoveClock turnsCount");
    },
    [boardAsMatrix, currentMovingPiece, state.enPassantTargetSquare]
  );

  //   const movePiece = useCallback(
  //     (from: Coordinates, to: Coordinates) => {
  //       const tempBoard = structuredClone(boardAsMatrix);
  //       const piece = tempBoard[from.row][from.col];
  //       if (!piece) return;
  //
  //       console.log(piece);
  //       if (!canPieceMove(boardAsMatrix, from, to)) return;
  //
  //       tempBoard[from.row][from.col] = null;
  //       tempBoard[to.row][to.col] = piece;
  //
  //       const piecesSection = transformMatrixInFEN(tempBoard);
  //       const newTurn = switchTurn(state.turn);
  //       const enPassantTargetSquare = Pawn.isDoubleMoving(piece, from, to);
  //
  //       // add logic of en passant, castling, halfMoveClock, turnsCount
  //       const fen: FenType = `${piecesSection} ${newTurn} ${state.castleStatus} ${enPassantTargetSquare} ${state.halfMoveClock} ${state.turnsCount}`;
  //       console.log(fen);
  //
  //       addToFenHistory(fen);
  //       currentMovingPiece.current = undefined;
  //     },
  //     [boardAsMatrix, currentMovingPiece, addToFenHistory, switchTurn, state]
  //   );

  return {
    boardAsMatrix,
    onPieceDragStart,
    onPieceDragEnd,
  };
}
