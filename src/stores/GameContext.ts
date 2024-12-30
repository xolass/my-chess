import { Fen } from "@/controllers/classes/Fen";
import { Game } from "@/controllers/classes/Game";
import { initialPosition } from "@/main";
import { Coordinates, PromotionOptions } from "@/types";
import { create } from "zustand";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  game: Game;
  setGame: (game: Game) => void;
  isBlackPlayerVision: boolean;
  setIsBlackPlayerVision: (isBlackPlayer: boolean) => void;
  isPromotionModalOpen: boolean;
  setPromotionModalOpen: (newModalState: boolean) => void;
  positionToSpawnModal: Coordinates | null;
  setPositionToSpawnModal: (positionToSpawnModal: Coordinates) => void;
  handlePromotingPiece: HandlePromotingPiece | null;
  setHandlePromotingPiece: (promotingPieceCallback: HandlePromotingPiece) => void;
}

export const useGameStore = create<GameContextType>((set) => ({
  setGame: (game) => set({ game }),
  game: new Game(new Fen(initialPosition)),
  isBlackPlayerVision: false,
  setIsBlackPlayerVision: (isBlackPlayer) => set({ isBlackPlayerVision: isBlackPlayer }),
  isPromotionModalOpen: false,
  setPromotionModalOpen: (newModalState) => set({ isPromotionModalOpen: newModalState }),
  positionToSpawnModal: null,
  setPositionToSpawnModal: (newPosition) => set({ positionToSpawnModal: newPosition }),
  handlePromotingPiece: null,
  setHandlePromotingPiece: (promotingPieceCallback) => set({ handlePromotingPiece: promotingPieceCallback }),
}));
