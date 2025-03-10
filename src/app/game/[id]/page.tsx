"use client";
import BoardDndContext from "@/components/dnd-components/board-drag-context";
import { CheckmateModal } from "@/components/modals/checkmateModal";
import { StalemateModal } from "@/components/modals/stalemateModal";
import { useModal } from "@/hooks/useModal";
import { gameStore } from "@/stores/GameContext";

export default function GamePage() {
  const modal = useModal();
  gameStore.subscribe(({ game }) => {
    const { insufficientMaterial, stalemate, checkmate, winner } = game;

    if (insufficientMaterial) {
      modal.open(<StalemateModal onClose={modal.close} onNewGame={modal.close} title="Insufficient material" />);
    }
    if (stalemate) {
      modal.open(<StalemateModal onClose={modal.close} onNewGame={modal.close} />);
    }
    if (checkmate) {
      if (!winner) throw new Error("winner not found");
      modal.open(<CheckmateModal winner={winner} />);
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BoardDndContext />
    </main>
  );
}
