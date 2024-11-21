import { EnPassant } from "@/controllers/classes/EnPassant";
import { setupGame } from "@/main";

describe("En passant mechanics", () => {
  it("Should detect if a movement is an en passant", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      ["P", "p", null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const enPassantTargetCoordinatesForWhite = { row: 2, col: 5 };
    const enPassantTargetCoordinatesForBlack = { row: 5, col: 0 };

    const isForWhite = EnPassant.isEnPassant(board, { row: 3, col: 4 }, enPassantTargetCoordinatesForWhite);
    const isForBlack = EnPassant.isEnPassant(board, { row: 4, col: 1 }, enPassantTargetCoordinatesForBlack);
    const isRegularCapture = EnPassant.isEnPassant(board, { row: 4, col: 6 }, { row: 3, col: 5 });
    const isRegularPawnMovement = EnPassant.isEnPassant(board, { row: 3, col: 4 }, { row: 2, col: 4 });
    const isRegularPieceMovement = EnPassant.isEnPassant(board, { row: 3, col: 2 }, enPassantTargetCoordinatesForWhite);

    expect(isForWhite).toBe(true);
    expect(isForBlack).toBe(true);
    expect(isRegularCapture).toBe(false);
    expect(isRegularPawnMovement).toBe(false);
    expect(isRegularPieceMovement).toBe(false);
  });

  it("Should detect if en passant is possible", () => {
    const enPassantTargetSquare = { row: 2, col: 5 };
    const enPassantTargetCoordinates = { row: 2, col: 5 };

    const can = EnPassant.canEnPassant(enPassantTargetCoordinates, enPassantTargetSquare);
    const cant = EnPassant.canEnPassant({ row: 3, col: 5 }, enPassantTargetSquare);

    expect(can).toBe(true);
    expect(cant).toBe(false);
  });

  it("Should capture the pawn behind the movement", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, null, null, null],
      [null, null, null, null, "P", "p", null, null],
      ["P", "p", null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    game.makeMove({
      from: { row: 3, col: 4 },
      to: { row: 2, col: 5 },
      flags: { enPassant: true },
    });

    expect(board.getLettersGrid()).toEqual([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, "P", null, null],
      [null, null, null, null, null, null, null, null],
      ["P", "p", null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    game.makeMove({
      from: { row: 4, col: 1 },
      to: { row: 5, col: 0 },
      flags: { enPassant: true },
    });

    expect(board.getLettersGrid()).toEqual([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", null, "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "P", null],
      ["p", null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
  });
});
