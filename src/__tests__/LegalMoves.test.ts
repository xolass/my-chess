import { Fen } from "@/shared/classes/Fen";
import { Game } from "@/shared/classes/Game";
import { LegalMovesManager } from "@/shared/classes/LegalMovesManager";
import { FenType } from "@/shared/types";
import legalMovesList from "./mocks/legal_moves.json";

describe("Compare amount of legal moves in different positions", () => {
  it("should get amount of legal moves correctly", () => {
    Object.entries(legalMovesList).forEach(([position, legalMovesAmount]) => {
      const game = new Game(new Fen(position as FenType));

      const legalMoves = LegalMovesManager.calculateLegalMoves(game.currentTurn);

      const calculatedLegalMoves = legalMoves.reduce((acc, curr) => {
        return acc + curr.validLegalMoves.length;
      }, 0);

      console.info({ calculatedLegalMoves, legalMovesAmount, position });

      expect(calculatedLegalMoves).toEqual(legalMovesAmount);
    });
  });

  it("single position", () => {
    const singlePosition = { "8/8/8/8/8/1K6/8/kQ6 b - - 0 1": 1 };

    Object.entries(singlePosition).forEach(([position, legalMovesAmount]) => {
      const fen = new Fen(position as FenType);
      const game = new Game(fen);

      const legalMoves = LegalMovesManager.calculateLegalMoves(game.currentTurn);

      const calculatedLegalMoves = legalMoves.reduce((acc, curr) => {
        return acc + curr.validLegalMoves.length;
      }, 0);

      console.info({
        calculatedLegalMoves,
        legalMovesAmount,
        position,
        legalMoves: JSON.stringify(
          legalMoves.filter(({ validLegalMoves }) => validLegalMoves.length),
          undefined,
          2
        ),
      });
    });
  });
});

// {
//   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1": 20,
//   "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1": 25,
//   "r1bqkbnr/pppppppp/2n5/8/3P4/4P3/PPP2PPP/RNBQKBNR b KQkq - 0 5": 22,
//   "4k3/8/8/8/8/8/4R3/4K3 b - - 0 1": 4,
//   "8/8/8/8/8/4k3/8/4K3 w - - 0 1": 2,
//   "8/8/3p4/8/8/8/8/8 w - - 0 1": 0,
//   "rnbqkb1r/pppppppp/5n2/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2": 20,
//   "8/8/8/8/3Q4/8/8/8 w - - 0 1": 27,
//   "r1bqkbnr/pppp1ppp/2n5/4p3/3P4/4P3/PPP2PPP/RNBQKBNR w KQkq e6 0 4": 35,
//   "8/8/8/8/4k3/8/4P3/4K3 w - - 0 1": 5,
//   "8/8/8/8/8/8/6P1/4K2k w - - 0 1": 7,
//   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1": 20,
//   "8/8/8/8/3P4/4k3/8/4K3 w - - 0 1": 3,
//   "r1bq1rk1/pppp1ppp/2n5/4p3/3P4/2N1P3/PPP2PPP/R1BQK1NR b KQ - 0 7": 27,
//   "r1bq1rk1/pppp1ppp/2n2n2/4p3/3P4/2N1P3/PPP2PPP/R1BQK1NR w KQ - 0 8": 33,
//   "8/8/8/8/4k3/8/3Q4/4K3 w - - 0 1": 26,
//   "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R b KQkq - 0 1": 25,
//   "8/8/8/3p4/8/8/8/4K3 w - - 0 1": 5,
//   "8/8/8/8/4k3/4P3/8/4K3 w - - 0 1": 5,
//   "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 1 2": 22,
//   "8/8/8/4k3/8/8/4P3/4K3 w - - 0 1": 6,
//   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 1": 20,
//   "8/8/8/4k3/8/8/8/3QK3 w - - 0 1": 21,
//   "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 2": 22,
//   "8/8/8/3P4/4k3/8/8/4K3 w - - 0 1": 6,
//   "8/8/8/8/8/8/6k1/6K1 w - - 0 1": 1,
//   "rnbqkb1r/pppppppp/5n2/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 0 2": 30,
//   "rnbqkb1r/pppp1ppp/5n2/4p3/8/4P3/PPPP1PPP/RNBQKBNR w KQkq e6 0 3": 30,
//   "r1bqkbnr/pppppppp/2n5/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 3": 22,
//   "8/8/8/4k3/8/8/8/4K3 w - - 0 1": 5,
//   "8/8/3k4/8/8/3P4/8/4K3 w - - 0 1": 6,
//   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 1 1": 20,
//   "8/8/8/8/8/8/8/R3K2k w Q - 0 1": 16,
//   "8/8/8/8/8/8/8/4K2k w - - 0 1": 5,
//   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 2 1": 20
// }
