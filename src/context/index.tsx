"use client";
import { GameContext, HandlePromotingPiece } from "@/context/GameContext";
import { useState } from "react";

export function Contexts({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [handlePromotingPiece, setHandlePromotingPiece] = useState<HandlePromotingPiece | null>(null);

  return (
    <GameContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        handlePromotingPiece,
        setHandlePromotingPiece,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
