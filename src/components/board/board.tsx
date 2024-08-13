'use client'
import BoardCell from './cell';
import PieceComponent from './piece';
import { Piece } from '@/types';

interface BoardProps {
  board: Array<Array<Piece | null>>;
}

function Board({ board }: BoardProps) {
  return (
    <div className='flex flex-col'>
      {board.map((row, rowIndex) => {
        return (
          <div key={'row' + rowIndex} className='flex flex-row'>
            {row.map((piece, colIndex) => (
              <BoardCell key={'col' + colIndex} row={rowIndex} col={colIndex}>
                <PieceComponent piece={piece} coordinates={{ col: colIndex, row: rowIndex }} />
              </BoardCell>))}
          </div>
        )
      })}
    </div>
  );
}

export default Board;