import { Piece } from "@/shared/classes/Piece";
import { Square } from "@/shared/classes/Square";
import { Colors } from "@/shared/types";

export class InsufficientMaterialManager {
  private static readonly insufficientMaterialPossibilities = [
    ["k", "K"],

    ["k", "N", "K"],
    ["k", "n", "K"],
    ["k", "N", "N", "K"],
    ["k", "n", "n", "K"],

    ["k", "n", "K", "N"],

    ["k", "n", "K", "B"],
    ["k", "b", "K", "N"],

    ["k", "B", "K"],
    ["k", "b", "K"],
    ["k", "b", "K", "B"],
  ];

  static isInsufficientMaterial(pieces: Piece[]): boolean {
    const pieceLetters = pieces.map(({ pieceLetter }) => pieceLetter);

    if (this.areAllBishopsSameColor(pieces)) {
      return true;
    }

    if (pieceLetters.length > 4) {
      return false;
    }

    for (let i = 0; i < this.insufficientMaterialPossibilities.length; i++) {
      const combination = this.insufficientMaterialPossibilities[i];

      if (this.doArraysContainSameValues(combination, pieceLetters)) {
        return true;
      }
    }

    return false;
  }

  private static areAllBishopsSameColor(pieces: Piece[]) {
    // in the case of multiple bishops + king x king, its only forced mate if there are bishops of both square colors and no pieces to fight back

    const nonBishopOrKing = pieces.filter(({ name }) => name !== "b" && name !== "k");
    if (nonBishopOrKing.length > 0) return false;

    const whitePieces = pieces.filter(({ color }) => color === Colors.WHITE);
    const blackPieces = pieces.filter(({ color }) => color === Colors.BLACK);

    let piecesOfWinningSide;
    let piecesOfLosingSide;

    if (whitePieces.length > blackPieces.length) {
      piecesOfWinningSide = whitePieces;
      piecesOfLosingSide = blackPieces;
    } else {
      piecesOfWinningSide = blackPieces;
      piecesOfLosingSide = whitePieces;
    }

    if (piecesOfLosingSide.length > 1) return false; // there is fighting back against 2 bishops

    let isThereLightSquaredBishop = false;
    let isThereDarkSquaredBishop = false;

    for (let i = 0; i < piecesOfWinningSide.length; i++) {
      const piece = piecesOfWinningSide[i];
      if (isThereLightSquaredBishop && isThereDarkSquaredBishop) break;

      if (piece.name !== "b") continue;

      const pieceSquareColor = Square.getSquareColor(piece.coordinates);

      if (pieceSquareColor === Colors.WHITE) {
        isThereLightSquaredBishop = true;
      } else {
        isThereDarkSquaredBishop = true;
      }
    }

    if (isThereLightSquaredBishop && isThereDarkSquaredBishop) return false;

    return true;
  }

  private static doArraysContainSameValues(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = arr1.toSorted();
    const sortedArr2 = arr2.toSorted();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }
}
