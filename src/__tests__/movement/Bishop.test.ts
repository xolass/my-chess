import { Bishop } from "@/controllers/classes/Bishop";
import { Grid } from "@/types";

let onlyBishopBoard: Grid;

beforeEach(() => {
  onlyBishopBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "B", null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
});

describe("Bishop piece actions", () => {
  it("should be able to move upRight multiple squares", () => {
    const bishopWithOnlyUpRightFree: Grid = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", null, null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveDiagUpRight = Bishop.canBishopMove(bishopWithOnlyUpRightFree, { row: 4, col: 4 }, { row: 2, col: 6 });

    expect(canMoveDiagUpRight).toBe(true);
  });

  it("should be able to move downRight multiple squares", () => {
    const bishopWithOnlyDownRightFree: Grid = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveDiagDownRight = Bishop.canBishopMove(
      bishopWithOnlyDownRightFree,
      { row: 4, col: 4 },
      { row: 6, col: 6 }
    );

    expect(canMoveDiagDownRight).toBe(true);
  });
  it("should be able to move upLeft multiple squares", () => {
    const bishopWithOnlyUpLeftFree: Grid = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveDiagUpLeft = Bishop.canBishopMove(bishopWithOnlyUpLeftFree, { row: 4, col: 4 }, { row: 2, col: 2 });

    expect(canMoveDiagUpLeft).toBe(true);
  });
  it("should be able to move downLeft multiple squares", () => {
    const bishopWithOnlyDownLeftFree: Grid = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, null, "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveDiagLeftDown = Bishop.canBishopMove(
      bishopWithOnlyDownLeftFree,
      { row: 4, col: 4 },
      { row: 6, col: 2 }
    );

    expect(canMoveDiagLeftDown).toBe(true);
  });

  it("should not move in a straight line", () => {
    const canMoveRight = Bishop.canBishopMove(onlyBishopBoard, { row: 4, col: 4 }, { row: 4, col: 6 });
    const canMoveLeft = Bishop.canBishopMove(onlyBishopBoard, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveUp = Bishop.canBishopMove(onlyBishopBoard, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveDown = Bishop.canBishopMove(onlyBishopBoard, { row: 4, col: 4 }, { row: 6, col: 4 });

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
  });

  it("should not move through pieces", () => {
    const bishopWithPiecesAround: Grid = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "p", null, null],
      [null, null, null, "P", "B", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const canMoveDiagRightDown = Bishop.canBishopMove(bishopWithPiecesAround, { row: 4, col: 4 }, { row: 6, col: 6 });
    const canMoveDiagLeftDown = Bishop.canBishopMove(bishopWithPiecesAround, { row: 4, col: 4 }, { row: 6, col: 2 });
    const canMoveDiagRightUp = Bishop.canBishopMove(bishopWithPiecesAround, { row: 4, col: 4 }, { row: 2, col: 6 });
    const canMoveDiagLeftUp = Bishop.canBishopMove(bishopWithPiecesAround, { row: 4, col: 4 }, { row: 2, col: 2 });

    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
  });
});
