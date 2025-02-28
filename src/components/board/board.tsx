"use client";
import { Board as BoardClass } from "@/shared/classes/Board";
import { Colors, Coordinates } from "@/shared/types";
import { isCoordinateEqual } from "@/shared/utils";
import { useGameStore } from "@/stores/GameContext";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import BoardCell from "../cell/cell";

interface BoardProps {
  board: BoardClass;
}

function Board({ board }: BoardProps) {
  const player = useGameStore((state) => state.player);

  const [hoveredCell, setHoveredCell] = useState<Coordinates>();

  return (
    <div className={twMerge("flex flex-col rounded-md cursor-pointer", player === Colors.BLACK && "rotate-180")}>
      {board.grid.map((rowValues, row) => {
        return (
          <div key={"row" + row} className="flex flex-row">
            {rowValues.map((square) => (
              <BoardCell
                isHovered={isCoordinateEqual(square.coordinates, hoveredCell)}
                onMouseEnter={() => setHoveredCell(square.coordinates)}
                onMouseLeave={() => setHoveredCell(undefined)}
                key={"col" + square.coordinates.col}
                square={square}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
