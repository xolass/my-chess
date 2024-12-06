import { Board } from "@/controllers/classes/Board";
import { King } from "@/controllers/classes/King";
import { Colors, Move } from "@/types";
import { nameClassRelation } from "@/utils";

export class Game {
  currentPlayer: Colors;
  turn: number = 1;
  constructor(private _board: Board) {
    this.currentPlayer = Colors.WHITE;
  }

  public validateMove({ from, to, flags }: Move): boolean {
    const startSquare = this._board.getSquare(from);
    const piece = startSquare.piece;

    console.log("validating");

    if (!piece) {
      console.log("no piece");
      return false;
    }

    if (piece.color !== this.currentPlayer) {
      console.log("not players turn");
      return false;
    }

    if (!piece.isValidMove(this._board, to, flags)) {
      console.log("not valid move");
      return false;
    }

    if (this.willKingBeAttacked({ from, to, flags })) {
      console.log("king will be attacked");
      return false;
    }

    return true;
  }

  public makeMove({ from, to, flags }: Move) {
    const startSquare = this._board.getSquare(from);
    const endSquare = this._board.getSquare(to);
    const piece = startSquare.piece;

    if (!piece)
      throw new Error("Invalid move: no piece at this position.", { cause: { board: this._board.formatedGrid } });

    if (flags?.enPassant) {
      console.log(`en passant`);
      const positionModifier = this.currentPlayer === Colors.WHITE ? 1 : -1;
      const enPassantedPieceSquare = this._board.getSquare({
        row: to.row + positionModifier,
        col: to.col,
      });
      enPassantedPieceSquare.removePiece();

      endSquare.placePiece(piece);
      piece.setPosition(to);

      startSquare.removePiece();
    } else if (flags?.promotion) {
      console.log(`promotion to ${flags.promotion.promotionPiece}`);
      const PieceClass = nameClassRelation[flags.promotion.promotionPiece];

      const promotionPiece = new PieceClass(this.currentPlayer, to, flags.promotion.promotionPiece);

      startSquare.removePiece();
      endSquare.placePiece(promotionPiece);
    } else {
      console.log("normal move");
      startSquare.removePiece();
      endSquare.placePiece(piece);

      piece.setPosition(to);
    }
    this.switchPlayer();
    return true;
  }

  public castleMove(isShortCastle: boolean) {
    console.log(`castling ${isShortCastle ? "short" : "long"}`);
    const rookCol = isShortCastle ? 7 : 0;
    const kingCol = 4;
    const row = this.currentPlayer === Colors.WHITE ? 7 : 0;
    const rookInitialSquare = this._board.getSquare({ row, col: rookCol });
    const kingInitialSquare = this._board.getSquare({ row, col: kingCol });

    const rook = rookInitialSquare.piece;
    const king = kingInitialSquare.piece;

    if (!rook || !king) {
      throw new Error("Invalid move: no piece at this position.", {
        cause: { board: this._board.formatedGrid },
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
  }

  public willKingBeAttacked({ from, to, flags }: Move) {
    console.log("checking if king will be attacked");
    const [king] = this._board.getPiecesOfAKind("k", this.currentPlayer);
    if (!king) return false; // to test positions where both kings are not on the board

    if (!(king instanceof King)) throw new Error("Invalid piece type");

    const prevBoard = new Board(this._board.getLettersGrid());

    this.makeMove({ from, to, flags });

    const kingIsBeingAttacked = king.isInCheck(this._board);

    // not a good idea, doing it this way will not be able to check if checkmate
    // it needs to be done in a more complex way, maybe checking for legal moves for each piece,
    // store it on the piece and the validate function becomes "find the move in that list"
    // maybe store if a piece is pinned
    // but focus on getting all legal moves for all the pieces and update on each move
    this.rollbackMove(prevBoard);

    return kingIsBeingAttacked;
  }

  public isCheckmate() {
    throw new Error("Method not implemented.");
  }

  public rollbackMove(prevBoard: Board) {
    console.log("rolling back move");
    this._board = prevBoard;
    this.switchPlayer();
  }

  private switchPlayer() {
    console.log("switching player");
    if (this.currentPlayer === Colors.BLACK) {
      this.turn++;
    }

    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }

  get board() {
    return this._board;
  }
}
