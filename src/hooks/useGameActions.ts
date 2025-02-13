import { setupGame } from "@/main";
import { CheckmateManager } from "@/shared/classes/CheckmateManager";
import { PromotionManager } from "@/shared/classes/PromotionManager";
import { StalemateManager } from "@/shared/classes/StalemateManager";
import { Coordinates, MoveFlags, PromotionOptions } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";
import { usePromotionStore } from "@/stores/PromotionContext";
import { useEffect } from "react";
import { useGameState } from "./useFenGame";
const { game } = setupGame();
const { board } = game;

export function useGameActions() {
  const { addToFenHistory, fenHistory } = useGameState();
  const setPromotionModalOpen = usePromotionStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = usePromotionStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = usePromotionStore((state) => state.setPositionToSpawnModal);
  const currentMovingPiece = useGameStore(({ currentMovingPiece }) => currentMovingPiece);
  const setCurrentMovingPiece = useGameStore(({ setCurrentMovingPiece }) => setCurrentMovingPiece);
  const setGame = useGameStore((state) => state.setGame);

  useEffect(() => {
    console.log(fenHistory.map(({ fen }) => fen));
  }, [fenHistory]);

  const onPieceDragStart = (coordinates: Coordinates) => {
    const piece = board.getSquare(coordinates).piece;
    if (!piece) return;

    if (piece === currentMovingPiece) {
      setCurrentMovingPiece(undefined);
    } else {
      setCurrentMovingPiece(piece);
    }
  };

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

    if (game.currentPlayer !== piece.color) return;

    const isLegalMove = piece.legalMoves.find(({ row, col }) => row === to.row && col === to.col);

    if (!isLegalMove) return;

    const isPromotion = PromotionManager.isPromotion(board, from, to);

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

    setCurrentMovingPiece(undefined);

    addToFenHistory(game.toFen());
    setGame(game);

    if (CheckmateManager.isCheckMate(game.board, game.currentPlayer)) {
      console.log("checkmate for " + game.currentPlayer);
    }
    if (StalemateManager.isStalemate(game.board, game.currentPlayer)) {
      console.log("stalemate for " + game.currentPlayer);
    }
  };

  return {
    onPieceDragStart,
    onPieceDragEnd,
  };
}
