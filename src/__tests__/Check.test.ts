import { King } from "@/controllers/classes/King";
import { setupGame } from "@/main";

describe("Test suite do detect if a king is in check", () => {
  it("should detect if a king is in check by a queen", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, "q", null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const piece = board.getSquare({ row: 3, col: 4 }).piece;

    if (piece instanceof King) {
      const isKingInCheck = piece.isInCheck(board);

      expect(isKingInCheck).toBe(true);
    } else {
      throw new Error("Piece is not a king");
    }
  });
  it("should detect if a king is in check by a rook", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "r", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const piece = board.getSquare({ row: 3, col: 4 }).piece;

    if (piece instanceof King) {
      const isKingInCheck = piece.isInCheck(board);

      expect(isKingInCheck).toBe(true);
    } else {
      throw new Error("Piece is not a king");
    }
  });
  it("should detect if a king is in check by a bishop", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, "b", null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const piece = board.getSquare({ row: 3, col: 4 }).piece;

    if (piece instanceof King) {
      const isKingInCheck = piece.isInCheck(board);

      expect(isKingInCheck).toBe(true);
    } else {
      throw new Error("Piece is not a king");
    }
  });
  it("should detect if a king is in check by a knight", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "n", null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const piece = board.getSquare({ row: 3, col: 4 }).piece;

    if (piece instanceof King) {
      const isKingInCheck = piece.isInCheck(board);

      expect(isKingInCheck).toBe(true);
    } else {
      throw new Error("Piece is not a king");
    }
  });
  it("should detect if a king is in check by a pawn", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "k", null, null, null],
      [null, null, null, "P", null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const piece = board.getSquare({ row: 3, col: 4 }).piece;

    if (piece instanceof King) {
      const isKingInCheck = piece.isInCheck(board);

      expect(isKingInCheck).toBe(true);
    } else {
      throw new Error("Piece is not a king");
    }
  });
  it("should not be checked for allied pieces", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, "B", null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", "K", null, "Q", null],
      [null, null, null, "P", null, null, "N", null],
      [null, null, null, null, null, "N", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const piece = board.getSquare({ row: 3, col: 4 }).piece;

    if (piece instanceof King) {
      const isKingInCheck = piece.isInCheck(board);

      expect(isKingInCheck).toBe(false);
    } else {
      throw new Error("Piece is not a king");
    }
  });
});
