"use client";
import { Board as BoardClass } from "@/shared/classes/Board";
import { Colors } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";
import { twMerge } from "tailwind-merge";
import BoardCell from "../cell/cell";

interface BoardProps {
  board: BoardClass;
}

function Board({ board }: BoardProps) {
  const player = useGameStore((state) => state.player);

  return (
    <div className={twMerge("flex flex-col rounded-md cursor-pointer", player === Colors.BLACK && "rotate-180")}>
      {board.grid.map((rowValues, row) => {
        return (
          <div key={"row" + row} className="flex flex-row">
            {rowValues.map((square) => (
              <BoardCell key={"col" + square.coordinates.col} square={square} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
