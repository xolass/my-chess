import { directionToCoordinates, getDirection } from "@/controllers/auxFunctions";
import { Colors, Coordinates, Grid, LettersGrid, PieceIdentifier } from "@/types";
import { nameClassRelation } from "@/utils";
import { Piece } from "./Piece";
import { Square } from "./Square";

const initialPiecePositions: LettersGrid = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

export class Board {
  grid: Grid = Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => new Square({ row, col }, null))
  );

  constructor(private initialBoard?: LettersGrid) {
    this.setupBoard(this.initialBoard);
  }

  public from(matrix: LettersGrid) {
    matrix.forEach((row, rowIndex) =>
      row.forEach((pieceLetter, colIndex) => {
        const square = new Square({ row: rowIndex, col: colIndex });
        if (!pieceLetter) {
          square.piece = null;
          this.grid[rowIndex][colIndex] = square;
        } else {
          const piece = pieceLetter.toLowerCase() as PieceIdentifier;
          const color = pieceLetter === pieceLetter.toUpperCase() ? Colors.WHITE : Colors.BLACK;

          const PieceClass = nameClassRelation[piece];
          const position = { row: rowIndex, col: colIndex };

          this.placePiece(new PieceClass(color as Colors, position, piece), position);
        }
      })
    );

    return this;
  }

  public isInsideBoard({ row, col }: Coordinates) {
    return !!this.grid?.[row]?.[col];
  }

  public getSquare(coordinates: Coordinates) {
    return this.grid[coordinates.row][coordinates.col];
  }

  public getPieces(currentPlayer: Colors): Piece[] {
    return this.grid.flat().reduce<Piece[]>((acc, square) => {
      const squarePiece = square.piece;
      if (!squarePiece) return acc;

      if (squarePiece.color === currentPlayer) {
        acc.push(squarePiece);
      }
      return acc;
    }, []);
  }

  public getPiecesOfAKind(piece: PieceIdentifier, currentPlayer: Colors): Piece[] {
    return this.grid.flat().reduce<Piece[]>((acc, square) => {
      const squarePiece = square.piece;
      if (!squarePiece) return acc;

      if (squarePiece.color === currentPlayer && squarePiece.name === piece) {
        acc.push(squarePiece);
      }
      return acc;
    }, []);
  }

  public getLettersGrid() {
    return this.grid.map((row) => row.map((square) => square.piece?.pieceLetter || null));
  }

  public get formatedGrid() {
    return this.grid.map((row) => row.map(({ piece }) => piece?.pieceLetter || "-").join(" ")).join("\n");
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

  public setSquare(cell: Coordinates, piece: Piece | null) {
    this.grid[cell.row][cell.col].piece = piece
  }

  private placePiece(piece: Piece, { row, col }: Coordinates) {
    this.grid[row][col].placePiece(piece);
    piece.setPosition({ row, col }); // Set the position in the piece as well
  }

  private setupBoard(initialPosition: LettersGrid | undefined) {

    console.log({ initialPiecePositions, initialPosition })
    this.from(initialPosition ?? initialPiecePositions);
  }
}
