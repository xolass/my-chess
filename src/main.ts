import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { LegalMovesManager } from "@/shared/classes/LegalMovesManager";
import { FenType } from "@/shared/types";
import { gameStore } from "@/stores/GameContext";

<<<<<<< Updated upstream
// export const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType;
export const initialPosition = "8/8/8/8/8/1K6/2Q5/k7 w - - 0 1" as FenType;
=======
export const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" as FenType; // default
// export const initialPosition = "8/8/8/8/8/1K6/2Q5/k7 w - - 0 1" as FenType; // stalemate/insufficient material/checkmate
>>>>>>> Stashed changes

export function setupGame() {
  const fen = new Fen(initialPosition);
  const game = new Game(fen);

<<<<<<< Updated upstream
  LegalMovesManager.calculateLegalMoves(game);
  LegalMovesManager.calculatePreMoves(game.board, game.currentPlayer);

  gameStore.setState({
    game,
  });

  console.log(gameStore.getState().game);
=======
>>>>>>> Stashed changes

  if (globalThis.window) {
    window.game = game;
  }

  return {
    game,
  };
}
