import { Rook } from "@/classes/Rook";
import { Board } from "@/types";

let onlyRookBoard: Board;

beforeEach(() => {
  onlyRookBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "R", null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
});

describe("Rook piece actions", () => {
  it("should be able to move UP in a straight line", () => {
    const rookWithOnlyUpFree: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "R", "P", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveUp = Rook.canRookMove(rookWithOnlyUpFree, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveRight = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 4, col: 6 });
    const canMoveLeft = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveDown = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 6, col: 4 });

    expect(canMoveRight).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveDown).toBe(true);
    expect(canMoveUp).toBe(true);
  });
  it("should be able to move DOWN in a straight line", () => {
    const rookWithOnlyDownFree: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "P", "R", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveDown = Rook.canRookMove(rookWithOnlyDownFree, { row: 4, col: 4 }, { row: 6, col: 4 });

    expect(canMoveDown).toBe(true);
  });

  it("should be able to move LEFT in a straight line", () => {
    const rookWithOnlyLeftFree: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, "R", "P", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveLeft = Rook.canRookMove(rookWithOnlyLeftFree, { row: 4, col: 4 }, { row: 4, col: 2 });

    expect(canMoveLeft).toBe(true);
  });

  it("should be able to move RIGHT in a straight line", () => {
    const rookWithOnlyUpFree: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, "P", "R", null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveRight = Rook.canRookMove(rookWithOnlyUpFree, { row: 4, col: 4 }, { row: 4, col: 6 });

    expect(canMoveRight).toBe(true);
  });

  it("should not be able to move in diagonals", () => {
    const canMoveRight = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 4, col: 6 });
    const canMoveLeft = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveUp = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveDown = Rook.canRookMove(onlyRookBoard, { row: 4, col: 4 }, { row: 6, col: 4 });

    expect(canMoveRight).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(true);
  });

  it("should not move through pieces", () => {
    const rookWithPiecesAround: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, "P", "R", "p", null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const canMoveRight = Rook.canRookMove(rookWithPiecesAround, { row: 4, col: 4 }, { row: 4, col: 6 });
    const canMoveLeft = Rook.canRookMove(rookWithPiecesAround, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveUp = Rook.canRookMove(rookWithPiecesAround, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveDown = Rook.canRookMove(rookWithPiecesAround, { row: 4, col: 4 }, { row: 6, col: 4 });

    expect(canMoveRight).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
  });
});
