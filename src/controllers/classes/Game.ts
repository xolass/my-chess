import { Board } from "@/controllers/classes/Board";
import { Castle } from "@/controllers/classes/Castle";
import { EnPassant } from "@/controllers/classes/EnPassant";
import { Fen } from "@/controllers/classes/Fen";
import { HalfMoveClock } from "@/controllers/classes/HalfMoveClock";
import { King } from "@/controllers/classes/pieces/King";
import { Colors, Coordinates, FenCastle, Move } from "@/types";
import { nameClassRelation } from "@/utils";

type GameConstructor = Fen;

export class Game {
  board: Board;
  currentPlayer: Colors;
  castleStatus: FenCastle;
  turn: number;
  halfMoveClock: number;
  enPassantTargetSquare: Coordinates | undefined;

  constructor(from?: GameConstructor) {
    const fen = from ?? new Fen();
    this.board = new Board().from(fen.getMatrix());
    this.castleStatus = fen.castleStatus;
    this.currentPlayer = fen.turn;
    this.turn = fen.turnsCount;
    this.halfMoveClock = fen.halfMoveClock;
    this.enPassantTargetSquare = fen.enPassantTargetSquare;
  }

  public validateMove({ from, to, flags }: Move): boolean {
    const startSquare = this.board.getSquare(from);
    const piece = startSquare.piece;

    console.log("validating");

    if (!piece) {
      console.info("no piece");
      return false;
    }

    if (piece.color !== this.currentPlayer) {
      console.info("not players turn");
      return false;
    }

    if (Castle.isCastleMove(from, to) && !Castle.canCastle(this.board, from, to, this.castleStatus)) {
      return false;
    }

    if (!piece.isValidMove(this.board, to)) {
      console.info("not valid move");
      return false;
    }

    if (this.willKingBeAttacked({ from, to, flags })) {
      console.info("king will be attacked");
      return false;
    }

    return true;
  }

  public makeMove({ from, to, flags }: Move) {
    const startSquare = this.board.getSquare(from);
    const endSquare = this.board.getSquare(to);
    const piece = startSquare.piece;
    const targetPiece = endSquare.piece;

    if (!piece)
      throw new Error("Invalid move: no piece at this position.", { cause: { board: this.board.formatedGrid } });

    const isCastle = Castle.isCastleMove(from, to);

    if (isCastle && Castle.canCastle(this.board, from, to, this.castleStatus)) {
      const isShortCastle = Castle.isShortCastle(from, to);

      this.castleMove(isShortCastle);
    }

    if (EnPassant.isEnPassant(this.board, from, to)) {
      console.log(`en passant`);
      if (!this.enPassantTargetSquare) return;

      if (EnPassant.canEnPassant(to, this.enPassantTargetSquare)) {
        const colorModifier = this.currentPlayer === Colors.WHITE ? 1 : -1;

        const enPassantedPieceSquare = this.board.getSquare({
          row: this.enPassantTargetSquare.row + colorModifier,
          col: this.enPassantTargetSquare.col,
        });

        enPassantedPieceSquare.removePiece();
        endSquare.placePiece(piece);
        piece.setPosition(to);

        startSquare.removePiece();
      }
    } else if (flags?.promotion) {
      console.log(`promotion to ${flags.promotion.promotionPiece}`);
      const PieceClass = nameClassRelation[flags.promotion.promotionPiece];

      const promotionPiece = new PieceClass(this.currentPlayer, to, flags.promotion.promotionPiece);

      startSquare.removePiece();
      endSquare.placePiece(promotionPiece);
    } else {
      startSquare.removePiece();
      endSquare.placePiece(piece);

      piece.setPosition(to);
    }

    if (Castle.shouldUpdateCastleStatus(piece.pieceLetter, this.castleStatus)) {
      this.castleStatus = Castle.updateCastleStatus(this.board, piece.coordinates, this.castleStatus);
    }

    if (HalfMoveClock.shouldReset(piece, targetPiece)) {
      this.halfMoveClock = 0;
    } else {
      this.halfMoveClock++;
    }

    if (EnPassant.isMoveEnpassantEnabling(piece, from, to)) {
      this.enPassantTargetSquare = EnPassant.getEnPassantTargetSquare(to);
    } else {
      this.enPassantTargetSquare = undefined;
    }

    this.switchPlayer();

    return true;
  }

