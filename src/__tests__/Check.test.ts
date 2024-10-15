import { King } from "@/classes/King";
import { Board } from "@/types";

describe("Test suite do detect if a king is in check", () => {
  it("should detect if a king is in check by a queen", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, "q", null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const isKingInCheck = King.isKingInCheck(board, { row: 3, col: 4 });

    expect(isKingInCheck).toBe(true);
  });
  it("should detect if a king is in check by a rook", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "r", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const isKingInCheck = King.isKingInCheck(board, { row: 3, col: 4 });

    expect(isKingInCheck).toBe(true);
  });
  it("should detect if a king is in check by a bishop", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, "b", null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const isKingInCheck = King.isKingInCheck(board, { row: 3, col: 4 });

    expect(isKingInCheck).toBe(true);
  });
  it("should detect if a king is in check by a knight", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "K", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "n", null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const isKingInCheck = King.isKingInCheck(board, { row: 3, col: 4 });

    expect(isKingInCheck).toBe(true);
  });
  it("should detect if a king is in check by a pawn", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "k", null, null, null],
      [null, null, null, "P", null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const isKingInCheck = King.isKingInCheck(board, { row: 3, col: 4 });

    expect(isKingInCheck).toBe(true);
  });
  it("should not be checked for allied pieces", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, "B", null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "R", "K", null, "Q", null],
      [null, null, null, "P", null, null, "N", null],
      [null, null, null, null, null, "N", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const isKingInCheck = King.isKingInCheck(board, { row: 3, col: 4 });

    expect(isKingInCheck).toBe(false);
  });
});
