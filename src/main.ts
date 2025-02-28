import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { FenType } from "@/shared/types";

export const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType;

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
