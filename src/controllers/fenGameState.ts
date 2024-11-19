import { Fen } from "@/controllers/classes/Fen";
import { Coordinates, FenType } from "@/types";
import { useMemo, useRef, useState } from "react";

export function useGameState() {
  const [fenHistory, setFenHistory] = useState<Fen[]>([
    new Fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType),
  ]);

  const currentMovingPiece = useRef<Coordinates>();

  function addToFenHistory(fen: Fen) {
    setFenHistory((prev) => [...prev, fen]);
  }

  const currentFen = useMemo(() => {
    return fenHistory[fenHistory.length - 1];
  }, [fenHistory]);

  return {
    fenHistory,
    addToFenHistory,
    currentFen,
    currentMovingPiece,
  };
}
