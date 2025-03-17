import { setupGame } from "@/main";
import { MoveValidator } from "@/shared/classes/MoveValidator";

describe("Bishop piece actions", () => {
  it("should be able to move upRight multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "P", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "B", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "p", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const canMoveDiagUpRight = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
=======
    const canMoveDiagUpRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
>>>>>>> Stashed changes

    expect(canMoveDiagUpRight).toBe(true);
  });

  it("should be able to move downRight multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "p", undefined, undefined],
      [undefined, undefined, undefined, "P", "B", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "P", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const canMoveDiagDownRight = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
=======
    const canMoveDiagDownRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
>>>>>>> Stashed changes

    expect(canMoveDiagDownRight).toBe(true);
  });
  it("should be able to move upLeft multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", "p", undefined, undefined],
      [undefined, undefined, undefined, "P", "B", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const canMoveDiagUpLeft = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });
=======
    const canMoveDiagUpLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });
>>>>>>> Stashed changes

    expect(canMoveDiagUpLeft).toBe(true);
  });
  it("should be able to move downLeft multiple squares", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "p", undefined, undefined],
      [undefined, undefined, undefined, "P", "B", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const canMoveDiagLeftDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
=======
    const canMoveDiagLeftDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
>>>>>>> Stashed changes

    expect(canMoveDiagLeftDown).toBe(true);
  });

  it("should not move in a straight line", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "B", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const canMoveRight = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });
=======
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 6 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 2 } });
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 4 } });
>>>>>>> Stashed changes

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
  });

  it("should not move through pieces", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "p", undefined, undefined],
      [undefined, undefined, undefined, "P", "B", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

<<<<<<< Updated upstream
    const canMoveDiagRightDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
    const canMoveDiagLeftDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
    const canMoveDiagRightUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
    const canMoveDiagLeftUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });
=======
    const canMoveDiagRightDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 6 } });
    const canMoveDiagLeftDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 2 } });
    const canMoveDiagRightUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 6 } });
    const canMoveDiagLeftUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 2 } });
>>>>>>> Stashed changes

    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
  });
});
