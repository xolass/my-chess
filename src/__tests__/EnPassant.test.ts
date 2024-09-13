import { canEnPassant, enPassant, isEnPassant } from "@/auxFunctions";
import { PieceLetter } from "@/types";

describe("En passant mechanics", () => {
  it("Should detect if a movement is an en passant", () => {
    const enPassantBoard: Array<Array<PieceLetter | null>> = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      [null, null, null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const enPassantTargetCoordinates = { row: 2, col: 5 };

    const is = isEnPassant(enPassantBoard, { row: 3, col: 4 }, enPassantTargetCoordinates);
    const isRegularCapture = isEnPassant(enPassantBoard, { row: 4, col: 6 }, { row: 3, col: 5 });
    const isRegularPawnMovement = isEnPassant(enPassantBoard, { row: 3, col: 4 }, { row: 2, col: 4 });
    const isRegularPieceMovement = isEnPassant(enPassantBoard, { row: 3, col: 2 }, enPassantTargetCoordinates);

    expect(is).toBe(true);
    expect(isRegularCapture).toBe(false);
    expect(isRegularPawnMovement).toBe(false);
    expect(isRegularPieceMovement).toBe(false);
  });

  it("Should detect if en passant is possible", () => {
    const enPassantTargetSquare = "f6";
    const enPassantTargetCoordinates = { row: 2, col: 5 };

    const can = canEnPassant(enPassantTargetCoordinates, enPassantTargetSquare);
    const cant = canEnPassant({ row: 3, col: 5 }, enPassantTargetSquare);

    expect(can).toBe(true);
    expect(cant).toBe(false);
  });

  it("Should capture the pawn behind the movement", () => {
    const enPassantBoard: Array<Array<PieceLetter | null>> = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      [null, null, null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const from = { row: 3, col: 4 };
    const to = { row: 2, col: 5 };

    const newBoard = enPassant(enPassantBoard, from, to);

    expect(newBoard).toEqual([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
  });
});
