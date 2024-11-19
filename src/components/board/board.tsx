"use client";
import { Board as BoardClass } from "@/controllers/classes/Board";
import { useGameStore } from "@/stores/GameContext";
import { twMerge } from "tailwind-merge";
import BoardCell from "./cell";
import PieceComponent from "./piece";

interface BoardProps {
  board: BoardClass;
}

function Board({ board }: BoardProps) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayer);

  return (
    <div className={twMerge("flex flex-col rounded-md", "rotate-180")}>
      {board.grid.map((row, rowIndex) => {
        return (
          <div key={"row" + rowIndex} className="flex flex-row">
            {row.map((square, colIndex) => (
              <BoardCell key={"col" + colIndex} row={rowIndex} col={colIndex}>
                <PieceComponent piece={square.piece} coordinates={{ col: colIndex, row: rowIndex }} />
              </BoardCell>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
