import { Board } from "@/controllers/classes/Board";
import { Game } from "@/controllers/classes/Game";

export function initGame() {
  const board = new Board();
  const game = new Game(board);

  return {
    board,
    game,
  };
}
