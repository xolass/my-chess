import { baseBoardAsMatrix } from "@/__tests__/mocks/board";
import { transformFenInMatrix, transformMatrixInFEN } from "@/auxFunctions";

describe("State conversions test suite", () => {
  it("Should transform correctly the fen into a matrix", () => {
    const initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const matrix = transformFenInMatrix(initialFen);
    expect(matrix).toEqual(baseBoardAsMatrix);
  });

  it("Should transform correctly the matrix into a fen", () => {
    const fenLetters = transformMatrixInFEN(baseBoardAsMatrix);

    expect(fenLetters).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });
});
