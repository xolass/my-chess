import { Coordinates, PromotionOptions } from "@/types";
import { create } from "zustand";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  isBlackPlayer: boolean;
  setBlackPlayer: (isBlackPlayer: boolean) => void;
  isPromotionModalOpen: boolean;
  setPromotionModalOpen: (newModalState: boolean) => void;
  positionToSpawnModal: Coordinates | null;
  setPositionToSpawnModal: (positionToSpawnModal: Coordinates) => void;
  handlePromotingPiece: HandlePromotingPiece | null;
  setHandlePromotingPiece: (promotingPieceCallback: HandlePromotingPiece) => void;
}

export const useGameStore = create<GameContextType>((set) => ({
  isBlackPlayer: true,
  setBlackPlayer: (isBlackPlayer) => set({ isBlackPlayer }),
  isPromotionModalOpen: false,
  setPromotionModalOpen: (newModalState) => set({ isPromotionModalOpen: newModalState }),
  positionToSpawnModal: null,
  setPositionToSpawnModal: (newPosition) => set({ positionToSpawnModal: newPosition }),
  handlePromotingPiece: null,
  setHandlePromotingPiece: (promotingPieceCallback) => set({ handlePromotingPiece: promotingPieceCallback }),
}));