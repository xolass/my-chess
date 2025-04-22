import { Coordinates, PromotionOptions } from "@/shared/types";
import { create } from "zustand";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface PromotionContextType {
  isPromotionModalOpen: boolean;
  positionToSpawnModal: Coordinates | null;
  handlePromotingPiece: HandlePromotingPiece | null;
}

export const promotionStore = create<PromotionContextType>(() => ({
  isPromotionModalOpen: false,
  positionToSpawnModal: null,
  handlePromotingPiece: null,
}));
