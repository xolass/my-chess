import type { Cell, Coordinates, PieceIdentifier, Promotion } from "@/shared/types";

export class MoveNotation {
  isCapture: boolean;
  isCheck: boolean;
  isCheckmate: boolean;
  isShortCastle: boolean;
  isLongCastle: boolean;
  to: Coordinates;
  desambiguation: Partial<Coordinates> | undefined;
  promotion: Promotion | undefined;
  isPawnMove: boolean;
  isPieceMove: boolean;
  piece: PieceIdentifier;

  constructor(private move: string) {
    this.isPawnMove = this.getIsPawnMove();
    this.promotion = this.getPromotion();
    this.piece = this.getPiece();
    this.isCapture = this.getIsCapture();
    this.isCheck = this.getIsCheck();
    this.isCheckmate = this.getIsCheckmate();
    this.desambiguation = this.getDesambiguation();
    this.isShortCastle = this.getIsShortCastle();
    this.isLongCastle = this.getIsLongCastle();
    this.isPieceMove = this.getIsPieceMove();
    this.to = this.getTo();
  }

  static getColumFromFile(file: string): number {
    return file.charCodeAt(0) - 97;
  }

  static getRowFromRank(rank: string): number {
    return 8 - Number(rank);
  }

  static toCell(coordinate: Coordinates): Cell {
    const file = String.fromCharCode(coordinate.col + 97);
    const rank = (8 - coordinate.row).toString();

    return (file + rank) as Cell;
  }

  static toCoordinate(cell: Cell) {
    if (cell.length !== 2) throw new Error("Invalid cell notation", { cause: cell });

    const [file, rank] = cell.split("");

    return {
      col: this.getColumFromFile(file),
      row: this.getRowFromRank(rank),
    } as Coordinates;
  }

  private getPiece(): PieceIdentifier {
    if (this.getIsPawnMove()) {
      return "p";
    }

    return this.move[0].toLowerCase() as PieceIdentifier;
  }

  private getIsCapture(): boolean {
    return this.move.includes("x");
  }

  private getIsCheck(): boolean {
    return this.move.includes("+");
  }

  private getIsCheckmate(): boolean {
    return this.move.includes("#");
  }

  private getIsShortCastle(): boolean {
    return this.move === "O-O";
  }

  private getIsLongCastle(): boolean {
    return this.move === "O-O-O";
  }

  private getTo(): Coordinates {
    if (this.getIsShortCastle() || this.getIsLongCastle()) {
      return { col: -1, row: -1 };
    }

    if (this.getIsCheck() || this.getIsCheckmate()) {
      return MoveNotation.toCoordinate(this.move.slice(-3, -1) as Cell);
    }
    if (this.promotion) {
      return MoveNotation.toCoordinate(this.move.slice(-4, -2) as Cell);
    }

    return MoveNotation.toCoordinate(this.move.slice(-2) as Cell);
  }

  private getDesambiguation(): Partial<Coordinates> | undefined {
    if (this.getIsShortCastle() || this.getIsLongCastle()) {
      return undefined;
    }

    if (this.getIsPawnMove()) {
      if (this.getIsCapture()) {
        // only time a pawn move can be disambiguated is when it's a capture
        return {
          col: MoveNotation.getColumFromFile(this.move[0]),
        };
      }
      return undefined;
    }
    // at this point, we know it's a piece move

    // should be like this: "Nbxd7+" -> "Nbxd7"
    let moveCleaned = this.move.replace(/[+#]/g, "");

    if (this.promotion) {
      moveCleaned = moveCleaned.slice(0, -2);
    }

    // should be like this: "Nbxd7" -> "Nbd7"
    if (this.isCapture) {
      moveCleaned = this.move.replace("x", "");
    }

    // should be like this: "Nbd7" -> "Nb"
    const moveWithoutDestination = moveCleaned.slice(0, -2);

    // should be like this: "Nb" -> "b"
    // should be like this: "N1" -> "1"
    const moveWithoutPiece = moveWithoutDestination.slice(1);

    if (moveWithoutPiece === "") {
      return undefined;
    }

    const isCol = moveWithoutPiece.match(/[a-h]/);
    const isRow = moveWithoutPiece.match(/[1-8]/);

    if (!isCol && !isRow) {
      throw new Error("Invalid move: ambiguous move.", {
        cause: { move: this.move },
      });
    }

    const returnValue = {
      ...(isCol && { col: MoveNotation.getColumFromFile(isCol[0]) }),
      ...(isRow && { row: MoveNotation.getRowFromRank(isRow[0]) }),
    } as Partial<Coordinates>;

    return returnValue;
  }

  private getPromotion(): Promotion | undefined {
    if (this.move.includes("=")) {
      const promotionPiece = this.move.slice(-1).toLowerCase() as PieceIdentifier;

      return {
        promotionPiece,
      };
    }

    return undefined;
  }

  private getIsPawnMove(): boolean {
    return this.move[0].toLowerCase() === this.move[0];
  }

  private getIsPieceMove(): boolean {
    return this.move[0].toUpperCase() === this.move[0];
  }
}
