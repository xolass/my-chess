import { Piece } from "@/shared/classes/Piece";
import { Coordinates } from "@/shared/types";
import { create } from "zustand";

export interface MoveContextType {
  from: Coordinates | undefined;
  setFrom: (coordinates: Coordinates) => void;
  movingPiece: Piece | undefined;
  setMovingPiece: (piece: Piece | undefined) => void;
}

export const useMoveStore = create<MoveContextType>((set) => ({
  from: undefined,
  setFrom: (from) => set({ from }),
  movingPiece: undefined,
  setMovingPiece: (currentPiece) => set({ movingPiece: currentPiece }),
}));
