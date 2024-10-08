import { isTherePieceBetween, movePiece } from "@/auxFunctions";
import { Board, Coordinates, FenCastle, PieceLetter } from "@/types";

export class Castle {
  static isCastleMove(from: Coordinates, to: Coordinates) {
    if (!this.isWhiteCastle(from) && !this.isBlackCastle(from)) return false;
    if (!this.isKingSideCastle(from, to) && !this.isQueenSideCastle(from, to)) return false;

    return true;
  }

  static canCastle(board: Board, from: Coordinates, to: Coordinates, castleStatus: FenCastle): boolean {
    if (this.isKingSideCastle(from, to) && this.isWhiteCastle(from)) {
      if (isTherePieceBetween(board, from, { col: 7, row: 7 })) return false;
      return castleStatus.includes("K");
    } else if (this.isKingSideCastle(from, to) && this.isBlackCastle(from)) {
      if (isTherePieceBetween(board, from, { col: 7, row: 0 })) return false;
      return castleStatus.includes("k");
    } else if (this.isQueenSideCastle(from, to) && this.isWhiteCastle(from)) {
      if (isTherePieceBetween(board, from, { col: 0, row: 7 })) return false;
      return castleStatus.includes("Q");
    } else if (this.isQueenSideCastle(from, to) && this.isBlackCastle(from)) {
      if (isTherePieceBetween(board, from, { col: 0, row: 0 })) return false;
      return castleStatus.includes("q");
    }
    return false;
  }

  static castle(board: Board, from: Coordinates, to: Coordinates): Board {
    if (this.isKingSideCastle(from, to) && this.isWhiteCastle(from)) {
      return this.castleWhiteKingSide(board);
    } else if (this.isQueenSideCastle(from, to) && this.isWhiteCastle(from)) {
      return this.castleWhiteQueenSide(board);
    } else if (this.isKingSideCastle(from, to) && this.isBlackCastle(from)) {
      return this.castleBlackKingSide(board);
    } else if (this.isQueenSideCastle(from, to) && this.isBlackCastle(from)) {
      return this.castleBlackQueenSide(board);
    }

    return board;
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
    const piece = board[from.row][from.col] as PieceLetter;

    if (!piece) return previousFenCastle;

    if (previousFenCastle === "-") return "-";

    if (piece === "k") {
      return previousFenCastle.replace("k", "").replace("q", "") as FenCastle;
    } else if (piece === "K") {
      return previousFenCastle.replace("K", "").replace("Q", "") as FenCastle;
    } else if (piece === "r" && from.row === 0 && from.col === 0) {
      return previousFenCastle.replace("q", "") as FenCastle;
    } else if (piece === "R" && from.row === 7 && from.col === 0) {
      return previousFenCastle.replace("Q", "") as FenCastle;
    } else if (piece === "r" && from.row === 0 && from.col === 7) {
      return previousFenCastle.replace("k", "") as FenCastle;
    } else if (piece === "R" && from.row === 7 && from.col === 7) {
      return previousFenCastle.replace("K", "") as FenCastle;
    }

    return previousFenCastle;
  }

  private static castleWhiteKingSide(board: Board): Board {
    const boardAfterKingMove = movePiece(board, { row: 7, col: 4 }, { row: 7, col: 6 });
    const boardAfterRookMove = movePiece(boardAfterKingMove, { row: 7, col: 7 }, { row: 7, col: 5 });

    return boardAfterRookMove;
  }
  private static castleWhiteQueenSide(board: Board): Board {
    const boardAfterKingMove = movePiece(board, { row: 7, col: 4 }, { row: 7, col: 2 });
    const boardAfterRookMove = movePiece(boardAfterKingMove, { row: 7, col: 0 }, { row: 7, col: 3 });

    return boardAfterRookMove;
  }
  private static castleBlackKingSide(board: Board): Board {
    const boardAfterKingMove = movePiece(board, { row: 0, col: 4 }, { row: 0, col: 6 });
    const boardAfterRookMove = movePiece(boardAfterKingMove, { row: 0, col: 7 }, { row: 0, col: 5 });

    return boardAfterRookMove;
  }
  private static castleBlackQueenSide(board: Board): Board {
    const boardAfterKingMove = movePiece(board, { row: 0, col: 4 }, { row: 0, col: 2 });
    const boardAfterRookMove = movePiece(boardAfterKingMove, { row: 0, col: 0 }, { row: 0, col: 3 });

    return boardAfterRookMove;
  }

  private static isBlackCastle(from: Coordinates): boolean {
    return from.row === 0;
  }
  private static isWhiteCastle(from: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.row === 7;
  }
  private static isKingSideCastle(from: Coordinates, to: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.col === 4 && (to.col === 6 || to.col === 7);
  }
  private static isQueenSideCastle(from: Coordinates, to: Coordinates): boolean {
    // allow castle for dragging king to the rook or to its future position
    return from.col === 4 && (to.col === 2 || to.col === 0);
  }
}
