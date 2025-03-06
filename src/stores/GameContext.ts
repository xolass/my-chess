import { initialPosition } from "@/main";
import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { Colors, PromotionOptions } from "@/shared/types";
import { create } from "zustand";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  game: Game;
  setGame: (game: Game) => void;
  player: Colors;
  setPlayer: (player: Colors) => void;
  gameHistory: Fen[];
  addToGameHistory: (fen: Fen) => void;
}

const initialFen = new Fen(initialPosition);

export const useGameStore = create<GameContextType>((set) => ({
  game: new Game(initialFen),
  setGame: (game) => set({ game }),
  player: Colors.BLACK,
  setPlayer: (player) => set({ player }),
  gameHistory: [initialFen],
  addToGameHistory: (gameHistory) => set((state) => ({ ...state, gameHistory: [...state.gameHistory, gameHistory] })),
}));
