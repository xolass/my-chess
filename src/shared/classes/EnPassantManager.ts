import { Board } from "@/shared/classes/Board";
import { Move } from "@/shared/classes/Move";
import { Piece } from "@/shared/classes/Piece";
import { Pawn } from "@/shared/classes/pieces/Pawn";
import { Colors, Coordinates } from "@/shared/types";
import { isCoordinateEqual } from "@/shared/utils";

export class EnPassantManager {
  static isMoveEnpassantEnabling(piece: Piece, from: Coordinates, to: Coordinates) {
    return piece.name === "p" && Pawn.isDoubleMove(from, to);
  }

  static updateEnPassantTargetSquare(piece: Piece, from: Coordinates, to: Coordinates): Coordinates | undefined {
    if (this.isMoveEnpassantEnabling(piece, from, to)) {
      return this.getEnPassantTargetSquare(to);
    }
  }

  static getEnPassantLegalMoves(
    board: Board,
    piece: Piece,
    currentPlayer: Colors,
    enPassantTargetCoordinates?: Coordinates
  ): Move | undefined {
    if (!enPassantTargetCoordinates) return;
    if (piece.name !== "p") return;

    const colorModifier = currentPlayer === Colors.WHITE ? 1 : -1;

    const leftSquareCoordinates = {
      row: enPassantTargetCoordinates.row + colorModifier,
      col: enPassantTargetCoordinates.col - 1,
    };

    const rightSquareCoordinates = {
      row: enPassantTargetCoordinates.row + colorModifier,
      col: enPassantTargetCoordinates.col + 1,
    };

    if (board.isInsideBoard(leftSquareCoordinates)) {
      const leftSquarePiece = board.getSquare(leftSquareCoordinates)?.piece;

      if (leftSquarePiece === piece) {
        return new Move(piece.coordinates, enPassantTargetCoordinates);
      }
    }

    if (board.isInsideBoard(rightSquareCoordinates)) {
      const rightSquarePiece = board.getSquare(rightSquareCoordinates)?.piece;

      if (rightSquarePiece === piece) {
        return new Move(piece.coordinates, enPassantTargetCoordinates);
      }
    }
  }

  static isEnPassant(piece: Piece, to: Coordinates, enPassantTargetCoordinates?: Coordinates) {
    if (piece.name !== "p") return false;
    if (!enPassantTargetCoordinates) return false;
    return isCoordinateEqual(enPassantTargetCoordinates, to);
  }

  static executeEnPassant(board: Board, from: Coordinates, to: Coordinates, currentPlayer: Colors) {
    const colorModifier = currentPlayer === Colors.WHITE ? 1 : -1;

    const startSquare = board.getSquare(from);
    const endSquare = board.getSquare(to);

    const capturedPieceSquare = board.getSquare({ row: to.row + colorModifier, col: to.col });

    const targetPiece = capturedPieceSquare.piece;
    const startPiece = startSquare.piece;

    if (!targetPiece) return false;
    if (!startPiece) return false;

    endSquare.placePiece(startPiece);
    startPiece.setPosition(to);

    startSquare.removePiece();
    capturedPieceSquare.removePiece();
  }

  static getEnPassantTargetSquare(to: Coordinates) {
    const modifier = to.row === 3 ? -1 : 1;
    return {
      col: to.col,
      row: to.row + modifier,
    };
  }
}
