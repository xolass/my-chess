import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Colors, Coordinates, Grid, PieceIdentifier, PieceLetter } from "../../types";

export abstract class Piece {
  pieceLetter: PieceLetter;
  constructor(public color: Colors, public coordinates: Coordinates, public name: PieceIdentifier) {
    this.pieceLetter =
      this.color === Colors.WHITE ? (this.name.toUpperCase() as PieceLetter) : (this.name.toLowerCase() as PieceLetter);
  }

  setPosition(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  abstract isValidMove(board: Board, move: MoveNotation): boolean;

  abstract isMovingRightDirection(_target: Coordinates): boolean; // implement this only in the game project
  static isCapture(board: Grid, to: Coordinates) {
    const target = board[to.row][to.col];
    return !!target;
  }

  //   static canCapture(board: Grid, to: Coordinates, movingPiece: Coordinates) {
  //     const target = board[to.row][to.col];
  //     const piece = board[movingPiece.row][movingPiece.col];
  //     if (!target) return false;
  //     if (!piece) return false;
  //
  //     if (isTryingToCaptureAlly(board, movingPiece, to)) return false;
  //
  //     if (!Knight.isKnight(piece) && isTherePieceBetween(board, movingPiece, to)) return false;
  //
  //     if (!this.isPieceWayOfMoving(board, movingPiece, to)) return false;
  //
  //     return true;
  //   }
  //
  //   static capture(board: Grid, movingPiece: Coordinates, capturedPiece: Coordinates) {
  //     const piece = board[movingPiece.row][movingPiece.col];
  //     if (!piece) return board;
  //
  //     const tempBoard = structuredClone(board);
  //     tempBoard[movingPiece.row][movingPiece.col] = null;
  //
  //     tempBoard[capturedPiece.row][capturedPiece.col] = piece;
  //
  //     return tempBoard;
  //   }
  //
  //   static isRegularMove(board: Grid, to: Coordinates) {
  //     const target = board[to.row][to.col];
  //     return !target;
  //   }
  //   static canPieceMove(board: Grid, from: Coordinates, to: Coordinates) {
  //     const piece = board[from.row][from.col];
  //
  //     if (!piece) return false;
  //
  //     if (isTryingToCaptureAlly(board, from, to)) return false;
  //
  //     if (!this.isPieceWayOfMoving(board, from, to)) return false;
  //
  //     return true;
  //   }
  //
  //   static isPieceWayOfMoving(board: Grid, from: Coordinates, to: Coordinates) {
  //     const piece = board[from.row][from.col] as PieceLetter;
  //
  //     if (Rook.isRook(piece)) {
  //       return Rook.canRookMove(board, from, to);
  //     }
  //     if (Bishop.isBishop(piece)) {
  //       return Bishop.canBishopMove(board, from, to);
  //     }
  //     if (Queen.isQueen(piece)) {
  //       return Queen.canQueenMove(board, from, to);
  //     }
  //     if (Knight.isKnight(piece)) {
  //       return Knight.canKnightMove(board, from, to);
  //     }
  //     if (King.isKing(piece)) {
  //       return King.canKingMove(board, from, to);
  //     }
  //     if (Pawn.isPawn(piece)) {
  //       return Pawn.canPawnMove(board, from, to);
  //     }
  //   }
}
