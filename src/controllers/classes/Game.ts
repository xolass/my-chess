import { Board } from "@/controllers/classes/Board";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";
import { Cell, Colors, Move, ReturnFromGetMovesFromPGN } from "@/types";
import { nameClassRelation } from "@/utils";

export class Game {
  currentPlayer: Colors;
  turn: number = 1;
  constructor(private _board: Board) {
    this.currentPlayer = Colors.WHITE;
  }

  public getMoveFromGameNotation(notation: string): ReturnFromGetMovesFromPGN {
    const moves = this.getMovesFromPGN(notation);
    const movesHistory: Array<Move> = [];

    console.log(moves);

    moves.forEach((moveString, index) => {
      const move = new MoveNotation(moveString);
      const color = index % 2 === 0 ? Colors.WHITE : Colors.BLACK;

      if (move.isShortCastle || move.isLongCastle) {
        const moveFlagged = {
          flags: {
            castle: {
              isShortCastle: move.isShortCastle,
              isLongCastle: move.isLongCastle,
              color,
            },
          },
        };
        this.makeMove(moveFlagged);
        movesHistory.push(moveFlagged);
      } else if (move.promotion?.isPromotion) {
        const { to, promotion } = move;
        const from = this.deducePieceOrigin(move).coordinates;
        const pieceToMove = this._board.getSquare(from)?.piece;

        if (!pieceToMove)
          throw new Error("Invalid move", {
            cause: { move, board: this._board.formatedGrid },
          });

        this.makeMove({ from, to, flags: { promotion } });
        movesHistory.push({ from, to });
      } else {
        const { to } = move;
        const from = this.deducePieceOrigin(move).coordinates;
        const pieceToMove = this._board.getSquare(from)?.piece;

        if (!pieceToMove)
          throw new Error("Invalid move", {
            cause: { move, board: this._board.formatedGrid, from, to },
          });

        this.makeMove({ from, to });
        movesHistory.push({ from, to });
      }
    });

    return { moves: movesHistory };
  }

  getMovesFromPGN(pgn: string): Array<Cell> {
    const onlyTheMoves = pgn.replace(/\d+\./g, ""); // removes the move numbers
    return onlyTheMoves.split(" ").filter(Boolean) as Array<Cell>;
  }

  public deducePieceOrigin(move: MoveNotation): Piece {
    // Get all possible pieces of that type for the current player
    const possiblePieces = this._board.getPiecesOfAKind(move.piece, this.currentPlayer);

    // Filter pieces that can legally move to the target square
    const validPieces = possiblePieces.filter((piece) => piece.isValidMove(this._board, move));

    if (validPieces.length > 1) {
      const desambiguatedPiece = this.resolveAmbiguity(validPieces, move);
      if (!desambiguatedPiece) {
        throw new Error("Invalid move: ambiguous move.", {
          cause: { board: this._board, move, validPieces, possiblePieces },
        });
      }
      return desambiguatedPiece;
    }
    if (validPieces.length === 0) {
      throw new Error("Invalid move: no piece can move to this square.", {
        cause: { board: this._board.formatedGrid, move, possiblePieces },
      });
    }

    return validPieces[0];
  }

  public makeMove({ from, to, flags }: Move) {
    if (flags?.castle) {
      const { isShortCastle } = flags.castle;

      const rookCol = isShortCastle ? 7 : 0;
      const kingCol = 4;
      const row = this.currentPlayer === Colors.WHITE ? 7 : 0;
      const rookInitialSquare = this._board.getSquare({ row, col: rookCol });
      const kingInitialSquare = this._board.getSquare({ row, col: kingCol });

      const rook = rookInitialSquare.piece;
      const king = kingInitialSquare.piece;

      if (!rook || !king) {
        throw new Error("Invalid move: no piece at this position.", {
          cause: { board: this._board.formatedGrid, from, to },
        });
      }

      kingInitialSquare.removePiece();
      rookInitialSquare.removePiece();

      const kingPositionOffset = isShortCastle ? 2 : -2;
      const rookPositionOffset = isShortCastle ? -2 : 3;

      const kingFinalSquare = this._board.getSquare({
        row,
        col: kingCol + kingPositionOffset,
      });
      const rookFinalSquare = this._board.getSquare({
        row,
        col: rookCol + rookPositionOffset,
      });

      kingFinalSquare.placePiece(king);
      rookFinalSquare.placePiece(rook);

      king.setPosition({ row, col: kingCol + kingPositionOffset });
      rook.setPosition({ row, col: rookCol + rookPositionOffset });
    } else {
      if (!from || !to) {
        throw new Error("Invalid move: missing from or to.", {
          cause: { board: this._board.formatedGrid, from, to },
        });
      }

      const startSquare = this._board.getSquare(from);
      const endSquare = this._board.getSquare(to);
      const piece = startSquare.piece;

      if (!piece) {
        throw new Error("Invalid move: no piece at this position.", {
          cause: { board: this._board, from, to },
        });
      } else if (piece.color !== this.currentPlayer) {
        throw new Error("Invalid move: Not your turn.", {
          cause: { board: this._board.formatedGrid, from, to, turn: this.turn },
        });
      } else if (flags?.enPassant) {
        const enPassantTargetSquare = this._board.getSquare(flags.enPassant.enPassantTargetSquare);
        startSquare.removePiece();
        endSquare.placePiece(piece);

        piece.setPosition(to);
        enPassantTargetSquare.removePiece();
      } else if (flags?.promotion?.isPromotion) {
        const PieceClass = nameClassRelation[flags.promotion.promotionPiece];

        const promotionPiece = new PieceClass(this.currentPlayer, to, flags.promotion.promotionPiece);

        startSquare.removePiece();
        endSquare.placePiece(promotionPiece);
      } else {
        startSquare.removePiece();
        endSquare.placePiece(piece);

        piece.setPosition(to);
      }
    }

    this.switchPlayer();
    return true;
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

  private switchPlayer() {
    if (this.currentPlayer === Colors.BLACK) {
      this.turn++;
    }

    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }

  get board() {
    return this._board;
  }
}
