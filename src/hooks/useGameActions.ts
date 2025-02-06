import { Promotion } from "@/controllers/classes/Promotion";
import { setupGame } from "@/main";
import { useGameStore } from "@/stores/GameContext";
import { useCallback, useEffect } from "react";
import { Coordinates, MoveFlags, PromotionOptions } from "../types";
import { useGameState } from "./useFenGame";

const { game } = setupGame();
const { board } = game;

export function useGameActions() {
  const { addToFenHistory, currentMovingPiece, fenHistory } = useGameState();
  const setPromotionModalOpen = useGameStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = useGameStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = useGameStore((state) => state.setPositionToSpawnModal);
  const setGame = useGameStore((state) => state.setGame);

  useEffect(() => {
    console.log(fenHistory.map(({ fen }) => fen));
  }, [fenHistory]);

  const onPieceDragStart = useCallback(
    (coordinates: Coordinates) => {
      currentMovingPiece.current = coordinates;
    },
    [currentMovingPiece]
  );

  async function getPromotionPiece(coordinatesToRenderModalOn: Coordinates): Promise<PromotionOptions | null> {
    return new Promise((resolve) => {
      setPromotionModalOpen(true);
      setPositionToSpawnModal(coordinatesToRenderModalOn);

      setHandlePromotingPiece((piece: PromotionOptions | null) => {
        setPromotionModalOpen(false);
        return resolve(piece);
      });
    });
  }

  const onPieceDragEnd = async (from: Coordinates, to: Coordinates) => {
    const flags: MoveFlags = {};

    const piece = board.getSquare(from)?.piece;
    if (!piece) return;

    const isLegalMove = piece.legalMoves.find(({ row, col }) => row === to.row && col === to.col);

    if (!isLegalMove) return;

    const isPromotion = Promotion.isPromotion(board, from, to);

    if (isPromotion) {
      const promotionPiece = await getPromotionPiece(to);

      if (!promotionPiece) return;

      flags.promotion = {
        promotionPiece,
      };
    }

    game.makeMove({ from, to, flags });
    game.calculateLegalMoves();

    window.boardState = board.getLettersGrid();
    window.game = game;

    currentMovingPiece.current = undefined;

    addToFenHistory(game.toFen());
    setGame(game);
  };

  return {
    onPieceDragStart,
    onPieceDragEnd,
  };
}
