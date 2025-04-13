import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";

describe("Update castle status test suite", () => {
  it("should cancel castle rights on black king move", () => {
    const game = new Game(new Fen("r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1"));
    const kingInitialPosition = { row: 0, col: 4 };

    game.castle.updateCastleStatus(game, { to: { row: 0, col: 3 }, from: kingInitialPosition });
    const newCastleStatusAfterKingMove = game.castleStatus;
    expect(newCastleStatusAfterKingMove).toEqual("KQ");
  });

  it("should cancel castle rights on black king side on rook move", () => {
    const game = new Game(new Fen("r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1"));
    const rookInitialPosition = { row: 0, col: 7 };

    game.castle.updateCastleStatus(game, { to: { row: 0, col: 6 }, from: rookInitialPosition });
    const newCastleStatusAfterRookMove = game.castleStatus;
    expect(newCastleStatusAfterRookMove).toEqual("KQq");
  });
  it("should cancel castle rights on black queen side on rook move", () => {
    const game = new Game(new Fen("r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1"));
    const rookInitialPosition = { row: 0, col: 0 };

    game.castle.updateCastleStatus(game, { to: { row: 0, col: 1 }, from: rookInitialPosition });
    const newCastleStatusAfterRookMove = game.castleStatus;
    expect(newCastleStatusAfterRookMove).toEqual("KQk");
  });

  it("should cancel castle rights on white king move", () => {
    const game = new Game(new Fen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1"));
    const kingInitialPosition = { row: 7, col: 4 };
    game.castle.updateCastleStatus(game, { to: { row: 7, col: 3 }, from: kingInitialPosition });
    const newCastleStatusAfterKingMove = game.castleStatus;
    expect(newCastleStatusAfterKingMove).toEqual("kq");
  });

  it("should cancel castle rights on white king side on rook move", () => {
    const game = new Game(new Fen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1"));
    const rookInitialPosition = { row: 7, col: 7 };
    game.castle.updateCastleStatus(game, { to: { row: 7, col: 6 }, from: rookInitialPosition });
    const newCastleStatusAfterRookMove = game.castleStatus;
    expect(newCastleStatusAfterRookMove).toEqual("Qkq");
  });

  it("should cancel castle rights on white queen side on rook move", () => {
    const game = new Game(new Fen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1"));
    const rookInitialPosition = { row: 7, col: 0 };
    game.castle.updateCastleStatus(game, { to: { row: 7, col: 1 }, from: rookInitialPosition });
    const newCastleStatusAfterRookMove = game.castleStatus;
    expect(newCastleStatusAfterRookMove).toEqual("Kkq");
  });
});
