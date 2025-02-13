"use client";
import { Board as BoardClass } from "@/shared/classes/Board";
import { Colors } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";
import { twMerge } from "tailwind-merge";
import BoardCell from "./cell";
import PieceComponent from "./piece";

interface BoardProps {
  board: BoardClass;
}

function Board({ board }: BoardProps) {
  const player = useGameStore((state) => state.player);

  return (
    <div className={twMerge("flex flex-col rounded-md cursor-pointer", player === Colors.BLACK && "rotate-180")}>
      {board.getLettersGrid().map((row, rowIndex) => {
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
