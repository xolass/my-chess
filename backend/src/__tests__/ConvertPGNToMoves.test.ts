import { assertEquals } from "@std/assert";
import { initGame } from "../main.ts";

Deno.test("get move from game notation for pawn moves", () => {
  const { game, board } = initGame();

  const conversion = game.getMoveFromGameNotation(
    "1. e4 e5 2. d3 d5 3. f3 f5 4. g3 dxe4 5. fxe4 b5 6. exf5 b4 7. c4 bxc3 8. "
  );

  console.log(board.formatedGrid);

  assertEquals(conversion.moves, [
    { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } },
    { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } },
    { from: { row: 6, col: 3 }, to: { row: 5, col: 3 } },
    { from: { row: 1, col: 3 }, to: { row: 3, col: 3 } },
    { from: { row: 6, col: 5 }, to: { row: 5, col: 5 } },
    { from: { row: 1, col: 5 }, to: { row: 3, col: 5 } },
    { from: { row: 6, col: 6 }, to: { row: 5, col: 6 } },
    { from: { row: 3, col: 3 }, to: { row: 4, col: 4 } },
    { from: { row: 5, col: 5 }, to: { row: 4, col: 4 } },
    { from: { row: 1, col: 1 }, to: { row: 3, col: 1 } },
    { from: { row: 4, col: 4 }, to: { row: 3, col: 5 } },
    { from: { row: 3, col: 1 }, to: { row: 4, col: 1 } },
    { from: { row: 6, col: 2 }, to: { row: 4, col: 2 } },
    { from: { row: 4, col: 1 }, to: { row: 5, col: 2 } },
  ]);
});

Deno.test("vienna gambit", () => {
  const { game, board } = initGame();

  const conversion = game.getMoveFromGameNotation(
    "1. e4 e5 2. Nc3 Nf6 3. f4 exf4 4. e5 Ng8 5. d4 Nc6 6. Bxf4"
  );

  console.log(board.formatedGrid);

  assertEquals(conversion.moves, [
    { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } },
    { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } },
    { from: { row: 7, col: 1 }, to: { row: 5, col: 2 } },
    { from: { row: 0, col: 6 }, to: { row: 2, col: 5 } },
    { from: { row: 6, col: 5 }, to: { row: 4, col: 5 } },
    { from: { row: 3, col: 4 }, to: { row: 4, col: 5 } },
    { from: { row: 4, col: 4 }, to: { row: 3, col: 4 } },
    { from: { row: 2, col: 5 }, to: { row: 0, col: 6 } },
    { from: { row: 6, col: 3 }, to: { row: 4, col: 3 } },
    { from: { row: 0, col: 1 }, to: { row: 2, col: 2 } },
    { from: { row: 7, col: 2 }, to: { row: 4, col: 5 } },
  ]);
});
