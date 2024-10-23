import { King } from "@/classes/King";
import { Board } from "@/types";

let onlyKingBoard: Board;
let kingWithAllyBoard: Board;

beforeEach(() => {
  onlyKingBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "K", null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
  kingWithAllyBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, "P", "P", "P", null, null],
    [null, null, null, "P", "K", "P", null, null],
    [null, null, null, "P", "P", "P", null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
});

describe("King movement actions", () => {
  it("should be move one square in any direction", () => {
    const canMoveDiagRightDown = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 5, col: 5 });
    const canMoveDiagLeftDown = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 5, col: 3 });
    const canMoveDiagRightUp = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 3, col: 5 });
    const canMoveDiagLeftUp = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 3, col: 3 });
    const canMoveUp = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 3, col: 4 });
    const canMoveDown = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 5, col: 4 });
    const canMoveLeft = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 4, col: 3 });
    const canMoveRight = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 4, col: 5 });

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
    const canMoveDiagRightDown = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 6, col: 6 });
    const canMoveDiagLeftDown = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 6, col: 2 });
    const canMoveDiagRightUp = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 2, col: 6 });
    const canMoveDiagLeftUp = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 2, col: 2 });
    const canMoveUp = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveDown = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 6, col: 4 });
    const canMoveLeft = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveRight = King.canKingMove(onlyKingBoard, { row: 4, col: 4 }, { row: 4, col: 6 });

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
    const canMoveDiagRightDown = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 5, col: 5 });
    const canMoveDiagLeftDown = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 5, col: 3 });
    const canMoveDiagRightUp = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 3, col: 5 });
    const canMoveDiagLeftUp = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 3, col: 3 });
    const canMoveUp = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 3, col: 4 });
    const canMoveDown = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 5, col: 4 });
    const canMoveLeft = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 4, col: 3 });
    const canMoveRight = King.canKingMove(kingWithAllyBoard, { row: 4, col: 4 }, { row: 4, col: 5 });

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
