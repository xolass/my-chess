import React, { useRef } from 'react';
import BoardCell from './cell';

function Board() {
  const BOARD_SIZE = 8;
  const coordinates = useRef(Array(BOARD_SIZE).map(() => Array(BOARD_SIZE)));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {coordinates.current.map((row, rowIndex) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {row.map((_, colIndex) => {
              console.log('df ')
              return (
                <BoardCell row={rowIndex} col={colIndex} />
              );
            })}
          </div>
        )
      })}
    </div>
  );
}

export default Board;