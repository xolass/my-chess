import { Board } from "@/controllers/classes/Board";
import { Game } from "@/controllers/classes/Game";

describe("Make game moves", () => {
  it("should make pawn moves", () => {
    const board = new Board();
    const game = new Game(board);

    game.makeMove({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
    game.makeMove({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
    game.makeMove({ from: { row: 6, col: 3 }, to: { row: 5, col: 3 } });
    game.makeMove({ from: { row: 1, col: 3 }, to: { row: 3, col: 3 } });
    game.makeMove({ from: { row: 6, col: 5 }, to: { row: 5, col: 5 } });
    game.makeMove({ from: { row: 1, col: 5 }, to: { row: 3, col: 5 } });
    game.makeMove({ from: { row: 6, col: 6 }, to: { row: 5, col: 6 } });
    game.makeMove({ from: { row: 3, col: 3 }, to: { row: 4, col: 4 } });
    game.makeMove({ from: { row: 5, col: 5 }, to: { row: 4, col: 4 } });
    game.makeMove({ from: { row: 1, col: 1 }, to: { row: 3, col: 1 } });
    game.makeMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    game.makeMove({ from: { row: 3, col: 1 }, to: { row: 4, col: 1 } });
    game.makeMove({ from: { row: 6, col: 2 }, to: { row: 4, col: 2 } });
    game.makeMove({
      from: { row: 4, col: 1 },
      to: { row: 5, col: 2 },
      flags: {
        enPassant: {
          enPassantTargetSquare: { row: 4, col: 2 },
        },
      },
    });

    expect(board.getGrid()).toStrictEqual([
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", null, "p", null, null, null, "p", "p"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", "P", null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, "p", "P", null, null, "P", null],
      ["P", "P", null, null, null, null, null, "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ]);
  });
});
