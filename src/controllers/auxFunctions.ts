import { Board } from "@/controllers/classes/Board";
import { Coordinates } from "@/types";

export const isTryingToCaptureAlly = (board: Board, from: Coordinates, to: Coordinates) => {
  const piece = board.getSquare({ row: from.row, col: from.col }).piece;
  const target = board.getSquare({ row: to.row, col: to.col }).piece;

  if (!target) return false; // is not capturing, is moving to an empty cell
  if (!piece) return false;
  if (piece.color === target.color) return true;

  return false;
};
