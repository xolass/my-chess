import { Coordinates, PieceLetter } from "@/shared/types";

export type Direction = "downRight" | "downLeft" | "upRight" | "upLeft" | "up" | "down" | "left" | "right" | "same";

export function getDirection(from: Coordinates, to: Coordinates): Direction {
  if (from.row < to.row && from.col < to.col) return "downRight";
  if (from.row < to.row && from.col > to.col) return "downLeft";
  if (from.row > to.row && from.col < to.col) return "upRight";
  if (from.row > to.row && from.col > to.col) return "upLeft";
  if (from.row > to.row && from.col === to.col) return "up";
  if (from.row < to.row && from.col === to.col) return "down";
  if (from.row === to.row && from.col > to.col) return "left";
  if (from.row === to.row && from.col < to.col) return "right";
  return "same";
}

export const directionToCoordinates = {
  up: { row: -1, col: 0, pieces: ["r", "q", "R", "Q", "k", "K"] as PieceLetter[] },
  down: { row: 1, col: 0, pieces: ["r", "q", "R", "Q", "k", "K"] as PieceLetter[] },
  right: { row: 0, col: 1, pieces: ["r", "q", "R", "Q", "k", "K"] as PieceLetter[] },
  left: { row: 0, col: -1, pieces: ["r", "q", "R", "Q", "k", "K"] as PieceLetter[] },
  downRight: {
    row: 1,
    col: 1,
    pieces: ["b", "q", "B", "Q", "k", "K", "P"] as PieceLetter[],
  },
  downLeft: {
    row: 1,
    col: -1,
    pieces: ["b", "q", "B", "Q", "k", "K", "P"] as PieceLetter[],
  },
  upRight: {
    row: -1,
    col: 1,
    pieces: ["b", "q", "B", "Q", "k", "K", "p"] as PieceLetter[],
  },
  upLeft: {
    row: -1,
    col: -1,
    pieces: ["b", "q", "B", "Q", "k", "K", "p"] as PieceLetter[],
  },
  same: { row: 0, col: 0, pieces: [] as PieceLetter[] },
} as const;
