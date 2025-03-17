import { InsufficientMaterialManager } from "@/shared/classes/InsufficientMaterialManager";
import { Bishop } from "@/shared/classes/pieces/Bishop";
import { King } from "@/shared/classes/pieces/King";
import { Knight } from "@/shared/classes/pieces/Knight";
import { Pawn } from "@/shared/classes/pieces/Pawn";
import { Queen } from "@/shared/classes/pieces/Queen";
import { Colors } from "@/shared/types";

describe("Insufficient Material for forced checkmate test suite", () => {
  const blackKing = new King(Colors.BLACK, { row: 0, col: 4 });
  const whiteKing = new King(Colors.WHITE, { row: 7, col: 4 });
  const whiteKnight = new Knight(Colors.WHITE, { row: 3, col: 4 });
  const whiteLightSquareBishop = new Bishop(Colors.WHITE, { row: 0, col: 0 });
  const blackBishop = new Bishop(Colors.BLACK, { row: 0, col: 1 });
  const blackDarkSquareBishop = new Bishop(Colors.BLACK, { row: 0, col: 1 });
  const whiteDarkSquareBishop = new Bishop(Colors.WHITE, { row: 0, col: 1 });
  const whiteQueen = new Queen(Colors.WHITE, { row: 6, col: 4 });
  const whitePawn = new Pawn(Colors.WHITE, { row: 5, col: 4 });
  it("Should check if material is enough", () => {
    const enough = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteQueen,
      whiteKnight,
      whiteKnight,
    ]);

    const enough2 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteKnight,
      whiteLightSquareBishop,
    ]);

    const enough3 = InsufficientMaterialManager.isInsufficientMaterial([blackKing, whiteKing, whitePawn]);

    const enough4 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteKnight,
      whiteKnight,
      blackDarkSquareBishop,
    ]);

    const enough5 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteDarkSquareBishop,
      whiteLightSquareBishop,
    ]);

    const enough6 = InsufficientMaterialManager.isInsufficientMaterial([blackKing, whiteKing, whitePawn]);

    expect(enough).toBe(false);
    expect(enough2).toBe(false);
    expect(enough3).toBe(false);
    expect(enough4).toBe(false);
    expect(enough5).toBe(false);
    expect(enough6).toBe(false);
  });

  it("Should check if material is insufficient", () => {
    const insufficient1 = InsufficientMaterialManager.isInsufficientMaterial([blackKing, whiteKing]);

    const insufficient2 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteLightSquareBishop,
    ]);

    const insufficient3 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteKnight,
      blackBishop,
    ]);

    const insufficient4 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteLightSquareBishop,
      whiteLightSquareBishop,
      whiteLightSquareBishop,
    ]);

    expect(insufficient1).toBe(true);
    expect(insufficient2).toBe(true);
    expect(insufficient3).toBe(true);
    expect(insufficient4).toBe(true);
  });

  it("Should show non-forceable checkmates as insufficient", () => {
    const nonForceable1 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteKnight,
      blackBishop,
    ]);

    const nonForceable2 = InsufficientMaterialManager.isInsufficientMaterial([
      blackKing,
      whiteKing,
      whiteKnight,
      whiteKnight,
    ]);

    expect(nonForceable1).toBe(true);
    expect(nonForceable2).toBe(true);
  });
});
