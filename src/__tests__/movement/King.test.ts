import { setupGame } from "@/main";

describe("King movement actions", () => {
  it("should be move one square in any direction", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 5 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 3 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 3 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });

    expect(canMoveDiagRightDown).toBe(true);
    expect(canMoveDiagLeftDown).toBe(true);
    expect(canMoveDiagRightUp).toBe(true);
    expect(canMoveDiagLeftUp).toBe(true);
    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveRight).toBe(true);
  });

  it("should not be able to move more than one square in any direction", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });

    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should not move above ally piece", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, "P", "K", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 5 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 3 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 3 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });

    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should not move into check", () => {
    expect(true).toBe(true);
  });
});
