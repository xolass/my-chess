'use client'
import Board from "@/components/board/board";
import { useGameState } from "@/hooks/useGameState";
import { DndContext } from "@dnd-kit/core";
import { useId } from "react";

export default function Home() {
  const { movePiece, boardAsMatrix, setMovingPiece } = useGameState()
  const id = useId()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DndContext
        id={id}
        onDragStart={({ active }) => {
          const { current } = active.data
          if (!current) return

          setMovingPiece(current.piece, current.coordinates)
        }}
        onDragEnd={({ active, over }) => {
          if (!active.data.current) return
          if (!over?.data.current) return
          movePiece({
            col: active.data.current?.coordinates.col,
            row: active.data.current?.coordinates.row
          }, {
            col: over?.data.current?.col,
            row: over?.data.current?.row
          })
        }
        }>
        <Board board={boardAsMatrix} />
      </DndContext>
    </main >
  );
}
