import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { PgnGamePlayer } from "@/shared/classes/PgnGamePlayer";

describe("Convert PGN to moves", () => {
  it("should get move from game notation for pawn moves", () => {
    const game = new Game(new Fen());

    const conversion = new PgnGamePlayer(game).playGameFromGameNotation(
      "1. e4 e5 2. d3 d5 3. f3 f5 4. g3 dxe4 5. fxe4 b5 6. exf5 b4 7. c4 bxc3 "
    );

    expect(conversion.moves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } }),
        expect.objectContaining({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } }),
        expect.objectContaining({ from: { row: 6, col: 3 }, to: { row: 5, col: 3 } }),
        expect.objectContaining({ from: { row: 1, col: 3 }, to: { row: 3, col: 3 } }),
        expect.objectContaining({ from: { row: 6, col: 5 }, to: { row: 5, col: 5 } }),
        expect.objectContaining({ from: { row: 1, col: 5 }, to: { row: 3, col: 5 } }),
        expect.objectContaining({ from: { row: 6, col: 6 }, to: { row: 5, col: 6 } }),
        expect.objectContaining({ from: { row: 3, col: 3 }, to: { row: 4, col: 4 } }),
        expect.objectContaining({ from: { row: 5, col: 5 }, to: { row: 4, col: 4 } }),
        expect.objectContaining({ from: { row: 1, col: 1 }, to: { row: 3, col: 1 } }),
        expect.objectContaining({ from: { row: 4, col: 4 }, to: { row: 3, col: 5 } }),
        expect.objectContaining({ from: { row: 3, col: 1 }, to: { row: 4, col: 1 } }),
        expect.objectContaining({ from: { row: 6, col: 2 }, to: { row: 4, col: 2 } }),
        expect.objectContaining({ from: { row: 4, col: 1 }, to: { row: 5, col: 2 } }),
      ])
    );
  });

  it("should play the beggining of a vienna gambit", () => {
    const game = new Game(new Fen());

    const conversion = new PgnGamePlayer(game).playGameFromGameNotation(
      "1. e4 e5 2. Nc3 Nf6 3. f4 exf4 4. e5 Ng8 5. d4 Nc6 6. Bxf4"
    );

    expect(conversion.moves).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } }),
        expect.objectContaining({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } }),
        expect.objectContaining({ from: { row: 7, col: 1 }, to: { row: 5, col: 2 } }),
        expect.objectContaining({ from: { row: 0, col: 6 }, to: { row: 2, col: 5 } }),
        expect.objectContaining({ from: { row: 6, col: 5 }, to: { row: 4, col: 5 } }),
        expect.objectContaining({ from: { row: 3, col: 4 }, to: { row: 4, col: 5 } }),
        expect.objectContaining({ from: { row: 4, col: 4 }, to: { row: 3, col: 4 } }),
        expect.objectContaining({ from: { row: 2, col: 5 }, to: { row: 0, col: 6 } }),
        expect.objectContaining({ from: { row: 6, col: 3 }, to: { row: 4, col: 3 } }),
        expect.objectContaining({ from: { row: 0, col: 1 }, to: { row: 2, col: 2 } }),
        expect.objectContaining({ from: { row: 7, col: 2 }, to: { row: 4, col: 5 } }),
      ])
    );
  });
  it("should play the beggining of a vienna gambit", () => {
    const game = new Game(new Fen());

    const move1 = new PgnGamePlayer(game).getCoordinatesFromGameNotation("e4");
    game.makeMove(move1);
    const move2 = new PgnGamePlayer(game).getCoordinatesFromGameNotation("e5");
    game.makeMove(move2);
    const move3 = new PgnGamePlayer(game).getCoordinatesFromGameNotation("Nc3");
    game.makeMove(move3);
    const move4 = new PgnGamePlayer(game).getCoordinatesFromGameNotation("Nf6");
    game.makeMove(move4);
    const move5 = new PgnGamePlayer(game).getCoordinatesFromGameNotation("f4");
    game.makeMove(move5);
    const move6 = new PgnGamePlayer(game).getCoordinatesFromGameNotation("exf4");
    game.makeMove(move6);

    expect(move1).toStrictEqual(expect.objectContaining({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } }));
    expect(move2).toStrictEqual(expect.objectContaining({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } }));
    expect(move3).toStrictEqual(expect.objectContaining({ from: { row: 7, col: 1 }, to: { row: 5, col: 2 } }));
    expect(move4).toStrictEqual(expect.objectContaining({ from: { row: 0, col: 6 }, to: { row: 2, col: 5 } }));
    expect(move5).toStrictEqual(expect.objectContaining({ from: { row: 6, col: 5 }, to: { row: 4, col: 5 } }));
    expect(move6).toStrictEqual(expect.objectContaining({ from: { row: 3, col: 4 }, to: { row: 4, col: 5 } }));
  });
});
