import { PromotionPopup } from "@/components/promotion-popup/promotionPopup";
import MoveNotation from "@/controllers/classes/MoveNotation";

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

  return (
    <div
      ref={setNodeRef}
      id={MoveNotation.toCell({ row, col })}
      className={twMerge(
        "relative size-24 flex justify-center items-center",
        isCellWhite() ? "bg-black-cell" : "bg-white-cell"
      )}
    >
      {isPromotingInThisCell && <PromotionPopup />}
      {props.children}
    </div>
  );
}

export default React.memo(BoardCell);
