import { getCastleBoard } from "@/__tests__/castle/mocks/castleBoard";
import { setupGame } from "@/main";
import { Colors } from "@/types";

describe("Castle test suite", () => {
  it("should be able to castle white king side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());

    game.castleMove(true);

    expect(board.getLettersGrid()).toEqual([
      ["r", null, null, null, "k", null, null, "r"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["R", null, null, null, null, "R", "K", null],
    ]);
  });
  it("should be able to castle white queen side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());

    game.castleMove(false);

    expect(board.getLettersGrid()).toEqual([
      ["r", null, null, null, "k", null, null, "r"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, "K", "R", null, null, null, "R"],
    ]);
  });

  it("should be able to castle black king side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());
    game.currentPlayer = Colors.BLACK;

    game.castleMove(true);

    expect(board.getLettersGrid()).toEqual([
      ["r", null, null, null, null, "r", "k", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["R", null, null, null, "K", null, null, "R"],
    ]);
  });

  it("should be able to castle black queen side", () => {
    const { game } = setupGame();
    const { board } = game;

    board.from(getCastleBoard());
    game.currentPlayer = Colors.BLACK;

    game.castleMove(false);

    expect(board.getLettersGrid()).toEqual([
      [null, null, "k", "r", null, null, null, "r"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["R", null, null, null, "K", null, null, "R"],
    ]);
  });
});
