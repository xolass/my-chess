import { King } from "@/controllers/classes/pieces/King";
import { setupGame } from "@/main";
import { nameClassRelation } from "@/utils";

describe("Test suite do detect if a king is in check", () => {
  it("should detect if a king is in check by a queen", () => {
    console.log({ nameClassRelation });
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, "q", undefined, "K", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "r", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, "b", undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "n", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "k", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "P", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, "B", undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "R", "K", undefined, undefined, "Q"],
      [undefined, undefined, undefined, "P", undefined, undefined, undefined, "N"],
      [undefined, undefined, undefined, undefined, undefined, "N", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
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

describe("Test suite do move away from checks", () => {
  it("should not let king to move from a check into a check", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "q", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const invalid1 = game.validateMove({ from: { row: 3, col: 4 }, to: { row: 4, col: 4 } });
    const invalid2 = game.validateMove({ from: { row: 3, col: 4 }, to: { row: 2, col: 5 } }); // edge case, the king is supposedly blocking the queen for the king after the move

    expect(invalid1).toBe(false);
    expect(invalid2).toBe(false);
  });

  it("should not let king to move out of a check into a check", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "q", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const invalid1 = game.validateMove({ from: { row: 2, col: 4 }, to: { row: 3, col: 4 } });
    const invalid2 = game.validateMove({ from: { row: 2, col: 4 }, to: { row: 2, col: 3 } });

    expect(invalid1).toBe(false);
    expect(invalid2).toBe(false);
  });

  it("should let king to move out of check", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "q", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const valid = game.validateMove({ from: { row: 3, col: 4 }, to: { row: 2, col: 4 } });

    expect(valid).toBe(true);
  });

  it("should let king capture out of check", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "q", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const valid = game.validateMove({ from: { row: 3, col: 4 }, to: { row: 4, col: 3 } });

    expect(valid).toBe(true);
  });

  it("should not let king capture out of check if the piece is defended", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined],
      ["r", undefined, undefined, undefined, "q", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const invalid = game.validateMove({ from: { row: 3, col: 4 }, to: { row: 4, col: 3 } });

    expect(invalid).toBe(false);
  });
});

describe("Test suite do defend king with other pieces", () => {
  it("should let pieces to go in front of king defending check", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "K", undefined, undefined, undefined, undefined, undefined],
      ["R", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, "q", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const valid = game.validateMove({ from: { row: 3, col: 0 }, to: { row: 3, col: 3 } });
    const invalid = game.validateMove({ from: { row: 3, col: 0 }, to: { row: 3, col: 2 } });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  it("should not let pinned pieces to go in front of king defending check", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, "r", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "B", undefined, undefined, undefined, undefined],
      [undefined, "q", undefined, undefined, "K", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const invalid = game.validateMove({ from: { row: 2, col: 4 }, to: { row: 3, col: 3 } });

    expect(invalid).toBe(false);
  });
});
