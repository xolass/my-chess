import { Fen } from "@/controllers/classes/Fen";
import { Game } from "@/controllers/classes/Game";
import { FenType } from "@/types";

export const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType;

export function setupGame() {
  const fen = new Fen(initialPosition);
  const game = new Game(fen);

  game.calculateLegalMoves();

  return {
    game,
  };
}
