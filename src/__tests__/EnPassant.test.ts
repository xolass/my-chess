import { Pawn } from "@/controllers/classes/Pawn";
import { Board } from "@/types";

describe("En passant mechanics", () => {
  it("Should detect if a movement is an en passant", () => {
    const enPassantBoard: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      ["P", "p", null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const enPassantTargetCoordinatesForWhite = { row: 2, col: 5 };
    const enPassantTargetCoordinatesForBlack = { row: 5, col: 0 };

    const isForWhite = Pawn.isEnPassant(enPassantBoard, { row: 3, col: 4 }, enPassantTargetCoordinatesForWhite);
    const isForBlack = Pawn.isEnPassant(enPassantBoard, { row: 4, col: 1 }, enPassantTargetCoordinatesForBlack);
    const isRegularCapture = Pawn.isEnPassant(enPassantBoard, { row: 4, col: 6 }, { row: 3, col: 5 });
    const isRegularPawnMovement = Pawn.isEnPassant(enPassantBoard, { row: 3, col: 4 }, { row: 2, col: 4 });
    const isRegularPieceMovement = Pawn.isEnPassant(
      enPassantBoard,
      { row: 3, col: 2 },
      enPassantTargetCoordinatesForWhite
    );

    expect(isForWhite).toBe(true);
    expect(isForBlack).toBe(true);
    expect(isRegularCapture).toBe(false);
    expect(isRegularPawnMovement).toBe(false);
    expect(isRegularPieceMovement).toBe(false);
  });

  it("Should detect if en passant is possible", () => {
    const enPassantTargetSquare = "f6";
    const enPassantTargetCoordinates = { row: 2, col: 5 };

    const can = Pawn.canEnPassant(enPassantTargetCoordinates, enPassantTargetSquare);
    const cant = Pawn.canEnPassant({ row: 3, col: 5 }, enPassantTargetSquare);

    expect(can).toBe(true);
    expect(cant).toBe(false);
  });

  it("Should capture the pawn behind the movement", () => {
    const enPassantBoard: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      ["P", "p", null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const from1 = { row: 3, col: 4 };
    const to1 = { row: 2, col: 5 };

    const from2 = { row: 4, col: 1 };
    const to2 = { row: 5, col: 0 };

    const newBoard1 = Pawn.enPassant(enPassantBoard, from1, to1);
    const newBoard2 = Pawn.enPassant(enPassantBoard, from2, to2);

    expect(newBoard1).toEqual([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, "P", null, null],
      [null, null, null, null, null, null, null, null],
      ["P", "p", null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    expect(newBoard2).toEqual([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      [null, null, null, null, null, null, "P", null],
      ["p", null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
  });
});
