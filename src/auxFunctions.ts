import { Board, Cell, Colors, Coordinates, FenColors, FenPiecesSection, PieceLetter } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}

export function isTurnOfPiece(turn: FenColors, piece: PieceLetter) {
  const pieceColor = getPieceColor(piece);
  return turn === pieceColor;
}

export const transformMatrixInFEN = (matrix: Board): FenPiecesSection => {
  return matrix
    .map((row) => {
      let result = "";
      let emptySpaces = 0;

      row.forEach((cell) => {
        if (!cell) {
          emptySpaces++;
          return;
        }

        if (emptySpaces) {
          result += emptySpaces;
          emptySpaces = 0;
        }

        result += cell;
      });

      if (emptySpaces) {
        result += emptySpaces;
      }

      return result;
    })
    .join("/") as FenPiecesSection;
};

export function getPieceColor(piece: PieceLetter): FenColors {
  return piece === piece.toUpperCase() ? Colors.WHITE : Colors.BLACK;
}

export function coordinateToMoveNotation({ col, row }: Coordinates) {
  const boardRow = 8 - row;
  const boardCol = String.fromCharCode(97 + col);

  return `${boardCol}${boardRow}` as Cell;
}

export function moveNotationToCoordinate(cell: Cell) {
  const [col, row] = cell.split("");
  return { col: col.charCodeAt(0) - 97, row: 8 - Number(row) } as Coordinates;
}

export function cellToCoordinate(cell: Cell) {
  const [col, row] = cell.split("");
  return { col: col.charCodeAt(0) - 97, row: 8 - Number(row) } as Coordinates;
}

export const isTryingToCaptureAlly = (board: Board, from: Coordinates, to: Coordinates) => {
  const piece = board[from.row][from.col];
  const target = board[to.row][to.col];

  if (!target) return false; // is not capturing, is moving to an empty cell
  if (!piece) return false;

  if (getPieceColor(piece) === getPieceColor(target)) return true;

  return false;
};

export function getDirection(from: Coordinates, to: Coordinates) {
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
  up: { row: -1, col: 0, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  down: { row: 1, col: 0, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  right: { row: 0, col: 1, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  left: { row: 0, col: -1, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  downRight: { row: 1, col: 1, pieces: ["b", "q", "B", "Q", "P"] as PieceLetter[] },
  downLeft: { row: 1, col: -1, pieces: ["b", "q", "B", "Q", "P"] as PieceLetter[] },
  upRight: { row: -1, col: 1, pieces: ["b", "q", "B", "Q", "p"] as PieceLetter[] },
  upLeft: { row: -1, col: -1, pieces: ["b", "q", "B", "Q", "p"] as PieceLetter[] },
  same: { row: 0, col: 0, pieces: [] as PieceLetter[] },
};

export function isTherePieceBetween(board: Board, from: Coordinates, to: Coordinates) {
  const lengthWalkedVertically = Math.abs(from.row - to.row);
  const lengthWalkedHorizontally = Math.abs(from.col - to.col);

  const lengthWalked = Math.max(lengthWalkedVertically, lengthWalkedHorizontally);

  for (let i = 1; i < lengthWalked; i++) {
    const direction = getDirection(from, to);

    const { row: rowModifier, col: colModifier } = directionToCoordinates[direction];
    if (board[from.row + rowModifier * i][from.col + colModifier * i]) return true;
  }
}

export function movePiece(board: Board, from: Coordinates, to: Coordinates) {
  const tempBoard = structuredClone(board);
  const piece = tempBoard[from.row][from.col];
  if (!piece) return board;

  tempBoard[from.row][from.col] = null;
  tempBoard[to.row][to.col] = piece;

  return tempBoard;
}
