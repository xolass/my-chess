import { setupGame } from "@/main";

describe("Capture mechanic", () => {
  it("Should not be able to capture allied pieces", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "Q", null, "B", null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
    const exd5 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 3 } });
    const exf5 = game.validateMove({ from: { row: 4, col: 4 }, to: { row: 3, col: 5 } });
    const qxe4 = game.validateMove({ from: { row: 3, col: 3 }, to: { row: 4, col: 4 } });
    const bxe4 = game.validateMove({ from: { row: 3, col: 5 }, to: { row: 4, col: 4 } });

    expect(exd5).toBe(false);
    expect(exf5).toBe(false);
    expect(qxe4).toBe(false);
    expect(bxe4).toBe(false);
  });

  // en passant has its own test suite
  it("Should be able to capture enemy pieces, taking it's place on the board", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "Q", null, "B", null, null],
      [null, null, null, null, "P", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const qxe6 = game.validateMove({ from: { row: 3, col: 3 }, to: { row: 2, col: 4 } });
    const bxe6 = game.validateMove({ from: { row: 3, col: 5 }, to: { row: 2, col: 4 } });

    expect(qxe6).toBe(true);
    expect(bxe6).toBe(true);
  });

  it("Should not be able to capture enemy pieces if there is an allied piece in the way", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "P", null, "P", null, null],
      [null, null, "Q", null, null, null, "B", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const qxe6 = game.validateMove({ from: { row: 5, col: 2 }, to: { row: 2, col: 4 } });
    const bxe6 = game.validateMove({ from: { row: 5, col: 7 }, to: { row: 2, col: 4 } });

    expect(qxe6).toBe(false);
    expect(bxe6).toBe(false);
  });

  it("Should not be able to capture enemy pieces if there is an enemy piece in the way", () => {
    const { game } = setupGame();
    const { board } = game;
    board.from([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, "p", null, null, null],
      [null, null, null, "p", null, "p", null, null],
      [null, null, "Q", null, null, null, "B", null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

    const qxe6 = game.validateMove({ from: { row: 5, col: 2 }, to: { row: 2, col: 4 } });
    const bxe6 = game.validateMove({ from: { row: 5, col: 7 }, to: { row: 2, col: 4 } });

    expect(qxe6).toBe(false);
    expect(bxe6).toBe(false);
  });
});
