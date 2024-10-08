import { getBaseBoardAsMatrix } from "@/__tests__/mocks/board";
import { transformMatrixInFEN } from "@/auxFunctions";
import { Fen } from "@/classes/Fen";
import { FenType } from "@/types";

describe("State conversions test suite", () => {
  it("Should transform correctly the fen into a matrix", () => {
    const initialFen = new Fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" as FenType);
    const matrix = initialFen.getMatrix();

    expect(matrix).toEqual(getBaseBoardAsMatrix());
  });

  it("Should transform correctly the matrix into a fen", () => {
    const fenLetters = transformMatrixInFEN(getBaseBoardAsMatrix());

    expect(fenLetters).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });
});
