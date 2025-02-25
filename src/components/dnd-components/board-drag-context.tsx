"use client";
import Board from "@/components/board/board";
import { useGameActions } from "@/hooks/useGameActions";
import { useGameStore } from "@/stores/GameContext";
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useId } from "react";

export default function BoardDndContext() {
  const { pieceDragRelease, resetMovingPiece, pieceDrag } = useGameActions();
  const game = useGameStore((state) => state.game);

  const id = useId();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // activationConstraint: {
      //   distance: 5,
      // },
      // bypassActivationConstraint(props) {
      //   console.log(props);
      //   return false;
      // },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    console.log("drag start");
    const { active } = event;
    const { current } = active.data;
    if (!current) return;
    pieceDrag(current.coordinates);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (!active.data.current) return;
    if (!over?.data.current) return;
    pieceDragRelease(active.data.current.coordinates, over.data.current.coordinates);
  }

  return (
    <DndContext
      id={id}
      sensors={sensors}
      modifiers={[snapCenterToCursor]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragAbort={resetMovingPiece}
      onDragCancel={resetMovingPiece}
    >
      <Board board={game.board} />
    </DndContext>
  );
}
