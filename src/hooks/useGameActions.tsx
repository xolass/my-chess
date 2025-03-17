import { setupGame } from "@/main";
import { LegalMovesManager } from "@/shared/classes/LegalMovesManager";
import { PromotionManager } from "@/shared/classes/PromotionManager";
import { Coordinates, MoveFlags, PromotionOptions } from "@/shared/types";
import { getOppositeColor, isCoordinateEqual } from "@/shared/utils";
import { gameStore } from "@/stores/GameContext";
import { useMoveStore } from "@/stores/MoveContext";
import { usePromotionStore } from "@/stores/PromotionContext";

const { game } = setupGame();
const { board } = game;

export function useGameActions() {
  const setPromotionModalOpen = usePromotionStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = usePromotionStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = usePromotionStore((state) => state.setPositionToSpawnModal);

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

    window.boardState = board.getLettersGrid();
    window.game = game;

    gameStore.setState({ game });
  };

  return {
    pieceDrag,
    pieceDragRelease,
    resetMovingPiece,
  };
}
