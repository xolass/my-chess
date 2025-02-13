import { initialPosition } from "@/main";
import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { Piece } from "@/shared/classes/Piece";
import { Colors, PromotionOptions } from "@/shared/types";
import { create } from "zustand";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  game: Game;
  currentMovingPiece: Piece | undefined;
  setCurrentMovingPiece: (currentMovingPiece: Piece | undefined) => void;
  setGame: (game: Game) => void;
  player: Colors;
  setPlayer: (player: Colors) => void;
}

export const useGameStore = create<GameContextType>((set) => ({
  setGame: (game) => set({ game }),
  game: new Game(new Fen(initialPosition)),
  currentMovingPiece: undefined,
  setCurrentMovingPiece: (currentMovingPiece) => set({ currentMovingPiece }),
  player: Colors.WHITE,
  setPlayer: (player) => set({ player }),
}));
