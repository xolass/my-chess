import { Game } from "@/shared/classes/Game";

describe("Make game moves", () => {
  it("should make pawn moves", () => {
    const game = new Game();

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
    game.makeMove({ from: { row: 4, col: 1 }, to: { row: 5, col: 2 } });

    expect(game.board.getLettersGrid()).toEqual([
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", undefined, "p", undefined, undefined, undefined, "p", "p"],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "p", "P", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, "p", "P", undefined, undefined, "P", undefined],
      ["P", "P", undefined, undefined, undefined, undefined, undefined, "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ]);
  });
});
