import { Game } from "@/shared/classes/Game";

export {};

declare global {
  interface Window {
    boardState: (string | undefined)[][];
    game: Game;
  }
}
