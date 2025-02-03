import { Board } from "@/controllers/classes/Board";
import { Coordinates, FenCastle, PieceLetter } from "@/types";

export class Castle {
  static WHITE_SHORT_ROOK_COORDINATES = { row: 7, col: 7 };
  static WHITE_LONG_ROOK_COORDINATES = { row: 7, col: 0 };
  static BLACK_SHORT_ROOK_COORDINATES = { row: 0, col: 7 };
  static BLACK_LONG_ROOK_COORDINATES = { row: 0, col: 0 };

  static WHITE_KING_COORDINATES = { row: 7, col: 4 };
  static BLACK_KING_COORDINATES = { row: 0, col: 4 };

  static WHITE_SHORT_CASTLE_IDENTIFIER = "K";
  static WHITE_LONG_CASTLE_IDENTIFIER = "Q";
  static BLACK_SHORT_CASTLE_IDENTIFIER = "k";
  static BLACK_LONG_CASTLE_IDENTIFIER = "q";

  static isCastleMove(from: Coordinates, to: Coordinates) {
    if (!this.isWhiteCastle(from, to) && !this.isBlackCastle(from, to)) return false;
    if (!this.isShortCastle(from, to) && !this.isLongCastle(from, to)) return false;

    return true;
  }

  static canCastle(board: Board, from: Coordinates, to: Coordinates, castleStatus: FenCastle): boolean {
    const isWhiteCastling = this.isWhiteCastle(from, to);
    const isBlackCastling = this.isBlackCastle(from, to);

    if (isWhiteCastling) {
      if (this.isShortCastle(from, to)) {
        return this.canWhiteShortCastle(board, castleStatus);
      }

      if (this.isLongCastle(from, to)) {
        return this.canWhiteLongCastle(board, castleStatus);
      }

      return false;
    }
    if (isBlackCastling) {
      if (this.isShortCastle(from, to)) {
        return this.canBlackShortCastle(board, castleStatus);
      }

      if (this.isLongCastle(from, to)) {
        return this.canBlackLongCastle(board, castleStatus);
      }
    }
    return false;
  }

  private static canWhiteShortCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(this.WHITE_KING_COORDINATES).piece?.pieceLetter === "K";
    const isRookInTheRightPlace = board.getSquare(this.WHITE_SHORT_ROOK_COORDINATES).piece?.pieceLetter === "R";
    const isTherePieceBetween = board.isTherePieceBetween(
      this.WHITE_KING_COORDINATES,
      this.WHITE_SHORT_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(this.WHITE_SHORT_CASTLE_IDENTIFIER);
  }

  private static canWhiteLongCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(this.WHITE_KING_COORDINATES).piece?.pieceLetter === "K";
    const isRookInTheRightPlace = board.getSquare(this.WHITE_LONG_ROOK_COORDINATES).piece?.pieceLetter === "R";
    const isTherePieceBetween = board.isTherePieceBetween(
      this.WHITE_KING_COORDINATES,
      this.WHITE_LONG_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(this.WHITE_LONG_CASTLE_IDENTIFIER);
  }
  private static canBlackShortCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(this.BLACK_KING_COORDINATES).piece?.pieceLetter === "k";
    const isRookInTheRightPlace = board.getSquare(this.BLACK_SHORT_ROOK_COORDINATES).piece?.pieceLetter === "r";
    const isTherePieceBetween = board.isTherePieceBetween(
      this.BLACK_KING_COORDINATES,
      this.BLACK_SHORT_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(this.BLACK_SHORT_CASTLE_IDENTIFIER);
  }
  private static canBlackLongCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(this.BLACK_KING_COORDINATES).piece?.pieceLetter === "k";
    const isRookInTheRightPlace = board.getSquare(this.BLACK_LONG_ROOK_COORDINATES).piece?.pieceLetter === "r";
    const isTherePieceBetween = board.isTherePieceBetween(
      this.BLACK_KING_COORDINATES,
      this.BLACK_LONG_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(this.BLACK_LONG_CASTLE_IDENTIFIER);
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

  private static isBlackCastle(from: Coordinates, to: Coordinates): boolean {
    return from.row === 0 && to.row === 0;
  }
  private static isWhiteCastle(from: Coordinates, to: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.row === 7 && to.row === 7;
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
