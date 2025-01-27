import { Fen } from "@/controllers/classes/Fen";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Promotion } from "@/controllers/classes/Promotion";
import { setupGame } from "@/main";
import { useGameStore } from "@/stores/GameContext";
import { useCallback, useEffect } from "react";
import { Coordinates, MoveFlags, PromotionOptions } from "../types";
import { useGameState } from "./useFenGame";

const { game } = setupGame();
const { board } = game;

export function useGameActions() {
  const { addToFenHistory, currentMovingPiece, currentFen, fenHistory } = useGameState();
  const setPromotionModalOpen = useGameStore((state) => state.setPromotionModalOpen);
  const setHandlePromotingPiece = useGameStore((state) => state.setHandlePromotingPiece);
  const setPositionToSpawnModal = useGameStore((state) => state.setPositionToSpawnModal);
  const setGame = useGameStore((state) => state.setGame);

  useEffect(() => {
    console.log(fenHistory[fenHistory.length - 1]);
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
    const newFen = new Fen(currentFen.fen);
    const flags: MoveFlags = {};

    const isPromotion = Promotion.isPromotion(board, from, to);

    const piece = board.getSquare(from)?.piece;
    if (!piece) return;
    if (piece.color !== game.currentPlayer) return;

    if (isPromotion) {
      const promotionPiece = await getPromotionPiece(to);

      if (!promotionPiece) return;

      flags.promotion = {
        promotionPiece,
      };
    }

    const isLegalMove = piece.legalMoves.find(({ row, col }) => row === to.row && col === to.col);

    if (!isLegalMove) return;

    game.makeMove({ from, to, flags });
    game.calculateLegalMoves();

    if (piece.name === "p") {
      newFen.resetHalfMoveClock();
    }

    window.boardState = board.getLettersGrid();

    const fenPieces = Fen.fromBoard(board);

    newFen.switchTurns();
    newFen.setFenPieces(fenPieces);
    newFen.setEnPassantTargetSquare(
      newFen.enPassantTargetSquare ? MoveNotation.toCell(newFen.enPassantTargetSquare) : "-"
    );

    currentMovingPiece.current = undefined;
    addToFenHistory(newFen);
    setGame(game);
  };

  return {
    onPieceDragStart,
    onPieceDragEnd,
  };
}
