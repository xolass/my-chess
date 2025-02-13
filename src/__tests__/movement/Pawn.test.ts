import { setupGame } from "@/main";
import { Colors } from "@/shared/types";

describe("Pawn movement actions", () => {
  it("should be able for white pawns to move only up", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });

    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should be able for black pawns to move only down", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    game.currentPlayer = Colors.BLACK;

    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });

    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(true);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should be able for white pawns to move two squares on first move", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMoveUp = game.validateMove({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 6, col: 4 }, to: { row: 7, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 6, col: 4 }, to: { row: 6, col: 3 } });
    const canMoveRight = game.validateMove({ from: { row: 6, col: 4 }, to: { row: 6, col: 5 } });

    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should be able for black pawns to move two squares on first move", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    game.currentPlayer = Colors.BLACK;

    const canMoveDown = game.validateMove({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveUp = game.validateMove({ from: { row: 1, col: 4 }, to: { row: 0, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 1, col: 4 }, to: { row: 1, col: 3 } });
    const canMoveRight = game.validateMove({ from: { row: 1, col: 4 }, to: { row: 1, col: 5 } });

    expect(canMoveDown).toBe(true);
    expect(canMoveUp).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should NOT be able for white pawns to move two or more squares not being on first move", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMove2Up = game.validateMove({ from: { row: 5, col: 4 }, to: { row: 3, col: 4 } });
    const canMove3Up = game.validateMove({ from: { row: 5, col: 4 }, to: { row: 2, col: 4 } });

    expect(canMove2Up).toBe(false);
    expect(canMove3Up).toBe(false);
  });

  it("should NOT be able for black pawns to move two or more squares not being on first move", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMove2Up = game.validateMove({ from: { row: 2, col: 4 }, to: { row: 4, col: 4 } });
    const canMove3Up = game.validateMove({ from: { row: 2, col: 4 }, to: { row: 5, col: 4 } });

    expect(canMove2Up).toBe(false);
    expect(canMove3Up).toBe(false);
  });

  it("should NOT be able for white pawns to capture forwards (moving 2)", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const captureForwards2 = game.validateMove({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });

    expect(captureForwards2).toBe(false);
  });

  it("should NOT be able for white pawns to capture forwards (moving 1)", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const captureForwards1 = game.validateMove({ from: { row: 2, col: 4 }, to: { row: 3, col: 4 } });

    expect(captureForwards1).toBe(false);
  });
});
