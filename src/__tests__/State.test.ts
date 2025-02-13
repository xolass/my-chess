import { baseFenBoard, getBaseBoardAsMatrix } from "@/__tests__/mocks/board";
import { Board } from "@/shared/classes/Board";
import { Fen } from "@/shared/classes/Fen";

describe("State conversions test suite", () => {
  it("Should transform correctly the fen into a matrix", () => {
    const initialFen = new Fen(baseFenBoard);
    const matrix = initialFen.getMatrix();

    expect(matrix).toEqual(getBaseBoardAsMatrix());
  });

  it("Should transform correctly the matrix into a fen", () => {
    const fenLetters = Fen.fromBoard(new Board().from(getBaseBoardAsMatrix()));

    expect(fenLetters).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });
});
