import { BoardCellOverlay } from "@/components/cell/overlays/cellOverlay";
import { DroppableCell } from "@/components/dnd-components/dropable-cell";
import PieceComponent from "@/components/pieces/piece";
import { useGameActions } from "@/hooks/useGameActions";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { King } from "@/shared/classes/pieces/King";
import { Square } from "@/shared/classes/Square";
import { Colors } from "@/shared/types";
import { isCoordinateEqual } from "@/shared/utils";
import { gameStore } from "@/stores/GameContext";
import { useMoveStore } from "@/stores/MoveContext";

import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface BoardCellProps {
  square: Square;
  onMouseEnter: VoidFunction;
  onMouseLeave: VoidFunction;
  isHovered: boolean;
}

// TODO: improve to only rerender when props change
function BoardCell(props: BoardCellProps) {
  const { square, isHovered, onMouseEnter, onMouseLeave } = props;
  const { coordinates, piece } = square;
  const { row, col } = coordinates;

  const { pieceDragRelease, resetMovingPiece } = useGameActions();

  const movingPiece = useMoveStore((state) => state.movingPiece);
  const {
    player,
    game: { currentPlayer },
  } = gameStore.getState();

  const isAuxiliaryLegalMoves = useCallback(() => {
    if (movingPiece instanceof King) {
      return movingPiece.castleLegalMoves.find((lmMove) => isCoordinateEqual(lmMove.to, coordinates));
    }
  }, [movingPiece, coordinates]);

  const isPieceLegalMove = movingPiece?.legalMoves.find((lmMove) => isCoordinateEqual(lmMove.to, coordinates));
  const isMoveAPreMove = movingPiece?.preMoves.find((pmMove) => isCoordinateEqual(pmMove.to, coordinates));
  const isPieceAuxiliaryLegalMove = isAuxiliaryLegalMoves();

  const isPreMove = isMoveAPreMove && player !== currentPlayer;

  function handleCellClick() {
    if (!movingPiece) return;

    pieceDragRelease(movingPiece.coordinates, coordinates);
    resetMovingPiece();
  }

  return (
    <DroppableCell square={square}>
      <div
        id={MoveNotation.toCell({ row, col })}
        className={twMerge(
          "size-full flex justify-center items-center relative",
          square.color === Colors.BLACK ? "bg-black-cell" : "bg-white-cell"
        )}
        onClick={handleCellClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <BoardCellOverlay
          cellCoordinates={coordinates}
          movingPiece={movingPiece}
          isMouseOver={isHovered}
          isPieceLegalMove={!!isPieceLegalMove || !!isPieceAuxiliaryLegalMove}
          isPiecePreMove={!!isPreMove}
        />
        {piece && <PieceComponent piece={piece} />}
      </div>
    </DroppableCell>
  );
}

export default React.memo(BoardCell);
