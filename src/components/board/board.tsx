"use client";
import { useGameStore } from "@/stores/GameContext";
import { Board as BoardType } from "@/types";
import { twMerge } from "tailwind-merge";
import BoardCell from "./cell";
import PieceComponent from "./piece";

interface BoardProps {
  board: BoardType;
}

function Board({ board }: BoardProps) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayer);

  return (
    <div className={twMerge("flex flex-col rounded-md", "rotate-180")}>
      {board.map((row, rowIndex) => {
        return (
          <div key={"row" + rowIndex} className="flex flex-row">
            {row.map((piece, colIndex) => (
              <BoardCell key={"col" + colIndex} row={rowIndex} col={colIndex}>
                <PieceComponent piece={piece} coordinates={{ col: colIndex, row: rowIndex }} />
              </BoardCell>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
