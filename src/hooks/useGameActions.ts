import { isSamePosition, isTurnOfPiece, transformMatrixInFEN } from "@/controllers/auxFunctions";
import { Castle } from "@/controllers/classes/Castle";
import { Fen } from "@/controllers/classes/Fen";
import { King } from "@/controllers/classes/King";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Pawn } from "@/controllers/classes/Pawn";
import { Piece } from "@/controllers/classes/Piece";
import { Promotion } from "@/controllers/classes/Promotion";
import { useGameState } from "@/controllers/gameState";
import { initGame } from "@/main";
import { useGameStore } from "@/stores/GameContext";
import { useCallback, useEffect, useMemo } from "react";
import { Cell, Coordinates, MoveFlags, PromotionOptions } from "../types";

export function useGameActions() {
  const { addToFenHistory, currentMovingPiece, currentFen, fenHistory } = useGameState();
  const setPromotionModalOpen = useGameStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = useGameStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = useGameStore((state) => state.setPositionToSpawnModal);

  const { board, game } = initGame();

  useEffect(() => {
    console.log(fenHistory[fenHistory.length - 1]);
  }, [fenHistory]);

  const boardAsMatrix = useMemo(() => currentFen.getMatrix(), [currentFen]);

  const onPieceDragStart = useCallback(
    (coordinates: Coordinates) => {
      currentMovingPiece.current = coordinates;
    },
    [currentMovingPiece]
  );

  async function getPromotionPiece(coordinatesToRenderModalOn: Coordinates): Promise<PromotionOptions> {
    return new Promise((resolve) => {
      setPromotionModalOpen(true);
      setPositionToSpawnModal(coordinatesToRenderModalOn);

      setHandlePromotingPiece((piece: PromotionOptions | null) => {
        if (!piece) return;
        setPromotionModalOpen(false);
        return resolve(piece);
      });
    });
  }

  const onPieceDragEnd = async (from: Coordinates, to: Coordinates) => {
    const newFen = new Fen(currentFen.fen);
    const flags: MoveFlags = {};

    const isEnPassant = Pawn.isEnPassant(board, from, to);
    const isPromotion = Promotion.isPromotion(board, from, to);
    const isCastle = Castle.isCastleMove(from, to);

    if (isEnPassant) {
      const enPassantTargetSquare = MoveNotation.toCoordinate(newFen.enPassantTargetSquare as Cell);

      flags.enPassant = {
        enPassantTargetSquare,
      };
    }

    if (isPromotion) {
      const promotionPiece = await getPromotionPiece(to);

      flags.promotion = {
        isPromotion: true,
        promotionPiece,
      };
    }

    if (isCastle) {
      if (Castle.canCastle(board, from, to, currentFen.castleStatus)) {
      flags.castle = {
        isShortCastle: Castle.isShortCastle(from, to),
        isLongCastle: Castle.isLongCastle(from, to),
        color: currentFen.turn,
      };
    }

    game.makeMove({from, to, flags});
    if (!currentMovingPiece.current) return;
    const piece = boardAsMatrix[from.row][from.col];
    if (!piece) return;

    if (isSamePosition(from, to)) return;
    if (!isTurnOfPiece(currentFen.turn, piece)) return;

    if (King.isKingInCheck(board, to)) {
      return;
    }

    if (Castle.isCastleMove(from, to) && Castle.canCastle(board, from, to, currentFen.castleStatus)) {
      Castle.castle(board, from, to);
    } else if (Promotion.isPromotion(board, from, to)) {
    } else if (Pawn.isEnPassant(board, from, to) && Pawn.canEnPassant(to, currentFen.enPassantTargetSquare)) {
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
