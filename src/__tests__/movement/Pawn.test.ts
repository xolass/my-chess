import { Pawn } from "@/classes/Pawn";
import { PieceLetter } from "@/types";

describe("Pawn movement actions", () => {
  it("should be able for white pawns to move only up", () => {
    const onlyPawnBoard: Array<Array<PieceLetter | null>> = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const canMoveUp = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 3, col: 4 });
    const canMoveDown = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 5, col: 4 });
    const canMoveLeft = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 4, col: 3 });
    const canMoveRight = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 4, col: 5 });

    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should be able for black pawns to move only down", () => {
    const onlyPawnBoard: Array<Array<PieceLetter | null>> = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const canMoveUp = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 3, col: 4 });
    const canMoveDown = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 5, col: 4 });
    const canMoveLeft = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 4, col: 3 });
    const canMoveRight = Pawn.canPawnMove(onlyPawnBoard, { row: 4, col: 4 }, { row: 4, col: 5 });

    expect(canMoveUp).toBe(false);
    expect(canMoveDown).toBe(true);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should be able for white pawns to move two squares on first move", () => {
    const onlyPawnBoard: Array<Array<PieceLetter | null>> = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const canMoveUp = Pawn.canPawnMove(onlyPawnBoard, { row: 6, col: 4 }, { row: 4, col: 4 });
    const canMoveDown = Pawn.canPawnMove(onlyPawnBoard, { row: 6, col: 4 }, { row: 7, col: 4 });
    const canMoveLeft = Pawn.canPawnMove(onlyPawnBoard, { row: 6, col: 4 }, { row: 6, col: 3 });
    const canMoveRight = Pawn.canPawnMove(onlyPawnBoard, { row: 6, col: 4 }, { row: 6, col: 5 });

    expect(canMoveUp).toBe(true);
    expect(canMoveDown).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });

  it("should be able for white pawns to move two squares on first move", () => {
    const onlyPawnBoard: Array<Array<PieceLetter | null>> = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const canMoveDown = Pawn.canPawnMove(onlyPawnBoard, { row: 1, col: 4 }, { row: 3, col: 4 });
    const canMoveUp = Pawn.canPawnMove(onlyPawnBoard, { row: 1, col: 4 }, { row: 0, col: 4 });
    const canMoveLeft = Pawn.canPawnMove(onlyPawnBoard, { row: 1, col: 4 }, { row: 1, col: 3 });
    const canMoveRight = Pawn.canPawnMove(onlyPawnBoard, { row: 1, col: 4 }, { row: 1, col: 5 });

    expect(canMoveDown).toBe(true);
    expect(canMoveUp).toBe(false);
    expect(canMoveLeft).toBe(false);
    expect(canMoveRight).toBe(false);
  });
});
