import { LettersGrid } from "@/types";

export const getCastleBoard = (): LettersGrid => {
  return [
    ["r", null, null, null, "k", null, null, "r"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["R", null, null, null, "K", null, null, "R"],
  ];
};

export const getBoardWithPieceNextToKing = (): LettersGrid => {
  return [
    ["r", null, null, "q", "k", "b", null, "r"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["R", null, null, "Q", "K", "B", null, "R"],
  ];
};

export const getBoardWithPieceNextToRook = (): LettersGrid => {
  return [
    ["r", "n", null, null, "k", null, "n", "r"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["R", "N", null, null, "K", null, "N", "R"],
  ];
};

export const getBoardWithPieceInTheMiddleOfKingAndRook = (): LettersGrid => {
  return [
    ["r", null, "b", null, "k", null, null, "r"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["R", null, "B", null, "K", null, null, "R"],
  ];
};
