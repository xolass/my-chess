import { Board } from "@/controllers/classes/Board";
import { Game } from "@/controllers/classes/Game";
import { LettersGrid } from "@/types";

export const initialBoard: LettersGrid = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, "P", null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, "p", null],
  [null, null, null, null, null, null, null, null],
];

export function setupGame() {
  const board = new Board(initialBoard);
  const game = new Game(board);

  return {
    game,
  };
}
