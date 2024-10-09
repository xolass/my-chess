import { baseFenBoard } from "@/__tests__/mocks/board";
import { Fen } from "@/classes/Fen";

describe("Half Move Clock test suite", () => {
  it("Should count half clock moves", () => {
    const prevFen = new Fen(baseFenBoard); // start as white
    expect(prevFen.halfMoveClock).toBe(0);

    prevFen.switchTurns();

    expect(prevFen.halfMoveClock).toBe(1);

    prevFen.switchTurns();

    expect(prevFen.halfMoveClock).toBe(2);
  });

  it("Should reset half clock move to 0 if reset after switch turns", () => {
    const prevFen = new Fen(baseFenBoard); // start as white

    prevFen.switchTurns();
    prevFen.resetHalfMoveClock();

    expect(prevFen.halfMoveClock).toBe(0);
  });

  it("Should reset half clock move to 0 if reset before switch turns", () => {
    const prevFen = new Fen(baseFenBoard); // start as white

    prevFen.resetHalfMoveClock();
    prevFen.switchTurns();

    expect(prevFen.halfMoveClock).toBe(0);
  });
});
