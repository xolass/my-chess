import { Board } from "@/shared/classes/Board";
import { King } from "@/shared/classes/pieces/King";
import { Colors, Coordinates, FenCastle, PieceLetter } from "@/shared/types";

export class CastleManager {

  castleStatus: FenCastle = "KQkq";

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
    const isWhiteCastling = CastleManager.isWhiteCastle(from, to);
    const isBlackCastling = CastleManager.isBlackCastle(from, to);

    if (isWhiteCastling) {
      if (CastleManager.isShortCastle(from, to)) {
        return CastleManager.canWhiteShortCastle(board, castleStatus);
      }

      if (CastleManager.isLongCastle(from, to)) {
        return CastleManager.canWhiteLongCastle(board, castleStatus);
      }

      return false;
    }
    if (isBlackCastling) {
      if (CastleManager.isShortCastle(from, to)) {
        return CastleManager.canBlackShortCastle(board, castleStatus);
      }

      if (CastleManager.isLongCastle(from, to)) {
        return CastleManager.canBlackLongCastle(board, castleStatus);
      }
    }
    return false;
  }

  private static canWhiteShortCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(CastleManager.WHITE_KING_COORDINATES).piece?.pieceLetter === "K";
    const isRookInTheRightPlace = board.getSquare(CastleManager.WHITE_SHORT_ROOK_COORDINATES).piece?.pieceLetter === "R";
    const isTherePieceBetween = board.isTherePieceBetween(
      CastleManager.WHITE_KING_COORDINATES,
      CastleManager.WHITE_SHORT_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(CastleManager.WHITE_SHORT_CASTLE_IDENTIFIER);
  }

  private static canWhiteLongCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(CastleManager.WHITE_KING_COORDINATES).piece?.pieceLetter === "K";
    const isRookInTheRightPlace = board.getSquare(CastleManager.WHITE_LONG_ROOK_COORDINATES).piece?.pieceLetter === "R";
    const isTherePieceBetween = board.isTherePieceBetween(
      CastleManager.WHITE_KING_COORDINATES,
      CastleManager.WHITE_LONG_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(CastleManager.WHITE_LONG_CASTLE_IDENTIFIER);
  }

  private static canBlackShortCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(CastleManager.BLACK_KING_COORDINATES).piece?.pieceLetter === "k";
    const isRookInTheRightPlace = board.getSquare(CastleManager.BLACK_SHORT_ROOK_COORDINATES).piece?.pieceLetter === "r";
    const isTherePieceBetween = board.isTherePieceBetween(
      CastleManager.BLACK_KING_COORDINATES,
      CastleManager.BLACK_SHORT_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(CastleManager.BLACK_SHORT_CASTLE_IDENTIFIER);
  }
  private static canBlackLongCastle(board: Board, castleStatus: FenCastle) {
    const isKingInTheRightPlace = board.getSquare(CastleManager.BLACK_KING_COORDINATES).piece?.pieceLetter === "k";
    const isRookInTheRightPlace = board.getSquare(CastleManager.BLACK_LONG_ROOK_COORDINATES).piece?.pieceLetter === "r";
    const isTherePieceBetween = board.isTherePieceBetween(
      CastleManager.BLACK_KING_COORDINATES,
      CastleManager.BLACK_LONG_ROOK_COORDINATES
    );

    if (!isKingInTheRightPlace) return false;
    if (!isRookInTheRightPlace) return false;
    if (isTherePieceBetween) return false;

    return castleStatus.includes(CastleManager.BLACK_LONG_CASTLE_IDENTIFIER);
  }

  static shouldUpdateCastleStatus(piece: PieceLetter, previousFenCastle: FenCastle): boolean {
    if (previousFenCastle === "-") return false;

    const isKing = piece === "k" || piece === "K";
    const isRook = piece === "r" || piece === "R";

    if (isKing) return true;
    if (isRook) return true;

    return false;
  }

  static performCastleMove(board: Board, currentPlayer: Colors, isShortCastle: boolean) {
    const row = currentPlayer === Colors.WHITE ? 7 : 0;
    const kingCol = 4;
    const rookCol = isShortCastle ? 7 : 0;

    const rookSquare = board.getSquare({ row, col: rookCol });
    const kingSquare = board.getSquare({ row, col: kingCol });

    const rook = rookSquare.piece;
    const king = kingSquare.piece;

    if (!rook || !king || !(king instanceof King)) {
      throw new Error("Invalid castling move");
    }

    // Move king and rook to their new positions
    const kingTargetCol = kingCol + (isShortCastle ? 2 : -2);
    const rookTargetCol = rookCol + (isShortCastle ? -2 : 3);

    board.getSquare({ row, col: kingTargetCol }).placePiece(king);
    board.getSquare({ row, col: rookTargetCol }).placePiece(rook);

    king.setPosition({ row, col: kingTargetCol });
    rook.setPosition({ row, col: rookTargetCol });

    rookSquare.removePiece();
    kingSquare.removePiece();
  }

  public updateCastleStatus(board: Board, from: Coordinates): FenCastle {
    const piece = board.getSquare({ row: from.row, col: from.col }).piece;

    if (!piece) return this.castleStatus;

    if (this.castleStatus === "-") return "-";

    if (piece.pieceLetter === "k") {
      return this.castleStatus.replace("k", "").replace("q", "") as FenCastle;
    } else if (piece.pieceLetter === "K") {
      return this.castleStatus.replace("K", "").replace("Q", "") as FenCastle;
    } else if (piece.pieceLetter === "r" && from.row === 0 && from.col === 0) {
      return this.castleStatus.replace("q", "") as FenCastle;
    } else if (piece.pieceLetter === "R" && from.row === 7 && from.col === 0) {
      return this.castleStatus.replace("Q", "") as FenCastle;
    } else if (piece.pieceLetter === "r" && from.row === 0 && from.col === 7) {
      return this.castleStatus.replace("k", "") as FenCastle;
    } else if (piece.pieceLetter === "R" && from.row === 7 && from.col === 7) {
      return this.castleStatus.replace("K", "") as FenCastle;
    }

    return this.castleStatus;
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
