"use client";
import Board from "@/components/board/board";
import BoardDndContext from "@/components/dnd-components/board-drag-context";
import { CheckmateModal } from "@/components/modals/checkmateModal";
import { DrawModal } from "@/components/modals/drawModal";
import { PromotionPopup } from "@/components/promotion-popup/promotionPopup";
import { useModal } from "@/hooks/useModal";
import { Colors } from "@/shared/types";
import { gameStore } from "@/stores/GameContext";
import { promotionStore } from "@/stores/PromotionContext";

export default function GamePage() {
  const game = gameStore(({ game }) => game);
  const modal = useModal();

  promotionStore.subscribe(({ positionToSpawnModal, isPromotionModalOpen }) => {
    if (isPromotionModalOpen) {
      if (!positionToSpawnModal) throw new Error("handlePromotingPiece not found");

      const colorToSpawnTo = positionToSpawnModal.row === 0 ? Colors.WHITE : Colors.BLACK;
      modal.open(<PromotionPopup colToSpawn={positionToSpawnModal.col} colorToSpawnTo={colorToSpawnTo} />);
    } else {
      modal.close();
    }
  });

  gameStore.subscribe(({ game }) => {
    const { insufficientMaterial, stalemate, checkmate, winner, halfMoveClockDraw } = game;

    if (halfMoveClockDraw) {
      modal.open(<DrawModal onClose={modal.close} onNewGame={modal.close} title="50 move rule draw" />);
    }
    if (insufficientMaterial) {
      modal.open(<DrawModal onClose={modal.close} onNewGame={modal.close} title="Insufficient material" />);
    }
    if (stalemate) {
      modal.open(<DrawModal onClose={modal.close} onNewGame={modal.close} title="Stalemate" />);
    }
    if (checkmate) {
      if (!winner) throw new Error("winner not found");
      modal.open(<CheckmateModal winner={winner} />);
    }
  });

  return (
    <main className="m-auto flex h-screen flex-col items-center justify-between p-24">
      <BoardDndContext>
        <Board board={game.board} />
      </BoardDndContext>
    </main>
  );
}
