import { baseFenBoard } from "@/__tests__/mocks/board";
import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";

describe("Half Move Clock test suite", () => {
  it("Should count half clock moves", () => {
    const game = new Game(new Fen(baseFenBoard));

    game.makeMove({
      // knight move
      from: { col: 6, row: 0 },
      to: { col: 5, row: 2 },
    });

    expect(game.halfMoveClock.count).toBe(1);

    game.makeMove({
      // another knight move
      from: { col: 6, row: 7 },
      to: { col: 5, row: 5 },
    });

    expect(game.halfMoveClock.count).toBe(2);
  });

  it("Should reset half clock moves on pawn moves", () => {
    const game = new Game(new Fen(baseFenBoard));

    game.makeMove({
      // knight move
      from: { col: 6, row: 0 },
      to: { col: 5, row: 2 },
    });

    expect(game.halfMoveClock.count).toBe(1);

    game.makeMove({
      // pawn move
      from: { col: 4, row: 6 },
      to: { col: 4, row: 4 },
    });

    expect(game.halfMoveClock.count).toBe(0);
  });

  it("Should reset half clock moves on captures", () => {
    const game = new Game(new Fen(baseFenBoard));

    game.makeMove({
      // knight move
      from: { col: 6, row: 0 },
      to: { col: 5, row: 2 },
    });

    expect(game.halfMoveClock.count).toBe(1);

    game.makeMove({
      // pawn move
      from: { col: 4, row: 6 },
      to: { col: 4, row: 4 },
    });

    expect(game.halfMoveClock.count).toBe(0);
  });
});
