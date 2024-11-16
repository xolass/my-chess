import { Grid } from "@/types";

export const getCastleBoard = (): Grid => [
  ["r", null, null, null, "k", null, null, "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", null, null, null, "K", null, null, "R"],
];

export const getBoardWithPieceNextToKing = (): Grid => [
  ["r", null, null, "q", "k", "b", null, "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", null, null, "Q", "K", "B", null, "R"],
];

export const getBoardWithPieceNextToRook = (): Grid => [
  ["r", "n", null, null, "k", null, "n", "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", "N", null, null, "K", null, "N", "R"],
];

export const getBoardWithPieceInTheMiddleOfKingAndRook = (): Grid => [
  ["r", null, "b", null, "k", null, null, "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", null, "B", null, "K", null, null, "R"],
];
