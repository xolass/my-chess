import { CastleManager } from "@/shared/classes/CastleManager";
import { Game } from "@/shared/classes/Game";
import { Move } from "@/shared/classes/Move";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { Piece } from "@/shared/classes/Piece";
import { Cell, ReturnFromGetMovesFromPGN } from "@/shared/types";
import { isCoordinateEqual } from "@/shared/utils";

export class PgnGamePlayer {
  constructor(private game: Game) {}

  public getCoordinatesFromGameNotation(moveString: string): Move {
    const move = new MoveNotation(moveString);
    const { to, promotion } = move;

    const flags: Move["flags"] = {};

    if (promotion) {
      flags.promotion = promotion;
    }

    if (move.isShortCastle || move.isLongCastle) {
      flags.castle = {
        isShortCastle: move.isShortCastle,
        isLongCastle: move.isLongCastle,
        color: this.game.currentPlayer,
      };

      return {
        from: { row: -1, col: -1 },
        to: { row: -1, col: -1 },
        flags,
      };
    }

    const from = this.deducePieceOrigin(move).coordinates;
    const pieceToMove = this.game.board.getSquare(from)?.piece;

    if (!pieceToMove)
      throw new Error(
        "Invalid move" +
          JSON.stringify({
            cause: { move, board: this.game.board.formatedGrid, from, to },
          })
      );

    return new Move(from, to, flags);
  }

  public playGameFromGameNotation(notation: string): ReturnFromGetMovesFromPGN {
    const moves = this.getMovesFromPGN(notation);
    const movesHistory: ReturnFromGetMovesFromPGN["moves"] = [];

    moves.forEach((moveString) => {
      const move = this.getCoordinatesFromGameNotation(moveString);

      movesHistory.push(move);

      if (move.flags?.castle) {
        return CastleManager.performCastleMove(
          this.game.board,
          move.flags.castle.color,
          move.flags.castle.isShortCastle
        );
      }

      this.game.makeMove(move);
    });

    return { moves: movesHistory };
  }

  private deducePieceOrigin(move: MoveNotation): Piece {
    // Get all possible pieces of that type for the current player
    const possiblePieces = this.game.board.getPiecesOfAKind(move.piece, this.game.currentPlayer);

    // Filter pieces that can legally move to the target square
    const validPieces = possiblePieces.filter((piece) => {
      return piece.legalMoves.find((coordinate) => isCoordinateEqual(coordinate.to, move.to));
    });

    if (validPieces.length > 1) {
      const desambiguatedPiece = this.resolveAmbiguity(validPieces, move);
      if (!desambiguatedPiece) {
        throw new Error(
          "Invalid move: ambiguous move." +
            JSON.stringify({
              cause: { board: this.game.board, move, validPieces, possiblePieces },
            })
        );
      }
      return desambiguatedPiece;
    }
    if (validPieces.length === 0) {
      throw new Error(
        "Invalid move: no piece can move to this square." +
          JSON.stringify({
            cause: { board: this.game.board.formatedGrid, move, possiblePieces },
          })
      );
    }

    return validPieces[0];
  }

  private getMovesFromPGN(pgn: string): Array<Cell> {
    const onlyTheMoves = pgn.replace(/\d+\./g, ""); // removes the move numbers
    return onlyTheMoves.split(" ").filter(Boolean) as Array<Cell>;
  }

  private resolveAmbiguity(validPieces: Array<Piece>, move: MoveNotation): Piece | undefined {
    const { desambiguation } = move;
    if (!desambiguation) return;

    const desambiguatedPiece = validPieces.find((piece) => {
      const { col, row } = piece.coordinates;

      if (!desambiguation.col) {
        return desambiguation.row === row;
      }

      if (!desambiguation.row) {
        return desambiguation.col === col;
      }

      return desambiguation.col === col && desambiguation.row === row;
    });
    return desambiguatedPiece;
  }
}
