import { Knight } from "@/controllers/classes/Knight";
import { Board } from "@/types";

let onlyKnightBoard: Board;

beforeEach(() => {
  onlyKnightBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "N", null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
});

describe("Knight piece actions", () => {
  it("should be able to move in L shape", () => {
    const lMovement1 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 6, col: 5 });
    const lMovement2 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 6, col: 3 });
    const lMovement3 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 2, col: 5 });
    const lMovement4 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 2, col: 3 });
    const lMovement5 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 5, col: 6 });
    const lMovement6 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 5, col: 2 });
    const lMovement7 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 3, col: 6 });
    const lMovement8 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 3, col: 2 });

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
    const canMoveRight = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 4, col: 5 });
    const canMoveLeft = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 4, col: 3 });
    const canMoveUp = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 3, col: 4 });
    const canMoveDown = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 5, col: 4 });
    const canMoveDiagRightDown = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 5, col: 5 });
    const canMoveDiagRightUp = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 3, col: 5 });
    const canMoveDiagLeftDown = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 5, col: 3 });
    const canMoveDiagLeftUp = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 3, col: 3 });
    const canMoveRandomLocation1 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 0, col: 7 });
    const canMoveRandomLocation2 = Knight.canKnightMove(onlyKnightBoard, { row: 4, col: 4 }, { row: 7, col: 7 });

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
    const knightWithPiecesAround: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "N", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const lMovement1 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 6, col: 5 });
    const lMovement2 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 6, col: 3 });
    const lMovement3 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 2, col: 5 });
    const lMovement4 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 2, col: 3 });
    const lMovement5 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 5, col: 6 });
    const lMovement6 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 5, col: 2 });
    const lMovement7 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 3, col: 6 });
    const lMovement8 = Knight.canKnightMove(knightWithPiecesAround, { row: 4, col: 4 }, { row: 3, col: 2 });

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
