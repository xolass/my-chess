import { Board } from "@/controllers/classes/Board";
import { Colors } from "@/types";

describe("Board mechanics", () => {
  it("Should not be able build a board from an starting matrix", () => {
    const board = new Board();
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const pawn = board.getSquare({ row: 4, col: 4 }).piece;

    expect(pawn).not.toBe(null);
    expect(pawn?.color).toBe(Colors.WHITE);
    expect(pawn?.name).toBe("p");
    expect(pawn?.pieceLetter).toBe("P");
  });
});
