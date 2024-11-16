import { Castle } from "@/controllers/classes/Castle";
import { Grid } from "@/types";

describe("Update castle status test suite", () => {
  let castleBoard: Grid;
  const initialCastleStatus = "KQkq";

  beforeEach(() => {
    castleBoard = [
      ["r", null, null, null, "k", null, null, "r"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["R", null, null, null, "K", null, null, "R"],
    ];
  });

  it("should cancel castle rights on black king move", () => {
    const kingInitialPosition = { row: 0, col: 4 };

    const newCastleStatusAfterKingMove = Castle.updateCastleStatus(
      castleBoard,
      kingInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterKingMove).toEqual("KQ");
  });

  it("should cancel castle rights on black king side on rook move", () => {
    const rookInitialPosition = { row: 0, col: 7 };

    const newCastleStatusAfterRookMove = Castle.updateCastleStatus(
      castleBoard,
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("KQq");
  });
  it("should cancel castle rights on black queen side on rook move", () => {
    const rookInitialPosition = { row: 0, col: 0 };

    const newCastleStatusAfterRookMove = Castle.updateCastleStatus(
      castleBoard,
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("KQk");
  });

  it("should cancel castle rights on white king move", () => {
    const kingInitialPosition = { row: 7, col: 4 };
    const newCastleStatusAfterKingMove = Castle.updateCastleStatus(
      castleBoard,
      kingInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterKingMove).toEqual("kq");
  });

  it("should cancel castle rights on white king side on rook move", () => {
    const rookInitialPosition = { row: 7, col: 7 };
    const newCastleStatusAfterRookMove = Castle.updateCastleStatus(
      castleBoard,
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("Qkq");
  });

  it("should cancel castle rights on white queen side on rook move", () => {
    const rookInitialPosition = { row: 7, col: 0 };
    const newCastleStatusAfterRookMove = Castle.updateCastleStatus(
      castleBoard,
      rookInitialPosition,
      initialCastleStatus
    );

    expect(newCastleStatusAfterRookMove).toEqual("Kkq");
  });
});
