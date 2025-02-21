"use client";
import Board from "@/components/board/board";
import { useGameActions } from "@/hooks/useGameActions";
import { useGameStore } from "@/stores/GameContext";
import { DndContext } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useId } from "react";

export default function Home() {
  const { pieceClick, pieceRelease, resetMovingPiece } = useGameActions();
  const game = useGameStore((state) => state.game);

  const id = useId();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DndContext
        id={id}
        modifiers={[snapCenterToCursor]}
        onDragStart={({ active }) => {
          const { current } = active.data;
          if (!current) return;
          pieceClick(current.coordinates);
        }}
        onDragEnd={({ active, over }) => {
          if (!active.data.current) return;
          if (!over?.data.current) return;
          pieceRelease(active.data.current.coordinates, over.data.current.coordinates);
        }}
        onDragAbort={resetMovingPiece}
        onDragCancel={resetMovingPiece}
      >
        <Board board={game.board} />
      </DndContext>
    </main>
  );
}
