import { Coordinates } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}


export function getBoardCoordinate({ col, row }: Coordinates) {
  const boardRow = 8 - row
  const boardCol = String.fromCharCode(97 + col)

  return `${boardCol}${boardRow}`
}
