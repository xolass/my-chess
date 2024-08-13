import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IBoardCell {
  col: number;
  row: number;
  children?: React.ReactNode
}

function BoardCell(props: IBoardCell) {
  const { col, row } = props;
  const { setNodeRef } = useDroppable({
    id: `${col} ${row}`,
    data: { col, row }
  });

  function isCellWhite() {
    return (col + row) % 2;
  }

  return (
    <div ref={setNodeRef} className={twMerge("size-12 flex justify-center items-center", isCellWhite() ? "bg-yellow-100" : "bg-yellow-900")}>
      {props.children}
    </div>
  );
}

export default React.memo(BoardCell);