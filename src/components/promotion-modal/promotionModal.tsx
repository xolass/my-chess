import { GameContext } from "@/context/GameContext";
import { PromotionOptions } from "@/types";
import { useContext } from "react";

export function PromotionModal() {
  const gameContext = useContext(GameContext);

  if (!gameContext) throw new Error("useGameActions must be used within a GameContext");

  function choosePiece(piece: PromotionOptions) {
    gameContext?.handlePromotingPiece?.(piece);
  }

  return (
    <div className="flex flex-col gap-4">
      <button id="promotion-queen" className="border-1 border-white" onClick={() => choosePiece("q")}>
        Queen
      </button>
      <button id="promotion-knight" className="border-1 border-white" onClick={() => choosePiece("n")}>
        Knight
      </button>
      <button id="promotion-bishop" className="border-1 border-white" onClick={() => choosePiece("b")}>
        Bishop
      </button>
      <button id="promotion-rook" className="border-1 border-white" onClick={() => choosePiece("r")}>
        Rook
      </button>
    </div>
  );
}
