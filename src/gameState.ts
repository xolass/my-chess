import { Cell, Coordinates, FenCastle, FenColors, FenPiecesSection, FenType } from "@/types";
import { useMemo, useRef, useState } from "react";

export type GameState = ReturnType<typeof useGameState>;

export function useGameState() {
  const [fenHistory, setFenHistory] = useState<FenType[]>(["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]);

  const currentMovingPiece = useRef<Coordinates>();

  function addToFenHistory(fen: FenType) {
    setFenHistory((prev: FenType[]) => [...prev, fen]);
  }

  const currentFen = useMemo(() => {
    return fenHistory[fenHistory.length - 1];
  }, [fenHistory]);

  const fenPieces = useMemo(() => {
    return currentFen.split(" ")[0] as FenPiecesSection;
  }, [currentFen]);

  const turn = useMemo((): FenColors => {
    return currentFen.split(" ")[1] as FenColors;
  }, [currentFen]);

  const castleStatus = useMemo(() => {
    return currentFen.split(" ")[2] as FenCastle;
  }, [currentFen]);

  const enPassantTargetSquare = useMemo(() => {
    return currentFen.split(" ")[3] as Cell;
  }, [currentFen]);

  const halfMoveClock = useMemo(() => {
    return Number(currentFen.split(" ")[4]);
  }, [currentFen]);

  const turnsCount = useMemo(() => {
    return Number(currentFen.split(" ")[5]);
  }, [currentFen]);

  function switchTurn(turn: FenColors): FenColors {
    return turn === "w" ? "b" : "w";
  }

  return {
    fenHistory,
    addToFenHistory,
    fenPieces,
    turn,
    castleStatus,
    enPassantTargetSquare,
    halfMoveClock,
    turnsCount,
    switchTurn,
    currentMovingPiece,
  };
}
