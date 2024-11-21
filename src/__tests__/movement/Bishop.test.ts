import { setupGame } from "@/main";

describe("Bishop piece actions", () => {
  it("should be able to move upRight multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", null, null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagUpRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });

    expect(canMoveDiagUpRight).toBe(true);
  });

  it("should be able to move downRight multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagDownRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });

    expect(canMoveDiagDownRight).toBe(true);
  });
  it("should be able to move upLeft multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagUpLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });

    expect(canMoveDiagUpLeft).toBe(true);
  });
  it("should be able to move downLeft multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, null, "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });

    expect(canMoveDiagLeftDown).toBe(true);
  });

  it("should not move in a straight line", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "B", null, null, null],
      [null, null, null, null, null, null, null, null],
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

  it("should not move through pieces", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });

    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
  });
});
