import { initialPosition } from "@/main";
import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { Colors, PromotionOptions } from "@/shared/types";
import { create } from "zustand";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  game: Game;
  player: Colors;
  gameHistory: Fen[];
}

export const gameStore = create<GameContextType>(() => ({
  game: new Game(new Fen(initialPosition)),
  player: Colors.WHITE,
  gameHistory: [],
}));
