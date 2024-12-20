import { Promotion } from "@/controllers/classes/Promotion";
import { setupGame } from "@/main";

describe("Promotion test suite", () => {
  it("should tell when a move is a promotion", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, "p", null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const isWhitePromoting = Promotion.isPromotion(board, { row: 1, col: 6 }, { row: 0, col: 6 });
    const isBlackPromoting = Promotion.isPromotion(board, { row: 6, col: 5 }, { row: 7, col: 5 });

    expect(isWhitePromoting).toBe(true);
    expect(isBlackPromoting).toBe(true);
  });

  it("should tell when a move is not a promotion", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, "R", null],
      [null, null, null, null, null, null, null, "P"],
      [null, null, null, "p", null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, "q", null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const pawnNotReachingOtherSide = Promotion.isPromotion(board, { row: 5, col: 7 }, { row: 6, col: 7 });
    const rookGettingToLastRank = Promotion.isPromotion(board, { row: 1, col: 6 }, { row: 0, col: 6 });
    const queenGettingToFirstRank = Promotion.isPromotion(board, { row: 6, col: 5 }, { row: 7, col: 5 });
    const pawnMovingToWrongSide = Promotion.isPromotion(board, { row: 1, col: 4 }, { row: 0, col: 4 });
    const pawnMovingMoreThanAllowed = Promotion.isPromotion(board, { row: 3, col: 3 }, { row: 7, col: 3 });

    expect(rookGettingToLastRank).toBe(false);
    expect(queenGettingToFirstRank).toBe(false);
    expect(pawnNotReachingOtherSide).toBe(false);
    expect(pawnMovingToWrongSide).toBe(false);
    expect(pawnMovingMoreThanAllowed).toBe(false);
  });

  it("should be able to transform a pawn into a queen when reaching the other side of the board", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "P", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "p", null],
      [null, null, null, null, null, null, null, null],
    ]);

    game.makeMove({
      from: { row: 1, col: 6 },
      to: { row: 0, col: 6 },
      flags: { promotion: { promotionPiece: "q" } },
    });

    expect(board.getLettersGrid()).toStrictEqual([
      [null, null, null, null, null, null, "Q", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "p", null],
      [null, null, null, null, null, null, null, null],
    ]);

    game.makeMove({
      from: { row: 6, col: 6 },
      to: { row: 7, col: 6 },
      flags: { promotion: { promotionPiece: "q" } },
    });

    expect(board.getLettersGrid()).toStrictEqual([
      [null, null, null, null, null, null, "Q", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, "q", null],
    ]);
  });
});

it("should be able to transform a pawn into a rook when reaching the other side of the board", () => {
  const { game } = setupGame();
  const { board } = game;
  board.from([
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "P", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "p", null],
    [null, null, null, null, null, null, null, null],
  ]);

  game.makeMove({
    from: { row: 1, col: 6 },
    to: { row: 0, col: 6 },
    flags: { promotion: { promotionPiece: "r" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [null, null, null, null, null, null, "R", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "p", null],
    [null, null, null, null, null, null, null, null],
  ]);

  game.makeMove({
    from: { row: 6, col: 6 },
    to: { row: 7, col: 6 },
    flags: { promotion: { promotionPiece: "r" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [null, null, null, null, null, null, "R", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "r", null],
  ]);
});

it("should be able to transform a pawn into a knight when reaching the other side of the board", () => {
  const { game } = setupGame();
  const { board } = game;
  board.from([
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "P", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "p", null],
    [null, null, null, null, null, null, null, null],
  ]);

  game.makeMove({
    from: { row: 1, col: 6 },
    to: { row: 0, col: 6 },
    flags: { promotion: { promotionPiece: "n" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [null, null, null, null, null, null, "N", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "p", null],
    [null, null, null, null, null, null, null, null],
  ]);

  game.makeMove({
    from: { row: 6, col: 6 },
    to: { row: 7, col: 6 },
    flags: { promotion: { promotionPiece: "n" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [null, null, null, null, null, null, "N", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "n", null],
  ]);
});

it("should be able to transform a pawn into a bishop when reaching the other side of the board", () => {
  const { game } = setupGame();
  const { board } = game;
  board.from([
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "P", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "p", null],
    [null, null, null, null, null, null, null, null],
  ]);

  game.makeMove({
    from: { row: 1, col: 6 },
    to: { row: 0, col: 6 },
    flags: { promotion: { promotionPiece: "b" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [null, null, null, null, null, null, "B", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "p", null],
    [null, null, null, null, null, null, null, null],
  ]);

  game.makeMove({
    from: { row: 6, col: 6 },
    to: { row: 7, col: 6 },
    flags: { promotion: { promotionPiece: "b" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [null, null, null, null, null, null, "B", null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, "b", null],
  ]);
});
