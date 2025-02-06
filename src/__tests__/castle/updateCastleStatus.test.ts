import { CastleManager } from "@/controllers/classes/CastleManager";
import { setupGame } from "@/main";
import { LettersGrid } from "@/types";

describe("Update castle status test suite", () => {
  const castleBoard: LettersGrid = [
    ["r", undefined, undefined, undefined, "k", undefined, undefined, "r"],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ["R", undefined, undefined, undefined, "K", undefined, undefined, "R"],
  ];
  const initialCastleStatus = "KQkq";

  it("should cancel castle rights on black king move", () => {
    const { game } = setupGame();
    const { board } = game;
    const kingInitialPosition = { row: 0, col: 4 };

    const newCastleStatusAfterKingMove = CastleManager.updateCastleStatus(
      board.from(castleBoard),
      kingInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterKingMove).toEqual("KQ");
  });

  it("should cancel castle rights on black king side on rook move", () => {
    const { game } = setupGame();
    const { board } = game;
    const rookInitialPosition = { row: 0, col: 7 };

    const newCastleStatusAfterRookMove = CastleManager.updateCastleStatus(
      board.from(castleBoard),
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("KQq");
  });
  it("should cancel castle rights on black queen side on rook move", () => {
    const { game } = setupGame();
    const { board } = game;
    const rookInitialPosition = { row: 0, col: 0 };

    const newCastleStatusAfterRookMove = CastleManager.updateCastleStatus(
      board.from(castleBoard),
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("KQk");
  });

  it("should cancel castle rights on white king move", () => {
    const { game } = setupGame();
    const { board } = game;
    const kingInitialPosition = { row: 7, col: 4 };
    const newCastleStatusAfterKingMove = CastleManager.updateCastleStatus(
      board.from(castleBoard),
      kingInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterKingMove).toEqual("kq");
  });

  it("should cancel castle rights on white king side on rook move", () => {
    const { game } = setupGame();
    const { board } = game;
    const rookInitialPosition = { row: 7, col: 7 };
    const newCastleStatusAfterRookMove = CastleManager.updateCastleStatus(
      board.from(castleBoard),
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("Qkq");
  });

  it("should cancel castle rights on white queen side on rook move", () => {
    const { game } = setupGame();
    const { board } = game;
    const rookInitialPosition = { row: 7, col: 0 };
    const newCastleStatusAfterRookMove = CastleManager.updateCastleStatus(
      board.from(castleBoard),
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("Kkq");
  });
});
