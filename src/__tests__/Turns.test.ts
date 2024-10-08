import { baseFenBoard } from "@/__tests__/mocks/board";
import { Fen } from "@/classes/Fen";

describe("Turns test suite", () => {
  it("Should count additional turn on blacks end of turn", () => {
    const prevFen = new Fen(baseFenBoard); // start as white
    prevFen.switchTurns();

    expect(prevFen.turnsCount).toBe(1);

    prevFen.switchTurns();
    expect(prevFen.turnsCount).toBe(2);
  });

  it("Should switch turns correctly", () => {
    const prevFen = new Fen(baseFenBoard); // start as white
    prevFen.switchTurns();

    expect(prevFen.turn).toBe("b");

    prevFen.switchTurns();
    expect(prevFen.turn).toBe("w");
  });
});
