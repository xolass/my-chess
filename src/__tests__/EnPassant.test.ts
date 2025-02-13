import { setupGame } from "@/main";
import { EnPassantManager } from "@/shared/classes/EnPassantManager";

describe("En passant mechanics", () => {
  it("Should detect if a movement is an en passant", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "R", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", "p", undefined, undefined],
      ["P", "p", undefined, undefined, undefined, undefined, undefined, "P"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const whitePiece = board.getSquare({ row: 3, col: 4 }).piece!;
    const blackPiece = board.getSquare({ row: 4, col: 1 }).piece!;
    const regularCapturePiece = board.getSquare({ row: 2, col: 3 }).piece!;
    const regularPawnMovementPiece = board.getSquare({ row: 3, col: 4 }).piece!;

    const enPassantTargetCoordinatesForWhite = { row: 2, col: 5 };
    const enPassantTargetCoordinatesForBlack = { row: 5, col: 0 };

    const forWhite = EnPassantManager.isEnPassant(whitePiece, { row: 2, col: 5 }, enPassantTargetCoordinatesForWhite);
    const forBlack = EnPassantManager.isEnPassant(blackPiece, { row: 5, col: 0 }, enPassantTargetCoordinatesForBlack);
    const regularCapture = EnPassantManager.isEnPassant(regularCapturePiece, { row: 4, col: 6 }, { row: 3, col: 5 });
    const regularPawnMovement = EnPassantManager.isEnPassant(
      regularPawnMovementPiece,
      { row: 2, col: 4 },
      enPassantTargetCoordinatesForWhite
    );

    expect(forWhite).toBe(true);
    expect(forBlack).toBe(true);
    expect(regularCapture).toBe(false);
    expect(regularPawnMovement).toBe(false);
  });

  it("Should capture the pawn behind the movement", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "R", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", "p", undefined, undefined],
      ["P", "p", undefined, undefined, undefined, undefined, undefined, "P"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
    game.enPassantTargetSquare = { row: 2, col: 5 };

    game.makeMove({
      from: { row: 3, col: 4 },
      to: { row: 2, col: 5 },
    });

    expect(board.getLettersGrid()).toEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "R", undefined, "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      ["P", "p", undefined, undefined, undefined, undefined, undefined, "P"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    game.enPassantTargetSquare = { row: 5, col: 0 };

    game.makeMove({
      from: { row: 4, col: 1 },
      to: { row: 5, col: 0 },
    });

    expect(board.getLettersGrid()).toEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "R", undefined, "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, "P"],
      ["p", undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);
  });
  it("Should check if a move enables en passant", () => {
    const { game } = setupGame();

    const from = { row: 6, col: 4 };
    const doubleMove = { row: 4, col: 4 };
    const singleMove = { row: 5, col: 4 };

    const piece = game.board.getSquare(from).piece;

    if (!piece) throw new Error("no piece");

    const valid = EnPassantManager.isMoveEnpassantEnabling(piece, from, doubleMove);
    const invalid = EnPassantManager.isMoveEnpassantEnabling(piece, from, singleMove);

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });
});
