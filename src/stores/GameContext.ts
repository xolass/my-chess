import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { Colors, PromotionOptions } from "@/shared/types";
import { createStore } from "zustand/vanilla";

export type HandlePromotingPiece = (promotingPiece: PromotionOptions | null) => void;

export interface GameContextType {
  game: Game;
  player: Colors;
  gameHistory: Fen[];
}

export const gameStore = createStore<GameContextType>(() => ({
  game: new Game(),
  player: Colors.WHITE,
  gameHistory: [],
<<<<<<< Updated upstream
}));
=======
}));
>>>>>>> Stashed changes
