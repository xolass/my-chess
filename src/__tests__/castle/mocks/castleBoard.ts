import { Board } from "@/types";

export const getCastleBoard = (): Board => [
  ["r", null, null, null, "k", null, null, "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", null, null, null, "K", null, null, "R"],
];

export const getBoardWithPieceNextToKing = (): Board => [
  ["r", null, null, "q", "k", "b", null, "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", null, null, "Q", "K", "B", null, "R"],
];

export const getBoardWithPieceNextToRook = (): Board => [
  ["r", "n", null, null, "k", null, "n", "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", "N", null, null, "K", null, "N", "R"],
];

export const getBoardWithPieceInTheMiddleOfKingAndRook = (): Board => [
  ["r", null, "b", null, "k", null, null, "r"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["R", null, "B", null, "K", null, null, "R"],
];
