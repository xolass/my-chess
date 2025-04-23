"use client";
import { Board as BoardClass } from "@/shared/classes/Board";
import { Colors, Coordinates } from "@/shared/types";
import { isCoordinateEqual } from "@/shared/utils";
import { gameStore } from "@/stores/GameContext";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import BoardCell from "../cell/cell";

interface BoardProps {
  board: BoardClass;
}

function Board({ board }: BoardProps) {
  const { player } = gameStore.getState();

  const [hoveredCell, setHoveredCell] = useState<Coordinates>();

  const invertedGrid = useMemo(() => {
    return board.grid.map((row) => row.toReversed()).toReversed();
  }, [board.grid]);

  const grid = player === Colors.WHITE ? board.grid : invertedGrid;

  return (
    <div
      style={{
        width: "clamp(432px, 60dvw, 752px)",
        height: "clamp(432px, 60dvw, 752px)",
      }}
      className={twMerge("grid grid-rows-8 cursor-pointer size-full aspect-square")}
    >
      {grid.map((rowValues, row) => {
        return (
          <div key={"row" + row} className="grid grid-cols-8">
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
