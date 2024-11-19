import { setupGame } from "@/main";

describe("Rook piece actions", () => {
  it("should be able to move UP in a straight line", () => {
    const { game, board } = setupGame();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "R", "P", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveDown).toBe(false);
    expect(canMoveUp).toBe(true);
  });
  it("should be able to move DOWN in a straight line", () => {
    const { game, board } = setupGame();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "P", "R", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveDown).toBe(true);
  });

  it("should be able to move LEFT in a straight line", () => {
    const { game, board } = setupGame();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, "R", "P", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });

    expect(canMoveLeft).toBe(true);
  });

  it("should be able to move RIGHT in a straight line", () => {
    const { game, board } = setupGame();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, "P", "R", null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });

    expect(canMoveRight).toBe(true);
  });

  it("should not be able to move in diagonals", () => {
    const { game, board } = setupGame();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "R", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveRight).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(true);
  });

  it("should not move through pieces", () => {
    const { game, board } = setupGame();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, "P", "R", "p", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
  });
});
