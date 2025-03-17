import { setupGame } from "@/main";
import { MoveValidator } from "@/shared/classes/MoveValidator";

describe("Knight piece actions", () => {
  it("should be able to move in L shape", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "N", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const lMovement1 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const lMovement2 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 3 } });
    const lMovement3 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 5 } });
    const lMovement4 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 3 } });
    const lMovement5 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 6 } });
    const lMovement6 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 2 } });
    const lMovement7 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 6 } });
    const lMovement8 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 2 } });
=======
    const lMovement1 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const lMovement2 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 3 } });
    const lMovement3 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 5 } });
    const lMovement4 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 3 } });
    const lMovement5 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 6 } });
    const lMovement6 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 2 } });
    const lMovement7 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 6 } });
    const lMovement8 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 2 } });
>>>>>>> Stashed changes

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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "N", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
<<<<<<< Updated upstream
    const canMoveRight = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
    const canMoveLeft = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveDiagRightDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 5 } });
    const canMoveDiagRightUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    const canMoveDiagLeftDown = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 3 } });
    const canMoveDiagLeftUp = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 3 } });
    const canMoveRandomLocation1 = MoveValidator.validateMove(game, {
      from: { row: 4, col: 4 },
      to: { row: 0, col: 7 },
    });
    const canMoveRandomLocation2 = MoveValidator.validateMove(game, {
=======
    const canMoveRight = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 5 } });
    const canMoveLeft = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 4, col: 3 } });
    const canMoveUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } });
    const canMoveDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } });
    const canMoveDiagRightDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 5 } });
    const canMoveDiagRightUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    const canMoveDiagLeftDown = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 3 } });
    const canMoveDiagLeftUp = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 3 } });
    const canMoveRandomLocation1 = MoveValidator.validateMove(game.currentTurn, {
      from: { row: 4, col: 4 },
      to: { row: 0, col: 7 },
    });
    const canMoveRandomLocation2 = MoveValidator.validateMove(game.currentTurn, {
>>>>>>> Stashed changes
      from: { row: 4, col: 4 },
      to: { row: 7, col: 7 },
    });

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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "p", undefined, undefined],
      [undefined, undefined, undefined, "P", "N", "P", undefined, undefined],
      [undefined, undefined, undefined, "P", "P", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

<<<<<<< Updated upstream
    const lMovement1 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const lMovement2 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 6, col: 3 } });
    const lMovement3 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 5 } });
    const lMovement4 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 2, col: 3 } });
    const lMovement5 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 6 } });
    const lMovement6 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 5, col: 2 } });
    const lMovement7 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 6 } });
    const lMovement8 = MoveValidator.validateMove(game, { from: { row: 4, col: 4 }, to: { row: 3, col: 2 } });
=======
    const lMovement1 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 5 } });
    const lMovement2 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 6, col: 3 } });
    const lMovement3 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 5 } });
    const lMovement4 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 2, col: 3 } });
    const lMovement5 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 6 } });
    const lMovement6 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 5, col: 2 } });
    const lMovement7 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 6 } });
    const lMovement8 = MoveValidator.validateMove(game.currentTurn, { from: { row: 4, col: 4 }, to: { row: 3, col: 2 } });
>>>>>>> Stashed changes

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
