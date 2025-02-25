import { BoardCellOverlay } from "@/components/cell/overlays/cellOverlay";
import { DroppableCell } from "@/components/dnd-components/dropable-cell";
import PieceComponent from "@/components/pieces/piece";
import { useGameActions } from "@/hooks/useGameActions";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { Square } from "@/shared/classes/Square";
import { isCoordinateEqual } from "@/shared/utils";
import { useGameStore } from "@/stores/GameContext";
import { useMoveStore } from "@/stores/MoveContext";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface BoardCellProps {
  square: Square;
}

function BoardCell(props: BoardCellProps) {
  const { square } = props;
  const { coordinates, piece } = square;
  const { row, col } = coordinates;

  const [isMouseOver, setIsMouseOver] = useState(false);
  const { pieceDragRelease, resetMovingPiece } = useGameActions();

  const movingPiece = useMoveStore((state) => state.movingPiece);
  const { currentPlayer } = useGameStore((state) => state.game);
  const player = useGameStore((state) => state.player);

  const isPieceLegalMove = movingPiece?.legalMoves.find((lmCoord) => isCoordinateEqual(lmCoord, coordinates));
  const isMoveAPreMove = movingPiece?.preMoves.find((pmCoord) => isCoordinateEqual(pmCoord, coordinates));

  const isPreMove = isMoveAPreMove && player !== currentPlayer;

  const isCellWhite = (col + row) % 2;

  function handleMouseMove(event: "enter" | "leave") {
    if (!isPieceLegalMove) return;

    if (event === "enter") {
      return setIsMouseOver(true);
    }

    return setIsMouseOver(false);
  }

  function handleCellClick(e: React.MouseEvent) {
    if (!movingPiece) return;
    pieceDragRelease(movingPiece.coordinates, coordinates);
    resetMovingPiece();
  }

  return (
    <DroppableCell square={square}>
      <div
        id={MoveNotation.toCell({ row, col })}
        className={twMerge(
          "size-24 flex justify-center items-center relative",
          isCellWhite ? "bg-black-cell" : "bg-white-cell"
        )}
        onMouseEnter={() => handleMouseMove("enter")}
        onMouseLeave={() => handleMouseMove("leave")}
        onClick={handleCellClick}
      >
        <BoardCellOverlay
          cellCoordinates={coordinates}
          movingPiece={movingPiece}
          isMouseOver={isMouseOver}
          isPieceLegalMove={!!isPieceLegalMove}
          isPiecePreMove={!!isPreMove}
        />
        {piece && <PieceComponent piece={piece} />}
      </div>
    </DroppableCell>
  );
}

export default React.memo(BoardCell);
