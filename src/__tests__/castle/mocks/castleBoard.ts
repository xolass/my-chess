import { LettersGrid } from "@/shared/types";

export const getCastleBoard = (): LettersGrid => {
  return [
    ["r", undefined, undefined, undefined, "k", undefined, undefined, "r"],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ["R", undefined, undefined, undefined, "K", undefined, undefined, "R"],
  ];
};

export const getBoardWithPieceNextToKing = (): LettersGrid => {
  return [
    ["r", undefined, undefined, "q", "k", "b", undefined, "r"],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ["R", undefined, undefined, "Q", "K", "B", undefined, "R"],
  ];
};

export const getBoardWithPieceNextToRook = (): LettersGrid => {
  return [
    ["r", "n", undefined, undefined, "k", undefined, "n", "r"],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ["R", "N", undefined, undefined, "K", undefined, "N", "R"],
  ];
};

export const getBoardWithPieceInTheMiddleOfKingAndRook = (): LettersGrid => {
  return [
    ["r", undefined, "b", undefined, "k", undefined, undefined, "r"],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ["R", undefined, "B", undefined, "K", undefined, undefined, "R"],
  ];
};
