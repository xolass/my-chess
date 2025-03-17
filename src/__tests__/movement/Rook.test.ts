import { setupGame } from "@/main";
import { MoveValidator } from "@/shared/classes/MoveValidator";

describe("Rook piece actions", () => {
  it("should be able to move UP in a straight line", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "R", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveDown).toBe(false);
    expect(canMoveUp).toBe(true);
  });
  it("should be able to move DOWN in a straight line", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "R", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveDown).toBe(true);
  });

  it("should be able to move LEFT in a straight line", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "R", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });

    expect(canMoveLeft).toBe(true);
  });

  it("should be able to move RIGHT in a straight line", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "R", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });

    expect(canMoveRight).toBe(true);
  });

  it("should not be able to move in diagonals", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "R", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveRight).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(true);
  });

  it("should not move through pieces", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "R", "p", undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
  });
});
