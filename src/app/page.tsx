"use client";
import Board from "@/components/board/board";
import { useGameActions } from "@/hooks/useGameActions";
import { DndContext } from "@dnd-kit/core";
import { useId } from "react";
export default function Home() {
  const { onPieceDragEnd, boardAsMatrix, onPieceDragStart } = useGameActions();
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
        <Board board={boardAsMatrix} />
      </DndContext>
    </main>
  );
}
