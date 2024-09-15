import { Board, Cell, Coordinates, FenColors, FenPiecesSection, PieceLetter } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}

export function isTurnOfPiece(turn: FenColors, piece: PieceLetter) {
  const pieceColor = getPieceColor(piece);
  return turn === pieceColor;
}

export function transformFenInMatrix(fenPieces: FenPiecesSection): Board {
  function getFENRowAsArray(row: string) {
    const cells: Array<PieceLetter | null> = [];
    Array.from(row).forEach((char) => {
      if (Number.isNaN(Number(char))) {
        return cells.push(char as PieceLetter);
      }

      const emptySpaces = Number(char);
      cells.push(...Array.from<null>({ length: emptySpaces }).fill(null));
    });

    return cells;
  }
  const rows = fenPieces.split("/");

  const boardMatrix = rows.map((row) => getFENRowAsArray(row));
  return boardMatrix;
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
  return piece === piece.toUpperCase() ? "w" : "b";
}

export function coordinateToMoveNotation({ col, row }: Coordinates) {
  const boardRow = 8 - row;
  const boardCol = String.fromCharCode(97 + col);

  return `${boardCol}${boardRow}` as Cell;
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

  const pieceColor = piece === piece.toUpperCase() ? "w" : "b";
  const tartgetColor = target === target.toUpperCase() ? "w" : "b";

  if (pieceColor === tartgetColor) return true;

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
  return "wtf";
}

export function isTherePieceBetween(board: Board, from: Coordinates, to: Coordinates) {
  const lengthWalkedVertically = Math.abs(from.row - to.row);
  const lengthWalkedHorizontally = Math.abs(from.col - to.col);

  const lengthWalked = Math.max(lengthWalkedVertically, lengthWalkedHorizontally);

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

export const movePiece = (board: Board, from: Coordinates, to: Coordinates) => {
  const tempBoard = structuredClone(board);
  const piece = tempBoard[from.row][from.col];
  if (!piece) return board;

  tempBoard[from.row][from.col] = null;
  tempBoard[to.row][to.col] = piece;

  return tempBoard;
};
