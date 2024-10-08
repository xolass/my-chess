import { getCastleBoard } from "@/__tests__/castle/mocks/castleBoard";
import { Castle } from "@/classes/Castle";

describe("Castle test suite", () => {
  it("should be able to castle white king side", () => {
    const kingInitialPosition = { row: 7, col: 4 };
    const kingMovement = { row: 7, col: 6 };

    const newBoard = Castle.castle(getCastleBoard(), kingInitialPosition, kingMovement);

    expect(newBoard).toEqual([
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
    const kingInitialPosition = { row: 7, col: 4 };
    const kingMovement = { row: 7, col: 2 };

    const newBoard = Castle.castle(getCastleBoard(), kingInitialPosition, kingMovement);

    expect(newBoard).toEqual([
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
    const castleState = "k";
    const kingInitialPosition = { row: 0, col: 4 };
    const kingMovement = { row: 0, col: 6 };

    const newBoard = Castle.castle(getCastleBoard(), kingInitialPosition, kingMovement);

    expect(newBoard).toEqual([
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
    const kingInitialPosition = { row: 0, col: 4 };
    const kingMovement = { row: 0, col: 2 };

    const newBoard = Castle.castle(getCastleBoard(), kingInitialPosition, kingMovement);

    expect(newBoard).toEqual([
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
