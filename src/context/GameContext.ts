import { PromotionOptions } from "@/types";
import { createContext } from "react";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  isModalOpen: boolean;
  setModalOpen: (newModalState: boolean) => void;
  handlePromotingPiece: HandlePromotingPiece | null;
  setHandlePromotingPiece: (promotingPieceCallback: HandlePromotingPiece) => void;
}

export const GameContext = createContext<GameContextType | null>(null);
