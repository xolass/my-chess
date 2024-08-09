import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IBoardCell {
  col: number;
  row: number;
  children?: React.ReactNode
}

function BoardCell(props: IBoardCell) {
  const { col, row } = props;

  function isCellWhite() {
    return (col + row) % 2;
  }

  return (
    <div className={twMerge("size-12 flex justify-center items-center", isCellWhite() ? "bg-yellow-100" : "bg-yellow-900")}>
      {props.children}
    </div>
  );
}

export default BoardCell;