  public castleMove(isShortCastle: boolean) {
    console.log(`castling ${isShortCastle ? "short" : "long"}`);
    const rookCol = isShortCastle ? 7 : 0;
    const kingCol = 4;
    const row = this.currentPlayer === Colors.WHITE ? 7 : 0;
    const rookInitialSquare = this.board.getSquare({ row, col: rookCol });
    const kingInitialSquare = this.board.getSquare({ row, col: kingCol });

    const rook = rookInitialSquare.piece;
    const king = kingInitialSquare.piece;

    if (!rook || !king) {
      throw new Error("Invalid move: no piece at this position.", {
        cause: { board: this.board.formatedGrid },
      });
    }

    kingInitialSquare.removePiece();
    rookInitialSquare.removePiece();

    const kingPositionOffset = isShortCastle ? 2 : -2;
    const rookPositionOffset = isShortCastle ? -2 : 3;

    const kingFinalSquare = this.board.getSquare({
      row,
      col: kingCol + kingPositionOffset,
    });
    const rookFinalSquare = this.board.getSquare({
      row,
      col: rookCol + rookPositionOffset,
    });

    kingFinalSquare.placePiece(king);
    rookFinalSquare.placePiece(rook);

    king.setPosition({ row, col: kingCol + kingPositionOffset });
    rook.setPosition({ row, col: rookCol + rookPositionOffset });
  }

  public willKingBeAttacked({ from, to }: Move) {
    console.log("checking if king will be attacked");

    const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);

    if (!king) return false; // to test positions where both kings are not on the board

    if (!(king instanceof King)) throw new Error("Invalid piece type");

    const movingPiece = this.board.getSquare(from).piece;

    if (!movingPiece) throw new Error("no piece moving");

    const boardAfterMove = new Board(this.board.getLettersGrid());
    boardAfterMove.setSquare(from, undefined);
    boardAfterMove.setSquare(to, movingPiece);
    movingPiece.setPosition(to);

    const [kingPositionInNewBoard] = boardAfterMove.getPiecesOfAKind("k", this.currentPlayer);

    if (!kingPositionInNewBoard) return false; // to test positions where both kings are not on the board

    if (!(kingPositionInNewBoard instanceof King)) throw new Error("Invalid piece type");

    if (this.currentPlayer === Colors.WHITE) {
      const attackingBlackPieces = this.board
        .getSquare(kingPositionInNewBoard.coordinates)
        .getBlackAttackingPieces(boardAfterMove);
      movingPiece.setPosition(from);

      if (attackingBlackPieces.length) return true;
    } else {
      const attackingWhitePieces = this.board
        .getSquare(kingPositionInNewBoard.coordinates)
        .getWhiteAttackingPieces(boardAfterMove);
      movingPiece.setPosition(from);

      if (attackingWhitePieces.length) return true;
    }

    return false;
  }

  public isCheckmate() {
    const pieces = this.board.getPieces(this.currentPlayer);

    const totalLegalMoves = pieces.reduce((prevValue, piece) => {
      return prevValue + piece.legalMoves.length;
    }, 0);

    if (totalLegalMoves === 0) return true;

    return false;
  }

  public rollbackMove(prevBoard: Board) {
    console.log("rolling back move");
    this.board = prevBoard;
    this.switchPlayer();
  }

  public calculateLegalMoves() {
    const colorPieces = this.board.getPieces(this.currentPlayer);
    let legalMoveCounter = 0;

    const validLegalMoves = colorPieces.map((piece) => {
      const legalMoves = piece.calculateLegalMoves(this.board);
      const validLegalMoves = legalMoves.filter((to) => {
        return this.validateMove({ from: piece.coordinates, to, flags: {} });
      });
      legalMoveCounter += validLegalMoves.length;
      piece.legalMoves = validLegalMoves;
      return { piece: piece.pieceLetter, validLegalMoves };
    });

    return validLegalMoves;
  }

  public switchPlayer() {
    console.log("switching player");
    if (this.currentPlayer === Colors.BLACK) {
      this.turn++;
    }

    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }
}
