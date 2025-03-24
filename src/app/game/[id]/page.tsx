"use client";
import Board from "@/components/board/board";
import BoardDndContext from "@/components/dnd-components/board-drag-context";
import { CheckmateModal } from "@/components/modals/checkmateModal";
import { DrawModal } from "@/components/modals/drawModal";
import { useModal } from "@/hooks/useModal";
import { gameStore } from "@/stores/GameContext";

export default function GamePage() {
  const game = gameStore(({ game }) => game);

  const modal = useModal();

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
    <main className="m-auto flex h-screen w-[100vh] flex-col items-center justify-between p-24">
      <BoardDndContext>
        <Board board={game.board} />
      </BoardDndContext>
    </main>
  );
}
