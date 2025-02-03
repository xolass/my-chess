import { setupGame } from "@/main";

describe("Queen movement actions", () => {
  it("should be able to move in any straight line direction", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "Q", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });

    expect(canMoveDiagRightDown).toBe(true);
    expect(canMoveDiagLeftDown).toBe(true);
    expect(canMoveDiagRightUp).toBe(true);
    expect(canMoveDiagLeftUp).toBe(true);
    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveRight).toBe(true);
  });

  it("should not be able to move to positions that are not straight lines", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "Q", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 7 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 0 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 1 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 7 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 0 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 7 } });
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 0, col: 6 } });

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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "Q", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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
});
