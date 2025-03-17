import { setupGame } from "@/main";
import { MoveValidator } from "@/shared/classes/MoveValidator";
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

<<<<<<< Updated upstream
    const canMoveUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
=======
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
>>>>>>> Stashed changes

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
    game.currentTurn.currentPlayer = Colors.BLACK;

<<<<<<< Updated upstream
    const canMoveUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
=======
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const canMoveUp = MoveValidator.validateMove(game, { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game, { from: { row: 6, col: 4 }, to: { row: 7, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game, { from: { row: 6, col: 4 }, to: { row: 6, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game, { from: { row: 6, col: 4 }, to: { row: 6, col: 5 } });
=======
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 6, col: 4 }, to: { row: 7, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 6, col: 4 }, to: { row: 6, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 6, col: 4 }, to: { row: 6, col: 5 } });
>>>>>>> Stashed changes

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

    game.currentTurn.currentPlayer = Colors.BLACK;

<<<<<<< Updated upstream
    const canMoveDown = MoveValidator.validateMove(game, { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveUp = MoveValidator.validateMove(game, { from: { row: 1, col: 4 }, to: { row: 0, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game, { from: { row: 1, col: 4 }, to: { row: 1, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game, { from: { row: 1, col: 4 }, to: { row: 1, col: 5 } });
=======
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 1, col: 4 }, to: { row: 0, col: 4 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 1, col: 4 }, to: { row: 1, col: 3 } });
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 1, col: 4 }, to: { row: 1, col: 5 } });
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const canMove2Up = MoveValidator.validateMove(game, { from: { row: 5, col: 4 }, to: { row: 3, col: 4 } });
    const canMove3Up = MoveValidator.validateMove(game, { from: { row: 5, col: 4 }, to: { row: 2, col: 4 } });
=======
    const canMove2Up = MoveValidator.validateMove(game.currentTurn, { from: { row: 5, col: 4 }, to: { row: 3, col: 4 } });
    const canMove3Up = MoveValidator.validateMove(game.currentTurn, { from: { row: 5, col: 4 }, to: { row: 2, col: 4 } });
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const canMove2Up = MoveValidator.validateMove(game, { from: { row: 2, col: 4 }, to: { row: 4, col: 4 } });
    const canMove3Up = MoveValidator.validateMove(game, { from: { row: 2, col: 4 }, to: { row: 5, col: 4 } });
=======
    const canMove2Up = MoveValidator.validateMove(game.currentTurn, { from: { row: 2, col: 4 }, to: { row: 4, col: 4 } });
    const canMove3Up = MoveValidator.validateMove(game.currentTurn, { from: { row: 2, col: 4 }, to: { row: 5, col: 4 } });
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const captureForwards2 = MoveValidator.validateMove(game, { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
=======
    const captureForwards2 = MoveValidator.validateMove(game.currentTurn, { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const captureForwards1 = MoveValidator.validateMove(game, { from: { row: 2, col: 4 }, to: { row: 3, col: 4 } });
=======
    const captureForwards1 = MoveValidator.validateMove(game.currentTurn, { from: { row: 2, col: 4 }, to: { row: 3, col: 4 } });
>>>>>>> Stashed changes

    expect(captureForwards1).toBe(false);
  });
});
