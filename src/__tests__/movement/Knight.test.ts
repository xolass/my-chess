import { setupGame } from "@/main";

describe("Knight piece actions", () => {
  it("should be able to move in L shape", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "N", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const lMovement1 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const lMovement2 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 3 } });
    const lMovement3 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 5 } });
    const lMovement4 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 3 } });
    const lMovement5 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 6 } });
    const lMovement6 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 2 } });
    const lMovement7 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 6 } });
    const lMovement8 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 2 } });

    expect(lMovement1).toBe(true);
    expect(lMovement2).toBe(true);
    expect(lMovement3).toBe(true);
    expect(lMovement4).toBe(true);
    expect(lMovement5).toBe(true);
    expect(lMovement6).toBe(true);
    expect(lMovement7).toBe(true);
    expect(lMovement8).toBe(true);
  });

  it("should not be able to move in another directions", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "N", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const canMoveRight = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
    const canMoveLeft = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveDiagRightDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 5 } });
    const canMoveDiagRightUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    const canMoveDiagLeftDown = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 3 } });
    const canMoveDiagLeftUp = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 3 } });
    const canMoveRandomLocation1 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 0, col: 7 } });
    const canMoveRandomLocation2 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 7, col: 7 } });

    expect(canMoveRandomLocation1).toBe(false);
    expect(canMoveRandomLocation2).toBe(false);
    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
  });

  it("should be able to move through pieces", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "N", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const lMovement1 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const lMovement2 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 6, col: 3 } });
    const lMovement3 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 5 } });
    const lMovement4 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 2, col: 3 } });
    const lMovement5 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 6 } });
    const lMovement6 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 5, col: 2 } });
    const lMovement7 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 6 } });
    const lMovement8 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 2 } });

    expect(lMovement1).toBe(true);
    expect(lMovement2).toBe(true);
    expect(lMovement3).toBe(true);
    expect(lMovement4).toBe(true);
    expect(lMovement5).toBe(true);
    expect(lMovement6).toBe(true);
    expect(lMovement7).toBe(true);
    expect(lMovement8).toBe(true);
  });
});
