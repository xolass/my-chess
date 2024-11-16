import { Colors, Coordinates, Grid, PieceIdentifier, PieceLetter } from "@/types";
import { nameClassRelation } from "@/utils";
import { Piece } from "./Piece";
import { Square } from "./Square";

function getDirection(from: Coordinates, to: Coordinates) {
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

const directionToCoordinates = {
  up: { row: -1, col: 0, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  down: { row: 1, col: 0, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  right: { row: 0, col: 1, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  left: { row: 0, col: -1, pieces: ["r", "q", "R", "Q"] as PieceLetter[] },
  downRight: {
    row: 1,
    col: 1,
    pieces: ["b", "q", "B", "Q", "P"] as PieceLetter[],
  },
  downLeft: {
    row: 1,
    col: -1,
    pieces: ["b", "q", "B", "Q", "P"] as PieceLetter[],
  },
  upRight: {
    row: -1,
    col: 1,
    pieces: ["b", "q", "B", "Q", "p"] as PieceLetter[],
  },
  upLeft: {
    row: -1,
    col: -1,
    pieces: ["b", "q", "B", "Q", "p"] as PieceLetter[],
  },
  same: { row: 0, col: 0, pieces: [] as PieceLetter[] },
};

const initialPiecePositions: Record<Colors, Record<PieceIdentifier, Array<Coordinates>>> = {
  [Colors.WHITE]: {
    p: Array.from({ length: 8 }, (_, col) => ({ row: 6, col })),
    b: [
      { row: 7, col: 2 },
      { row: 7, col: 5 },
    ],
    n: [
      { row: 7, col: 1 },
      { row: 7, col: 6 },
    ],
    r: [
      { row: 7, col: 0 },
      { row: 7, col: 7 },
    ],
    k: [{ row: 7, col: 4 }],
    q: [{ row: 7, col: 3 }],
  },
  [Colors.BLACK]: {
    p: Array.from({ length: 8 }, (_, col) => ({ row: 1, col })),
    b: [
      { row: 0, col: 2 },
      { row: 0, col: 5 },
    ],
    n: [
      { row: 0, col: 1 },
      { row: 0, col: 6 },
    ],
    r: [
      { row: 0, col: 0 },
      { row: 0, col: 7 },
    ],
    k: [{ row: 0, col: 4 }],
    q: [{ row: 0, col: 3 }],
  },
};

export class Board {
  #grid: Grid;

  constructor() {
    this.#grid = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => {
        const square = new Square({ row, col });
        square.piece = null;
        return square;
      })
    );
    this.setupBoard();
  }

  public getSquare(coordinates: Coordinates) {
    return this.#grid[coordinates.row][coordinates.col];
  }

  public getPiecesOfAKind(piece: PieceIdentifier, currentPlayer: Colors): Piece[] {
    return this.#grid.flat().reduce<Piece[]>((acc, square) => {
      const squarePiece = square.piece;
      if (!squarePiece) return acc;

      if (squarePiece.color === currentPlayer && squarePiece.name === piece) {
        acc.push(squarePiece);
      }
      return acc;
    }, []);
  }

  public getGrid() {
    return this.#grid.map((row) => row.map((square) => square.piece?.pieceLetter || null));
  }

  public get formatedGrid() {
    return this.#grid.map((row) => row.map(({ piece }) => piece?.pieceLetter || "-").join(" ")).join("\n");
  }

  public isTherePieceBetween(from: Coordinates, to: Coordinates) {
    const lengthWalkedVertically = Math.abs(from.row - to.row);
    const lengthWalkedHorizontally = Math.abs(from.col - to.col);

    const lengthWalked = Math.max(lengthWalkedVertically, lengthWalkedHorizontally);

    for (let i = 1; i < lengthWalked; i++) {
      const direction = getDirection(from, to);

      const { row: rowModifier, col: colModifier } = directionToCoordinates[direction];
      if (
        this.getSquare({
          row: from.row + rowModifier * i,
          col: from.col + colModifier * i,
        }).piece !== null
      )
        return true;
    }
  }

  private placePiece(piece: Piece, { row, col }: Coordinates) {
    this.#grid[row][col].placePiece(piece);
    piece.setPosition({ row, col }); // Set the position in the piece as well
  }

  private setupBoard() {
    Object.entries(initialPiecePositions).forEach(([color, pieces]) => {
      Object.entries(pieces).forEach(([pieceType, positions]) => {
        positions.forEach((position) => {
          const piece = pieceType as PieceIdentifier;
          const pieceClass = nameClassRelation[piece];

          this.placePiece(new pieceClass(color as Colors, position, piece), position);
        });
      });
    });
  }
}
