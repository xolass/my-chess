import { Board } from "@/controllers/classes/Board";
import { Coordinates, FenCastle, PieceLetter } from "@/types";

export class Castle {
  static isCastleMove(from: Coordinates, to: Coordinates) {
    if (!this.isWhiteCastle(from) && !this.isBlackCastle(from)) return false;
    if (!this.isShortCastle(from, to) && !this.isLongCastle(from, to)) return false;

    return true;
  }

  static canCastle(board: Board, from: Coordinates, to: Coordinates, castleStatus: FenCastle): boolean {
    if (this.isShortCastle(from, to) && this.isWhiteCastle(from)) {
      if (board.isTherePieceBetween(from, { col: 7, row: 7 })) return false;
      return castleStatus.includes("K");
    } else if (this.isShortCastle(from, to) && this.isBlackCastle(from)) {
      if (board.isTherePieceBetween(from, { col: 7, row: 0 })) return false;
      return castleStatus.includes("k");
    } else if (this.isLongCastle(from, to) && this.isWhiteCastle(from)) {
      if (board.isTherePieceBetween(from, { col: 0, row: 7 })) return false;
      return castleStatus.includes("Q");
    } else if (this.isLongCastle(from, to) && this.isBlackCastle(from)) {
      if (board.isTherePieceBetween(from, { col: 0, row: 0 })) return false;
      return castleStatus.includes("q");
    }
    return false;
  }

  static shouldUpdateCastleStatus(piece: PieceLetter, previousFenCastle: FenCastle): boolean {
    if (previousFenCastle === "-") return false;

    const isKing = piece === "k" || piece === "K";
    const isRook = piece === "r" || piece === "R";

    if (isKing) return true;
    if (isRook) return true;

    return false;
  }

  static updateCastleStatus(board: Board, from: Coordinates, previousFenCastle: FenCastle): FenCastle {
    const piece = board.getSquare({ row: from.row, col: from.col }).piece;

    if (!piece) return previousFenCastle;

    if (previousFenCastle === "-") return "-";

    if (piece.pieceLetter === "k") {
      return previousFenCastle.replace("k", "").replace("q", "") as FenCastle;
    } else if (piece.pieceLetter === "K") {
      return previousFenCastle.replace("K", "").replace("Q", "") as FenCastle;
    } else if (piece.pieceLetter === "r" && from.row === 0 && from.col === 0) {
      return previousFenCastle.replace("q", "") as FenCastle;
    } else if (piece.pieceLetter === "R" && from.row === 7 && from.col === 0) {
      return previousFenCastle.replace("Q", "") as FenCastle;
    } else if (piece.pieceLetter === "r" && from.row === 0 && from.col === 7) {
      return previousFenCastle.replace("k", "") as FenCastle;
    } else if (piece.pieceLetter === "R" && from.row === 7 && from.col === 7) {
      return previousFenCastle.replace("K", "") as FenCastle;
    }

    return previousFenCastle;
  }

  private static isBlackCastle(from: Coordinates): boolean {
    return from.row === 0;
  }
  private static isWhiteCastle(from: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.row === 7;
  }
  static isShortCastle(from: Coordinates, to: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.col === 4 && (to.col === 6 || to.col === 7);
  }
  static isLongCastle(from: Coordinates, to: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.col === 4 && (to.col === 2 || to.col === 0);
  }
}
