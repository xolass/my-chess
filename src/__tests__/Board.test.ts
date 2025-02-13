import { Board } from "@/shared/classes/Board";
import { Colors } from "@/shared/types";

describe("Board mechanics", () => {
  it("Should not be able build a board from an starting matrix", () => {
    const board = new Board();
    board.from([
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "P", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]);

    const pawn = board.getSquare({ row: 4, col: 4 }).piece;

    expect(pawn).not.toBe(undefined);
    expect(pawn?.color).toBe(Colors.WHITE);
    expect(pawn?.name).toBe("p");
    expect(pawn?.pieceLetter).toBe("P");
  });
});
