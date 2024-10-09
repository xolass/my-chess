import { Board, EnPassantTargetSquare, FenCastle, FenColors, FenPiecesSection, FenType, PieceLetter } from "@/types";

export class Fen {
  constructor(previousFen: FenType) {
    this._fen = previousFen;
    this.setEnPassantTargetSquare("-"); // always reset to base state
  }

  private _fen: FenType;
  private halfMoveClockJustReseted = false;

  public get fen() {
    return this._fen;
  }

  public switchTurns() {
    if (this.halfMoveClockJustReseted) {
      this.setHalfMoveClock(0);
    } else {
      this.setHalfMoveClock(this.halfMoveClock + 1);
    }

    if (this.turn === "b") {
      this.setTurnsCount(this.turnsCount + 1);
      return this.setTurn("w");
    }

    return this.setTurn("b");
  }

  public removeCastleRights(color: FenColors, side: "k" | "q") {
    const colorSide = color === "w" ? side.toUpperCase() : side;
    const newCastleStatus = this.castleStatus.replace(colorSide, "");

    if (newCastleStatus === "") {
      this.setCastleStatus("-");
    } else {
      this.setCastleStatus(newCastleStatus as FenCastle);
    }
  }

  public resetHalfMoveClock() {
    this.halfMoveClockJustReseted = true;
    this.setHalfMoveClock(0);
  }

  public getMatrix(): Board {
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
    const rows = this.fenPieces.split("/");

    const boardMatrix = rows.map((row) => getFENRowAsArray(row));
    return boardMatrix;
  }

  public get fenPieces() {
    return this._fen.split(" ")[0] as FenPiecesSection;
  }
  public get turn(): FenColors {
    return this._fen.split(" ")[1] as FenColors;
  }
  public get castleStatus() {
    return this._fen.split(" ")[2] as FenCastle;
  }
  public get enPassantTargetSquare() {
    return this._fen.split(" ")[3] as EnPassantTargetSquare;
  }
  public get halfMoveClock() {
    return Number(this._fen.split(" ")[4]);
  }
  public get turnsCount() {
    return Number(this._fen.split(" ")[5]);
  }

  public setFenPieces(newValue: FenPiecesSection) {
    this._fen =
      `${newValue} ${this.turn} ${this.castleStatus} ${this.enPassantTargetSquare} ${this.halfMoveClock} ${this.turnsCount}` as FenType;
  }
  private setTurn(newValue: FenColors) {
    this._fen =
      `${this.fenPieces} ${newValue} ${this.castleStatus} ${this.enPassantTargetSquare} ${this.halfMoveClock} ${this.turnsCount}` as FenType;
  }
  private setCastleStatus(newValue: FenCastle) {
    this._fen =
      `${this.fenPieces} ${this.turn} ${newValue} ${this.enPassantTargetSquare} ${this.halfMoveClock} ${this.turnsCount}` as FenType;
  }
  public setEnPassantTargetSquare(newValue: EnPassantTargetSquare) {
    this._fen =
      `${this.fenPieces} ${this.turn} ${this.castleStatus} ${newValue} ${this.halfMoveClock} ${this.turnsCount}` as FenType;
  }
  private setHalfMoveClock(newValue: number) {
    this._fen =
      `${this.fenPieces} ${this.turn} ${this.castleStatus} ${this.enPassantTargetSquare} ${newValue} ${this.turnsCount}` as FenType;
  }
  private setTurnsCount(newValue: number) {
    this._fen =
      `${this.fenPieces} ${this.turn} ${this.castleStatus} ${this.enPassantTargetSquare} ${this.halfMoveClock} ${newValue}` as FenType;
  }
}
