import { Castle } from "@/controllers/classes/Castle";
import { EnPassant } from "@/controllers/classes/EnPassant";
import { Fen } from "@/controllers/classes/Fen";
import { Promotion } from "@/controllers/classes/Promotion";
import { useGameState } from "@/controllers/fenGameState";
import { setupGame } from "@/main";
import { useGameStore } from "@/stores/GameContext";
import { useCallback, useEffect } from "react";
import { Coordinates, MoveFlags, PromotionOptions } from "../types";

const { board, game } = setupGame();

export function useGameActions() {
  const { addToFenHistory, currentMovingPiece, currentFen, fenHistory } = useGameState();
  const setPromotionModalOpen = useGameStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = useGameStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = useGameStore((state) => state.setPositionToSpawnModal);
  const setBoard = useGameStore((state) => state.setBoard);

  useEffect(() => {
    console.log(fenHistory[fenHistory.length - 1]);
  }, [fenHistory]);

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

    const isEnPassant = EnPassant.isEnPassant(board, from, to);
    const isPromotion = Promotion.isPromotion(board, from, to);
    const isCastle = Castle.isCastleMove(from, to);

    const piece = board.getSquare(from)?.piece;
    if (!piece) return;

    if (isEnPassant) {
      flags.enPassant = true;
    }

    if (isPromotion) {
      const promotionPiece = await getPromotionPiece(to);

      flags.promotion = {
        promotionPiece,
      };
    }

    if (isCastle) {
      const isCastleValid = Castle.canCastle(board, from, to, currentFen.castleStatus);

      if (!isCastleValid) return;

      const isShortCastle = Castle.isShortCastle(from, to);

      game.castleMove(isShortCastle);
    } else {
      const isMoveValid = game.validateMove({ from, to, flags });

      if (!isMoveValid) return;

      game.makeMove({ from, to, flags });
    }

    if (piece.name === "p") {
      newFen.resetHalfMoveClock();
    }

    window.boardState = board.getLettersGrid();

    const fenPieces = Fen.fromBoard(board);

    newFen.switchTurns();
    newFen.setFenPieces(fenPieces);
    newFen.setEnPassantTargetSquare(newFen.enPassantTargetSquare);

    currentMovingPiece.current = undefined;
    addToFenHistory(newFen);
    setBoard(board);
  };

  return {
    onPieceDragStart,
    onPieceDragEnd,
  };
}
