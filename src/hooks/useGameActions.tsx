import { setupGame } from "@/main";
import { King } from "@/shared/classes/pieces/King";
import { PromotionManager } from "@/shared/classes/PromotionManager";
import { Coordinates, MoveFlags, PromotionOptions } from "@/shared/types";
import { isCoordinateEqual } from "@/shared/utils";
import { gameStore } from "@/stores/GameContext";
import { useMoveStore } from "@/stores/MoveContext";
import { promotionStore } from "@/stores/PromotionContext";

const { game } = setupGame();
const { board } = game;

export function useGameActions() {
  const setMovingPiece = useMoveStore(({ setMovingPiece }) => setMovingPiece);

  function getPromotionPiece(coordinatesToRenderModalOn: Coordinates): Promise<PromotionOptions | null> {
    function resetPromotion() {
      promotionStore.setState(promotionStore.getInitialState);
    }

    return new Promise((resolve) => {
      promotionStore.setState(() => ({
        isPromotionModalOpen: true,
        positionToSpawnModal: coordinatesToRenderModalOn,
        handlePromotingPiece: (piece: PromotionOptions | null) => {
          resetPromotion();
          return resolve(piece);
        },
      }));
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

    const possibleLegalMoves = piece.legalMoves;

    if (piece instanceof King) {
      possibleLegalMoves.push(...piece.castleLegalMoves);
    }

    const isLegalMove = possibleLegalMoves.find((pieceMove) => isCoordinateEqual(pieceMove.to, to));

    if (!isLegalMove) return;

    const isPromotion = PromotionManager.isPromotion(board, from, to);

    console.log({ isPromotion });

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
