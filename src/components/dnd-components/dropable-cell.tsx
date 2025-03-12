import { Square } from "@/shared/classes/Square";
import { useDroppable } from "@dnd-kit/core";

interface DroppableBoardCellProps {
  square: Square;
  children: React.ReactNode;
}

export function DroppableCell(props: DroppableBoardCellProps) {
  const { children, square } = props;
  const { coordinates } = square;
  const { row, col } = coordinates;
  const { setNodeRef } = useDroppable({
    id: `${col} ${row}`,
    data: { coordinates },
  });
  return <div className="size-full" ref={setNodeRef}>{children}</div>;
}
