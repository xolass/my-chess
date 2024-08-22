import { Board, Coordinates, FenColors, PieceLetter } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}

export function isTurnOfPiece(turn: FenColors, pieceColor: FenColors) {
  return turn === pieceColor;
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

export function getDirection(from: Coordinates, to: Coordinates) {
  if (from.row < to.row && from.col < to.col) return "downRight";
  if (from.row < to.row && from.col > to.col) return "downLeft";
  if (from.row > to.row && from.col < to.col) return "upRight";
  if (from.row > to.row && from.col > to.col) return "upLeft";
  if (from.row > to.row && from.col === to.col) return "up";
  if (from.row < to.row && from.col === to.col) return "down";
  if (from.row === to.row && from.col > to.col) return "right";
  if (from.row === to.row && from.col < to.col) return "left";
  return "wtf";
}

export function isTherePieceBetween(board: Board, from: Coordinates, to: Coordinates) {
  const lengthWalked = Math.abs(from.row - to.row);
  const direction = getDirection(from, to);

  const directionToCoordinates = {
    downRight: (i: number) => ({ row: from.row + i, col: from.col + i }),
    downLeft: (i: number) => ({ row: from.row + i, col: from.col - i }),
    upRight: (i: number) => ({ row: from.row - i, col: from.col + i }),
    upLeft: (i: number) => ({ row: from.row - i, col: from.col - i }),
    up: (i: number) => ({ row: from.row - i, col: from.col }),
    down: (i: number) => ({ row: from.row + i, col: from.col }),
    right: (i: number) => ({ row: from.row, col: from.col + i }),
    left: (i: number) => ({ row: from.row, col: from.col - i }),
    wtf: (_i: number) => ({ row: from.row, col: from.col }),
  };

  for (let i = 1; i < lengthWalked; i++) {
    const { row, col } = directionToCoordinates[direction](i);
    if (board[row][col]) return true;
  }
}
