import { Piece } from "@/shared/classes/Piece";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { twMerge } from "tailwind-merge";

interface DraggableProps {
  piece: Piece;
  children: React.ReactNode;
}

export function DraggablePiece(props: DraggableProps) {
  const { piece, children } = props;
  const { coordinates, pieceLetter } = piece;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${piece.pieceLetter} ${coordinates.col}-${coordinates.row}`,
    data: { pieceLetter, coordinates },
  });

  return (
    <>
      {isDragging && <DragOverlay className="pointer-events-none">{children}</DragOverlay>}
      <div
        ref={setNodeRef}
        className={twMerge("cursor-pointer size-full flex items-center justify-center", isDragging && "opacity-50")}
        {...listeners}
        {...attributes}
      >
        {children}
      </div>
    </>
  );
}
