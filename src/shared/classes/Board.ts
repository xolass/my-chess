import { directionToCoordinates, getDirection } from "@/shared/auxFunctions";
import { Fen } from "@/shared/classes/Fen";
import { Colors, Coordinates, Grid, LettersGrid, PieceIdentifier } from "@/shared/types";
import { nameClassRelation } from "@/shared/utils";
import { Piece } from "./Piece";
import { Square } from "./Square";

export class Board {
  grid: Grid = Array.from({ length: 8 }, (_, row) => Array.from({ length: 8 }, (_, col) => new Square({ row, col })));

  constructor(private initialBoard?: LettersGrid) {
    this.setupBoard(this.initialBoard);
  }

  public from(matrix: LettersGrid) {
    matrix.forEach((row, rowIndex) =>
      row.forEach((pieceLetter, colIndex) => {
        const square = new Square({ row: rowIndex, col: colIndex });
        if (!pieceLetter) {
          square.piece = undefined;
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
    return this.grid.map((row) => row.map((square) => square.piece?.pieceLetter || undefined));
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
      const squarePiece = this.getSquare({
        row: from.row + rowModifier * i,
        col: from.col + colModifier * i,
      }).piece;

      if (squarePiece !== undefined) return true;
    }

    return false;
  }

  public setSquare(cell: Coordinates, piece?: Piece) {
    this.grid[cell.row][cell.col].piece = piece;
  }

  private placePiece(piece: Piece, { row, col }: Coordinates) {
    this.grid[row][col].placePiece(piece);
    piece.setPosition({ row, col }); // Set the position in the piece as well
  }

  private setupBoard(initialPosition: LettersGrid | undefined) {
    const initialPiecePositions = new Fen().getMatrix();
    this.from(initialPosition ?? initialPiecePositions);
  }
}
