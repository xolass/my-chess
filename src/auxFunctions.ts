import { Board, Coordinates, EnPassantTargetSquare, FenColors, FenPiecesSection, PieceLetter } from "@/types";

export function isSamePosition(from: Coordinates, to: Coordinates) {
  return from.col === to.col && from.row === to.row;
}

export function isTurnOfPiece(turn: FenColors, pieceColor: FenColors) {
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

export function getBoardCoordinate({ col, row }: Coordinates) {
  const boardRow = 8 - row;
  const boardCol = String.fromCharCode(97 + col);

  return `${boardCol}${boardRow}` as EnPassantTargetSquare;
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

export const isCapture = (board: Board, to: Coordinates) => {
  const target = board[to.row][to.col];
  return !!target;
};

export const canCapture = (board: Board, to: Coordinates, movingPiece: Coordinates) => {
  const target = board[to.row][to.col];
  const piece = board[movingPiece.row][movingPiece.col];
  if (!target) return false;
  if (!piece) return false;

  if (getPieceColor(piece) === getPieceColor(target)) return false;

  return true;
};

export const capture = (board: Board, movingPiece: Coordinates, capturedPiece: Coordinates) => {
  const piece = board[movingPiece.row][movingPiece.col];
  if (!piece) return board;

  const tempBoard = structuredClone(board);
  tempBoard[movingPiece.row][movingPiece.col] = null;

  tempBoard[capturedPiece.row][capturedPiece.col] = piece;

  return tempBoard;
};

export const isEnPassant = (board: Board, from: Coordinates, to: Coordinates) => {
  const fromPiece = board[from.row][from.col];
  const target = board[to.row][to.col];
  if (!fromPiece) return false;
  if (target) return false;

  const direction = getDirection(from, to);

  if (fromPiece === "p") {
    if (direction === "downRight" || direction === "downLeft") return true;
  } else if (fromPiece === "P") {
    if (direction === "upRight" || direction === "upLeft") return true;
  }

  return false;
};

export const canEnPassant = (to: Coordinates, enPassantTargetSquare: EnPassantTargetSquare) => {
  const isRightSquare = getBoardCoordinate(to) === enPassantTargetSquare;
  const isRightRow = to.row === 2 || to.row === 5;

  return isRightSquare && isRightRow;
};

export const enPassant = (board: Board, from: Coordinates, to: Coordinates) => {
  const newBoard = structuredClone(board);
  const piece = newBoard[from.row][from.col];
  if (!piece) return board;

  if (piece === "P" && to.col === 5) {
    newBoard[to.row + 1][to.col] = null;
    newBoard[from.row][from.col] = null;
    newBoard[to.row][to.col] = piece;
  }

  if (piece === "p" && to.col === 2) {
    newBoard[to.row - 1][to.col] = null;
    newBoard[from.row][from.col] = null;
    newBoard[to.row][to.col] = piece;
  }

  return newBoard;
};

export const isRegularMove = (board: Board, to: Coordinates) => {
  const target = board[to.row][to.col];
  return !target;
};

export const canPieceMove = (board: Board, from: Coordinates, to: Coordinates) => {
  const piece = board[from.row][from.col];
  if (!piece) return false;
  const pieceColor = getPieceColor(piece);

  if (!isTurnOfPiece(pieceColor, pieceColor)) return false;
  if (isSamePosition(from, to)) return false;

  if (isTherePieceBetween(board, from, to)) return false;

  return true;
};

export const movePiece = (board: Board, from: Coordinates, to: Coordinates) => {
  const tempBoard = structuredClone(board);
  const piece = tempBoard[from.row][from.col];
  if (!piece) return board;

  tempBoard[from.row][from.col] = null;
  tempBoard[to.row][to.col] = piece;

  return tempBoard;
};
