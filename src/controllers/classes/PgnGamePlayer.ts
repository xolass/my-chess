import { EnPassant } from "@/controllers/classes/EnPassant";
import { Game } from "@/controllers/classes/Game";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";
import { Cell, ReturnFromGetMovesFromPGN } from "@/types";

export class PgnGamePlayer {
  constructor(private game: Game) {}

  public deducePieceOrigin(move: MoveNotation): Piece {
    // Get all possible pieces of that type for the current player
    const possiblePieces = this.game.board.getPiecesOfAKind(move.piece, this.game.currentPlayer);

    // Filter pieces that can legally move to the target square
    const validPieces = possiblePieces.filter((piece) => {
      const isEnPassant = EnPassant.isEnPassant(this.game.board, piece.coordinates, move.to);
      return piece.isValidMove(this.game.board, move.to, {
        enPassant: isEnPassant,
        promotion: move.promotion,
      });
    });

    if (validPieces.length > 1) {
      const desambiguatedPiece = this.resolveAmbiguity(validPieces, move);
      if (!desambiguatedPiece) {
        throw new Error("Invalid move: ambiguous move.", {
          cause: { board: this.game.board, move, validPieces, possiblePieces },
        });
      }
      return desambiguatedPiece;
    }
    if (validPieces.length === 0) {
      throw new Error("Invalid move: no piece can move to this square.", {
        cause: { board: this.game.board.formatedGrid, move, possiblePieces },
      });
    }

    return validPieces[0];
  }

  public getMoveFromGameNotation(notation: string): ReturnFromGetMovesFromPGN {
    const moves = this.getMovesFromPGN(notation);
    const movesHistory: ReturnFromGetMovesFromPGN["moves"] = [];

    console.log(moves);

    moves.forEach((moveString, index) => {
      const move = new MoveNotation(moveString);

      if (move.isShortCastle || move.isLongCastle) {
        this.game.castleMove(move.isShortCastle);
        movesHistory.push("castle");
      } else if (move.promotion) {
        const { to, promotion } = move;
        const from = this.deducePieceOrigin(move).coordinates;
        const pieceToMove = this.game.board.getSquare(from)?.piece;

        if (!pieceToMove)
          throw new Error("Invalid move", {
            cause: { move, board: this.game.board.formatedGrid },
          });

        this.game.makeMove({ from, to, flags: { promotion } });
        movesHistory.push({ from, to });
      } else {
        const { to } = move;
        const from = this.deducePieceOrigin(move).coordinates;
        const pieceToMove = this.game.board.getSquare(from)?.piece;

        if (!pieceToMove)
          throw new Error("Invalid move", {
            cause: { move, board: this.game.board.formatedGrid, from, to },
          });

        this.game.makeMove({ from, to });
        movesHistory.push({ from, to });
      }
    });

    return { moves: movesHistory };
  }

  public getMovesFromPGN(pgn: string): Array<Cell> {
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
