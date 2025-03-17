import { getCastleBoard } from "@/__tests__/castle/mocks/castleBoard";
import { setupGame } from "@/main";
import { CastleManager } from "@/shared/classes/CastleManager";
import { Colors } from "@/shared/types";

describe("Castle test suite", () => {
  it("should be able to castle white king side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());

    CastleManager.performCastleMove(board, game.currentPlayer, true);

    expect(board.getLettersGrid()).toEqual([
      ["r", undefined, undefined, undefined, "k", undefined, undefined, "r"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      ["R", undefined, undefined, undefined, undefined, "R", "K", undefined],
    ]);
  });
  it("should be able to castle white queen side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());

    CastleManager.performCastleMove(board, game.currentPlayer, false);

    expect(board.getLettersGrid()).toEqual([
      ["r", undefined, undefined, undefined, "k", undefined, undefined, "r"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, "K", "R", undefined, undefined, undefined, "R"],
    ]);
  });

  it("should be able to castle black king side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());
    game.currentTurn.currentPlayer = Colors.BLACK;

    CastleManager.performCastleMove(board, game.currentPlayer, true);

    expect(board.getLettersGrid()).toEqual([
      ["r", undefined, undefined, undefined, undefined, "r", "k", undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      ["R", undefined, undefined, undefined, "K", undefined, undefined, "R"],
    ]);
  });

  it("should be able to castle black queen side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());
    game.currentTurn.currentPlayer = Colors.BLACK;

    CastleManager.performCastleMove(board, game.currentPlayer, false);

    expect(board.getLettersGrid()).toEqual([
      [undefined, undefined, "k", "r", undefined, undefined, undefined, "r"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      ["R", undefined, undefined, undefined, "K", undefined, undefined, "R"],
    ]);
  });
});
