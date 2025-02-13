import { baseFenBoard } from "@/__tests__/mocks/board";
import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { Colors } from "@/shared/types";

describe("Turns test suite", () => {
  it("Should count additional turn on blacks end of turn", () => {
    const game = new Game(new Fen(baseFenBoard)); // start as white

    game.switchPlayer();
    expect(game.turn).toBe(1);

    game.switchPlayer();
    expect(game.turn).toBe(2);
  });

  it("Should switch turns correctly", () => {
    const game = new Game(new Fen(baseFenBoard)); // start as white
    game.switchPlayer();

    expect(game.currentPlayer).toBe(Colors.BLACK);

    game.switchPlayer();
    expect(game.currentPlayer).toBe(Colors.WHITE);
  });
});
