import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { FenType } from "@/shared/types";

export const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType; // default
// export const initialPosition = "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1" as FenType; // castle
// export const initialPosition = "8/8/8/8/8/1K6/2Q5/k7 w - - 48 1" as FenType; // stalemate/insufficient material/checkmate

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
