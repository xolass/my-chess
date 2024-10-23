import { Queen } from "@/controllers/classes/Queen";
import { Board } from "@/types";

let onlyQueenBoard: Board;

beforeEach(() => {
  onlyQueenBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, "Q", null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
});

describe("Queen movement actions", () => {
  it("should be able to move in any straight line direction", () => {
    const canMoveDiagRightDown = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 6, col: 6 });
    const canMoveDiagLeftDown = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 6, col: 2 });
    const canMoveDiagRightUp = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 6 });
    const canMoveDiagLeftUp = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 2 });
    const canMoveUp = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveDown = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 6, col: 4 });
    const canMoveLeft = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveRight = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 4, col: 6 });

    expect(canMoveDiagRightDown).toBe(true);
    expect(canMoveDiagLeftDown).toBe(true);
    expect(canMoveDiagRightUp).toBe(true);
    expect(canMoveDiagLeftUp).toBe(true);
    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(true);
    expect(canMoveLeft).toBe(true);
    expect(canMoveRight).toBe(true);
  });

  it("should not be able to move to positions that are not straight lines", () => {
    const canMoveDiagRightDown = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 6, col: 5 });
    const canMoveDiagLeftDown = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 6, col: 7 });
    const canMoveDiagRightUp = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 0 });
    const canMoveDiagLeftUp = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 1 });
    const canMoveUp = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 7 });
    const canMoveDown = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 6, col: 0 });
    const canMoveLeft = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 2, col: 7 });
    const canMoveRight = Queen.canQueenMove(onlyQueenBoard, { row: 4, col: 4 }, { row: 0, col: 6 });

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
    const queenWithAllyBoard: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, "P", "Q", "P", null, null],
      [null, null, null, "P", "P", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const canMoveDiagRightDown = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 6, col: 6 });
    const canMoveDiagLeftDown = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 6, col: 2 });
    const canMoveDiagRightUp = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 2, col: 6 });
    const canMoveDiagLeftUp = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 2, col: 2 });
    const canMoveUp = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 2, col: 4 });
    const canMoveDown = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 6, col: 4 });
    const canMoveLeft = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 4, col: 2 });
    const canMoveRight = Queen.canQueenMove(queenWithAllyBoard, { row: 4, col: 4 }, { row: 4, col: 6 });

    expect(canMoveDiagRightDown).toBe(false);
    expect(canMoveDiagLeftDown).toBe(false);
    expect(canMoveDiagRightUp).toBe(false);
    expect(canMoveDiagLeftUp).toBe(false);
    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });
});
