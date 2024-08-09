'use client'
import React, { useRef } from 'react';
import BoardCell from './cell';
import { getBoardAsMatrix } from '../../state';
import { PieceComponent } from './piece';


function Board() {
  const coordinates = useRef(getBoardAsMatrix());

  return (
    <div className='flex flex-col'>
      {coordinates.current.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='flex flex-row'>
            {row.map((piece, colIndex) => (
              <BoardCell key={colIndex} row={rowIndex} col={colIndex}>
                <PieceComponent piece={piece} />
              </BoardCell>))}
          </div>
        )
      })}
    </div>
  );
}

export default Board;