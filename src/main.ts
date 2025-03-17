import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { LegalMovesManager } from "@/shared/classes/LegalMovesManager";
import { FenType } from "@/shared/types";
import { gameStore } from "@/stores/GameContext";

export const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType; // default
// export const initialPosition = "8/8/8/8/8/1K6/2Q5/k7 w - - 0 1" as FenType; // stalemate/insufficient material/checkmate

export function setupGame() {
  const fen = new Fen(initialPosition);
  const game = new Game(fen);


  if (globalThis.window) {
    window.game = game;
  }

  return {
    game,
  };
}
