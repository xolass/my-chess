import { Board } from "@/controllers/classes/Board";
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

    if (!piece) return false;

    if (piece.color !== this.currentPlayer) return false;

    if (!piece.isValidMove(this._board, to, flags)) return false;
    return true;
  }

  public makeMove({ from, to, flags }: Move) {
    const startSquare = this._board.getSquare(from);
    const endSquare = this._board.getSquare(to);
    const piece = startSquare.piece;

    if (!piece)
      throw new Error("Invalid move: no piece at this position.", { cause: { board: this._board.formatedGrid } });

    if (flags?.enPassant) {
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
      const PieceClass = nameClassRelation[flags.promotion.promotionPiece];

      const promotionPiece = new PieceClass(this.currentPlayer, to, flags.promotion.promotionPiece);

      startSquare.removePiece();
      endSquare.placePiece(promotionPiece);
    } else {
      startSquare.removePiece();
      endSquare.placePiece(piece);

      piece.setPosition(to);
    }
    console.log(this.currentPlayer);
    this.switchPlayer();
    console.log(this.currentPlayer);
    return true;
  }

  public castleMove(isShortCastle: boolean) {
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
