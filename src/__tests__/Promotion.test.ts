import { setupGame } from "@/main";
import { PromotionManager } from "@/shared/classes/PromotionManager";

describe("Promotion test suite", () => {
  it("should tell when a move is a promotion", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, "P"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, "p", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const isWhitePromoting = PromotionManager.isPromotion(board, { row: 1, col: 6 }, { row: 0, col: 6 });
    const isBlackPromoting = PromotionManager.isPromotion(board, { row: 6, col: 5 }, { row: 7, col: 5 });

    expect(isWhitePromoting).toBe(true);
    expect(isBlackPromoting).toBe(true);
  });

  it("should tell when a move is not a promotion", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", undefined, undefined, "R"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, "P"],
      [undefined, undefined, undefined, "p", undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, "q", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const pawnNotReachingOtherSide = PromotionManager.isPromotion(board, { row: 5, col: 7 }, { row: 6, col: 7 });
    const rookGettingToLastRank = PromotionManager.isPromotion(board, { row: 1, col: 6 }, { row: 0, col: 6 });
    const queenGettingToFirstRank = PromotionManager.isPromotion(board, { row: 6, col: 5 }, { row: 7, col: 5 });
    const pawnMovingToWrongSide = PromotionManager.isPromotion(board, { row: 1, col: 4 }, { row: 0, col: 4 });
    const pawnMovingMoreThanAllowed = PromotionManager.isPromotion(board, { row: 3, col: 3 }, { row: 7, col: 3 });

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
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, "P", undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    game.makeMove({
      from: { row: 1, col: 6 },
      to: { row: 0, col: 6 },
      flags: { promotion: { promotionPiece: "q" } },
    });

    expect(board.getLettersGrid()).toStrictEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, "Q", undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    game.makeMove({
      from: { row: 6, col: 6 },
      to: { row: 7, col: 6 },
      flags: { promotion: { promotionPiece: "q" } },
    });

    expect(board.getLettersGrid()).toStrictEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, "Q", undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, "q", undefined],
    ]);
  });
});

it("should be able to transform a pawn into a rook when reaching the other side of the board", () => {
  const { game } = setupGame();
  const { board } = game;
  board.from([
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "P", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);

  game.makeMove({
    from: { row: 1, col: 6 },
    to: { row: 0, col: 6 },
    flags: { promotion: { promotionPiece: "r" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, "R", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);

  game.makeMove({
    from: { row: 6, col: 6 },
    to: { row: 7, col: 6 },
    flags: { promotion: { promotionPiece: "r" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, "R", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "r", undefined],
  ]);
});

it("should be able to transform a pawn into a knight when reaching the other side of the board", () => {
  const { game } = setupGame();
  const { board } = game;
  board.from([
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "P", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);

  game.makeMove({
    from: { row: 1, col: 6 },
    to: { row: 0, col: 6 },
    flags: { promotion: { promotionPiece: "n" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, "N", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);

  game.makeMove({
    from: { row: 6, col: 6 },
    to: { row: 7, col: 6 },
    flags: { promotion: { promotionPiece: "n" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, "N", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "n", undefined],
  ]);
});

it("should be able to transform a pawn into a bishop when reaching the other side of the board", () => {
  const { game } = setupGame();
  const { board } = game;
  board.from([
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "P", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);

  game.makeMove({
    from: { row: 1, col: 6 },
    to: { row: 0, col: 6 },
    flags: { promotion: { promotionPiece: "b" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, "B", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "p", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);

  game.makeMove({
    from: { row: 6, col: 6 },
    to: { row: 7, col: 6 },
    flags: { promotion: { promotionPiece: "b" } },
  });

  expect(board.getLettersGrid()).toStrictEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, "B", undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, "b", undefined],
  ]);
});
