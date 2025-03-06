"use client";
import BoardDndContext from "@/components/dnd-components/board-drag-context";
import { CheckmateModal } from "@/components/modals/checkmateModal";
import { StalemateModal } from "@/components/modals/stalemateModal";
import { gameEventEmitter } from "@/eventEmitter";
import { useModal } from "@/hooks/useModal";
import { Colors } from "@/shared/types";
import { useEffect } from "react";

export default function GamePage() {
  const modal = useModal();

  useEffect(() => {
    function handleStalemate() {
      modal.open(<StalemateModal onClose={modal.close} onNewGame={modal.close} />);
    }

    function handleCheckmate(winner: Colors) {
      modal.open(<CheckmateModal winner={winner} />);
    }

    gameEventEmitter.on("stalemate", handleStalemate);
    gameEventEmitter.on("checkmate", handleCheckmate);

    return () => {
      gameEventEmitter.off("stalemate", handleStalemate);
      gameEventEmitter.off("checkmate", handleCheckmate);
    };
  }, [modal]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BoardDndContext />
    </main>
  );
}
