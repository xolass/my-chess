import { Piece } from "@/controllers/classes/Piece";
import { Board } from "@/types";

describe("Capture mechanic", () => {
  it("Should not be able to capture allied pieces", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "Q", null, "B", null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    const exd5 = Piece.canCapture(board, { row: 4, col: 4 }, { row: 3, col: 3 });
    const exf5 = Piece.canCapture(board, { row: 4, col: 4 }, { row: 3, col: 5 });
    const qxe4 = Piece.canCapture(board, { row: 3, col: 3 }, { row: 4, col: 4 });
    const bxe4 = Piece.canCapture(board, { row: 3, col: 5 }, { row: 4, col: 4 });

    expect(exd5).toBe(false);
    expect(exf5).toBe(false);
    expect(qxe4).toBe(false);
    expect(bxe4).toBe(false);
  });

  // en passant has its own test suite
  it("Should be able to capture enemy pieces, taking it's place on the board", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "Q", null, "B", null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const qxe6 = Piece.canCapture(board, { row: 3, col: 3 }, { row: 2, col: 4 });
    const bxe6 = Piece.canCapture(board, { row: 3, col: 5 }, { row: 2, col: 4 });

    expect(qxe6).toBe(true);
    expect(bxe6).toBe(true);
  });

  it("Should not be able to capture enemy pieces if there is an allied piece in the way", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "P", null, "P", null, null],
      [null, null, "Q", null, null, null, "B", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const qxe6 = Piece.canCapture(board, { row: 5, col: 2 }, { row: 2, col: 4 });
    const bxe6 = Piece.canCapture(board, { row: 5, col: 7 }, { row: 2, col: 4 });

    expect(qxe6).toBe(false);
    expect(bxe6).toBe(false);
  });

  it("Should not be able to capture enemy pieces if there is an enemy piece in the way", () => {
    const board: Board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "p", null, "p", null, null],
      [null, null, "Q", null, null, null, "B", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    const qxe6 = Piece.canCapture(board, { row: 5, col: 2 }, { row: 2, col: 4 });
    const bxe6 = Piece.canCapture(board, { row: 5, col: 7 }, { row: 2, col: 4 });

    expect(qxe6).toBe(false);
    expect(bxe6).toBe(false);
  });
});
