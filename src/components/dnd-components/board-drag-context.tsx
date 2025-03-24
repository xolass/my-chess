"use client";
import { useGameActions } from "@/hooks/useGameActions";
import { PieceLetter } from "@/shared/types";
import { isPieceFromColor } from "@/shared/utils";
import { gameStore } from "@/stores/GameContext";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useId } from "react";

export default function BoardDndContext({ children }: { children: React.ReactNode }) {
  const { pieceDragRelease, resetMovingPiece, pieceDrag } = useGameActions();
  const { player: currentPlayer } = gameStore.getState();

  const id = useId();

  function isClickingOnOpponentPieceOnYourTurn(pieceLetter: PieceLetter) {
    if (isPieceFromColor(pieceLetter, currentPlayer)) {
      return true;
    }
    return false;
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
      bypassActivationConstraint(props) {
        const clickedPieceLetter = props.activeNode.data.current?.pieceLetter;

        return isClickingOnOpponentPieceOnYourTurn(clickedPieceLetter);
      },
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

  function handleDragCancel(e: DragCancelEvent) {
    // this runs when you are dragging a piece and select another one
    resetMovingPiece();
  }

  return (
    <DndContext
      id={id}
      sensors={sensors}
      modifiers={[snapCenterToCursor]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
    </DndContext>
  );
}
