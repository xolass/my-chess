import React from 'react';

interface IBoardCell {
  col: number;
  row: number;
}

function BoardCell(props: IBoardCell) {
  const { col, row } = props;

  function isCellWhite() {
    return (col + row) % 2;
  }

  return (
    <div style={{ height: '20px', width: '20px', backgroundColor: isCellWhite() ? 'yellow' : 'brown' }}>

    </div>
  );
}

export default BoardCell;