import { gameEventEmitter } from "@/eventEmitter";
import { setupGame } from "@/main";
import { CheckmateManager } from "@/shared/classes/CheckmateManager";
import { PromotionManager } from "@/shared/classes/PromotionManager";
import { StalemateManager } from "@/shared/classes/StalemateManager";
import { Coordinates, MoveFlags, PromotionOptions } from "@/shared/types";
import { getOppositeColor, isCoordinateEqual } from "@/shared/utils";
import { useGameStore } from "@/stores/GameContext";
import { useMoveStore } from "@/stores/MoveContext";
import { usePromotionStore } from "@/stores/PromotionContext";

const { game } = setupGame();
const { board } = game;

export function useGameActions() {
  const setPromotionModalOpen = usePromotionStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = usePromotionStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = usePromotionStore((state) => state.setPositionToSpawnModal);

  const setGame = useGameStore((state) => state.setGame);
  const addToGameHistory = useGameStore(({ addToGameHistory }) => addToGameHistory);

  const setMovingPiece = useMoveStore(({ setMovingPiece }) => setMovingPiece);

  function getPromotionPiece(coordinatesToRenderModalOn: Coordinates): Promise<PromotionOptions | null> {
    return new Promise((resolve) => {
      setPromotionModalOpen(true);
      setPositionToSpawnModal(coordinatesToRenderModalOn);

      setHandlePromotingPiece((piece: PromotionOptions | null) => {
        setPromotionModalOpen(false);
        return resolve(piece);
      });
    });
  }

  const resetMovingPiece = () => {
    setMovingPiece(undefined);
  };

  const pieceDrag = (coordinates: Coordinates) => {
    const piece = board.getSquare(coordinates).piece;
    if (!piece) return;

    piece.getAllDirectionMoves(board);
    setMovingPiece(piece);
  };

  const pieceDragRelease = async (from: Coordinates, to: Coordinates) => {
    const flags: MoveFlags = {};

    if (!isCoordinateEqual(from, to)) {
      resetMovingPiece();
    }

    const piece = board.getSquare(from)?.piece;
    if (!piece) return;

    if (game.currentPlayer !== piece.color) return;

    const isLegalMove = piece.legalMoves.find((pieceCoordinate) => isCoordinateEqual(pieceCoordinate, to));

    if (!isLegalMove) return;

    const isPromotion = PromotionManager.isPromotion(board, from, to);

    if (isPromotion) {
      const promotionPiece = await getPromotionPiece(to);

      if (!promotionPiece) return;

      flags.promotion = {
        promotionPiece,
      };
    }

    game.makeMove({ from, to, flags }); // this passes the turn

    game.calculateLegalMoves(); // for the current player
    game.clearLastTurnLegalMoves(); // for the previous player
    game.calculatePreMoves(); // for the previous player

    window.boardState = board.getLettersGrid();
    window.game = game;

    addToGameHistory(game.toFen());
    setGame(game);

    if (CheckmateManager.isCheckMate(game.board, game.currentPlayer)) {
      const winner = getOppositeColor(game.currentPlayer);

      gameEventEmitter.emit("checkmate", winner);
    }
    if (StalemateManager.isStalemate(game.board, game.currentPlayer)) {
      gameEventEmitter.emit("stalemate");
    }
  };

  return {
    pieceDrag,
    pieceDragRelease,
    resetMovingPiece,
  };
}
