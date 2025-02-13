import { Fen } from "@/shared/classes/Fen";
import { Coordinates, FenType } from "@/shared/types";
import { useRef, useState } from "react";

export function useGameState() {
  const [fenHistory, setFenHistory] = useState<Fen[]>([
    new Fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType),
  ]);

  const currentMovingPiece = useRef<Coordinates>();

  function addToFenHistory(fen: Fen) {
    setFenHistory((prev) => [...prev, fen]);
  }

  return {
    fenHistory,
    addToFenHistory,
    currentMovingPiece,
  };
}
