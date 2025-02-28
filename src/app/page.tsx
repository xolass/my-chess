"use client";
import BoardDndContext from "@/components/dnd-components/board-drag-context";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BoardDndContext />
    </main>
  );
}
