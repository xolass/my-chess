import { baseFenBoard } from "@/__tests__/mocks/board";
import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";

describe("Half Move Clock test suite", () => {
  it("Should count half clock moves", () => {
    const game = new Game(new Fen(baseFenBoard));

    expect(game.halfMoveClock.count).toBe(0);

    game.makeMove({
      // white knight move
      from: { col: 6, row: 7 },
      to: { col: 5, row: 5 },
    });

    expect(game.halfMoveClock.count).toBe(0);

    game.makeMove({
      // black knight move
      from: { col: 6, row: 0 },
      to: { col: 5, row: 2 },
    });

    expect(game.halfMoveClock.count).toBe(1);

    game.makeMove({
      // white knight move
      from: { col: 5, row: 5 },
      to: { col: 6, row: 7 },
    });

    expect(game.halfMoveClock.count).toBe(1);

    game.makeMove({
      // black knight move
      from: { col: 5, row: 2 },
      to: { col: 6, row: 0 },
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

  it("should end the game after 50 turns", () => {
    const game = new Game(new Fen(baseFenBoard));

    // e4
    game.makeMove({
      from: { col: 4, row: 6 },
      to: { col: 4, row: 4 },
    });

    // e5
    game.makeMove({
      from: { col: 4, row: 1 },
      to: { col: 4, row: 3 },
    });

    expect(game.halfMoveClock.count).toBe(0);

    for (let i = 1; i <= 24; i++) {
      //go back and forth

      // be2
      game.makeMove({
        from: { col: 5, row: 7 },
        to: { col: 4, row: 6 },
      });

      // be7
      game.makeMove({
        from: { col: 5, row: 0 },
        to: { col: 4, row: 1 },
      });

      // bf1
      game.makeMove({
        from: { col: 4, row: 6 },
        to: { col: 5, row: 7 },
      });

      // bf7
      game.makeMove({
        from: { col: 4, row: 1 },
        to: { col: 5, row: 0 },
      });

      expect(game.halfMoveClock.count).toBe(i * 2);
    }

    expect(game.halfMoveClock.count).toBe(48);
    expect(game.gameEnded).toBe(false);
    expect(game.halfMoveClockDraw).toBe(false);

    game.makeMove({
      // be2
      from: { col: 5, row: 7 },
      to: { col: 4, row: 6 },
    });

    // be7
    game.makeMove({
      from: { col: 5, row: 0 },
      to: { col: 4, row: 1 },
    });

    expect(game.halfMoveClock.count).toBe(49);
    expect(game.gameEnded).toBe(false);
    expect(game.halfMoveClockDraw).toBe(false);

    // bf1
    game.makeMove({
      from: { col: 4, row: 6 },
      to: { col: 5, row: 7 },
    });

    // bf7
    game.makeMove({
      from: { col: 4, row: 1 },
      to: { col: 5, row: 0 },
    });

    expect(game.halfMoveClock.count).toBe(50);
    expect(game.gameEnded).toBe(true);
    expect(game.halfMoveClockDraw).toBe(true);
  });
  it("should NOT end the game after 49.5 turns", () => {
    const game = new Game(new Fen(baseFenBoard));

    // e4
    game.makeMove({
      from: { col: 4, row: 6 },
      to: { col: 4, row: 4 },
    });

    // e5
    game.makeMove({
      from: { col: 4, row: 1 },
      to: { col: 4, row: 3 },
    });

    expect(game.halfMoveClock.count).toBe(0);

    for (let i = 1; i <= 24; i++) {
      //go back and forth

      // be2
      game.makeMove({
        from: { col: 5, row: 7 },
        to: { col: 4, row: 6 },
      });

      // be7
      game.makeMove({
        from: { col: 5, row: 0 },
        to: { col: 4, row: 1 },
      });

      // bf1
      game.makeMove({
        from: { col: 4, row: 6 },
        to: { col: 5, row: 7 },
      });

      // bf7
      game.makeMove({
        from: { col: 4, row: 1 },
        to: { col: 5, row: 0 },
      });

      expect(game.halfMoveClock.count).toBe(i * 2);
    }

    // be2
    game.makeMove({
      from: { col: 5, row: 7 },
      to: { col: 4, row: 6 },
    });

    // be7
    game.makeMove({
      from: { col: 5, row: 0 },
      to: { col: 4, row: 1 },
    });

    // be2
    game.makeMove({
      from: { col: 5, row: 7 },
      to: { col: 4, row: 6 },
    });

    expect(game.gameEnded).toBe(false);
    expect(game.halfMoveClock.count).toBe(49);
    expect(game.halfMoveClockDraw).toBe(false);
  });
});
