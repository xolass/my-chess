import { Board, Coordinates, FenColors, PieceLetter } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}

export function getPieceColor(piece: PieceLetter): FenColors {
  return piece === piece.toUpperCase() ? "w" : "b";
}

export function getBoardCoordinate({ col, row }: Coordinates) {
  const boardRow = 8 - row;
  const boardCol = String.fromCharCode(97 + col);

  return `${boardCol}${boardRow}`;
}

export const canCapture = (board: Board, from: Coordinates, to: Coordinates) => {
  const piece = board[from.row][from.col];
  const target = board[to.row][to.col];

  if (!target) return true; // is not capturing, is moving to an empty cell
  if (!piece) return false;

  const pieceColor = piece === piece.toUpperCase() ? "white" : "black";
  const tartgetColor = target === target.toUpperCase() ? "white" : "black";

  if (pieceColor === tartgetColor) return false;

  return true;
};

export const getDirection = (from: Coordinates, to: Coordinates) => {
  if (from.row < to.row && from.col < to.col) return "downRight";
  if (from.row < to.row && from.col > to.col) return "downLeft";
  if (from.row > to.row && from.col < to.col) return "upRight";
  return "upLeft";
};
