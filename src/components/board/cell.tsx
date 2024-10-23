import { coordinateToMoveNotation } from "@/auxFunctions";
import { PromotionPopup } from "@/components/promotion-popup/promotionPopup";

import { useGameStore } from "@/stores/GameContext";
import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { twMerge } from "tailwind-merge";

interface IBoardCell {
  col: number;
  row: number;
  children?: React.ReactNode;
}

function BoardCell(props: IBoardCell) {
  const { col, row } = props;
  const isPromotionModalOpen = useGameStore((state) => state.isPromotionModalOpen);
  const positionToSpawnModal = useGameStore((state) => state.positionToSpawnModal) ?? { col: 7, row: 0 };

  const { setNodeRef } = useDroppable({
    id: `${col} ${row}`,
    data: { coordinates: { col, row } },
  });

  function isCellWhite() {
    return (col + row) % 2;
  }

  const isPromotingInThisCell =
    isPromotionModalOpen && positionToSpawnModal?.col === col && positionToSpawnModal?.row === row;

  console.log({ isPromotingInThisCell, col, row, positionToSpawnModal });

  return (
    <div
      ref={setNodeRef}
      id={coordinateToMoveNotation({ row, col })}
      className={twMerge(
        "relative size-12 flex justify-center items-center",
        isCellWhite() ? "bg-yellow-900" : "bg-yellow-100"
      )}
    >
      {isPromotingInThisCell && <PromotionPopup />}
      {props.children}
    </div>
  );
}

export default React.memo(BoardCell);
