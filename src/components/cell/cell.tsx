import { BoardCellOverlay } from "@/components/cell/overlays/cellOverlay";
import { DroppableCell } from "@/components/dnd-components/dropable-cell";
import PieceComponent from "@/components/pieces/piece";
import { useGameActions } from "@/hooks/useGameActions";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { Square } from "@/shared/classes/Square";
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

  const { pieceRelease } = useGameActions();

  const movingPiece = useMoveStore((state) => state.movingPiece);
  const { currentPlayer } = useGameStore((state) => state.game);
  const player = useGameStore((state) => state.player);

  const [isMouseOver, setMouseOver] = useState(false);

  const isPieceLegalMove = movingPiece?.legalMoves.find((lm) => lm.row === row && lm.col === col);
  const isMoveAPreMove = movingPiece?.preMoves.find((pm) => pm.row === row && pm.col === col);

  const isPreMove = isMoveAPreMove && player !== currentPlayer;

  const isCellWhite = (col + row) % 2;

  function handleMouseMove(event: "enter" | "leave") {
    if (!isPieceLegalMove) return;

    if (event === "enter") {
      return setMouseOver(true);
    }

    return setMouseOver(false);
  }

  function handleCellClick() {
    if (!movingPiece) return;
    pieceRelease(movingPiece.coordinates, coordinates);
    setMouseOver(false);
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
        {piece && <PieceComponent piece={piece} />}
        <BoardCellOverlay
          cellCoordinates={coordinates}
          movingPiece={movingPiece}
          isMouseOver={isMouseOver}
          isPieceLegalMove={!!isPieceLegalMove}
          isPiecePreMove={!!isPreMove}
        />
      </div>
    </DroppableCell>
  );
}

export default React.memo(BoardCell);
