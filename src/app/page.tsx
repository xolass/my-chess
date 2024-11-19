"use client";
import Board from "@/components/board/board";
import { useGameActions } from "@/hooks/useGameActions";
import { useGameStore } from "@/stores/GameContext";
import { DndContext } from "@dnd-kit/core";
import { useId } from "react";

export default function Home() {
  const { onPieceDragEnd, onPieceDragStart } = useGameActions();
  const board = useGameStore((state) => state.board);

  const id = useId();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DndContext
        id={id}
        onDragStart={({ active }) => {
          const { current } = active.data;
          if (!current) return;
          onPieceDragStart(current.coordinates);
        }}
        onDragEnd={({ active, over }) => {
          if (!active.data.current) return;
          if (!over?.data.current) return;
          onPieceDragEnd(active.data.current.coordinates, over.data.current.coordinates);
        }}
      >
        <Board board={board} />
      </DndContext>
    </main>
  );
}
