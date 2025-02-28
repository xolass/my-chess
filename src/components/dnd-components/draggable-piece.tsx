import { Piece } from "@/shared/classes/Piece";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

interface DraggableProps {
  piece: Piece;
  children: React.ReactNode;
}

export function DraggablePiece(props: DraggableProps) {
  const { piece, children } = props;
  const { coordinates, pieceLetter } = piece;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${piece.pieceLetter} ${coordinates.col}-${coordinates.row}`,
    data: { pieceLetter, coordinates },
  });

  const draggingStyle: CSSProperties = isDragging
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 999,
        pointerEvents: "none",
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      className="cursor-pointer size-full flex items-center justify-center"
      {...listeners}
      {...attributes}
      style={draggingStyle}
    >
      {children}
    </div>
  );
}
