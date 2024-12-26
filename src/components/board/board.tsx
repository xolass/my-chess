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
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayerVision);

  return (
    <div className={twMerge("flex flex-col rounded-md", isBlackPlayer && "rotate-180")}>
      {board.getLettersGrid().map((row, rowIndex) => {
        return (
          <div key={"row" + rowIndex} className="flex flex-row">
            {row.map((piece, colIndex) => (
              <BoardCell key={"col" + colIndex} row={rowIndex} col={colIndex}>
                <PieceComponent piece={piece} coordinates={{ col: colIndex, row: rowIndex }} />
                <span className="pointer-events-none absolute text-xs text-black">
                  {rowIndex} {colIndex}
                </span>
              </BoardCell>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
