import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { Colors } from "@/shared/types";

describe("Turns test suite", () => {
  it("Should count additional turn on blacks end of turn", () => {
    const game = new Game(new Fen());

    game.currentTurn.endTurn({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
    expect(game.turnsCount).toBe(1);

    game.currentTurn.endTurn({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
    expect(game.turnsCount).toBe(2);
  });

  it("Should switch turns correctly", () => {
    const game = new Game(new Fen());

    game.currentTurn.endTurn({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
    expect(game.currentPlayer).toBe(Colors.BLACK);

    game.currentTurn.endTurn({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
    expect(game.currentPlayer).toBe(Colors.WHITE);
  });
});
