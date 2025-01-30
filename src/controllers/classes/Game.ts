import { Board } from "@/controllers/classes/Board";
import { Castle } from "@/controllers/classes/Castle";
import { EnPassant } from "@/controllers/classes/EnPassant";
import { Fen } from "@/controllers/classes/Fen";
import { HalfMoveClock } from "@/controllers/classes/HalfMoveClock";
import MoveNotation from "@/controllers/classes/MoveNotation";
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

    if (fen.enPassantTargetSquare === "-") {
      this.enPassantTargetSquare = undefined;
    } else {
      this.enPassantTargetSquare = MoveNotation.toCoordinate(fen.enPassantTargetSquare);
    }
  }

  public clone() {
    const newFen = new Fen();

    newFen.setFenPieces(Fen.fromBoard(this.board));
    newFen.setCastleStatus(this.castleStatus);
    newFen.setTurnsCount(this.turn);
    newFen.setHalfMoveClock(this.halfMoveClock);
    newFen.setTurn(this.currentPlayer);

    if (this.enPassantTargetSquare) {
      newFen.setEnPassantTargetSquare(MoveNotation.toCell(this.enPassantTargetSquare));
    } else {
      newFen.setEnPassantTargetSquare("-");
    }

    return new Game(newFen);
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

  public isCheckmate() {
    const pieces = this.board.getPieces(this.currentPlayer);

    const totalLegalMoves = pieces.reduce((prevValue, piece) => {
      return prevValue + piece.legalMoves.length;
    }, 0);

    if (totalLegalMoves === 0) return true;

    return false;
  }

  public isKingInCheck(color: Colors): boolean {
    const [king] = this.board.getPiecesOfAKind("k", color);
    if (!king) return false; // if there is no king, there is no check

    const square = this.board.getSquare(king.coordinates);

    if (color === Colors.WHITE) return !!square.getBlackAttackingPieces(this.board).length;
    if (color === Colors.BLACK) return !!square.getWhiteAttackingPieces(this.board).length;

    return false;
  }

  private doesMoveRemoveCheck(move: Move): boolean {
    const simulatedGame = this.clone();
    simulatedGame.makeMove({ from: move.from, to: move.to });

    // Check if the king is still in check after the move
    return !this.isKingInCheck(this.currentPlayer);
  }

  private isPiecePinned(from: Coordinates, to: Coordinates, color: Colors): boolean {
    const simulatedGame = this.clone();
    simulatedGame.makeMove({ from, to });

    // Check if the king is in check after the move
    return this.isKingInCheck(color);
  }

  public calculateLegalMoves() {
    const colorPieces = this.board.getPieces(this.currentPlayer);
    let legalMoveCounter = 0;
    const isKingInCheck = this.isKingInCheck(this.currentPlayer);

    const validLegalMoves = colorPieces.map((piece) => {
      const legalMoves = piece.calculateLegalMoves(this.board);

      // Filter moves that are valid and don't leave the king in check
      const validLegalMoves = legalMoves.filter((to) => {
        const move: Move = { from: piece.coordinates, to };

        // Check if the move is valid and doesn't leave the king in check
        if (!this.validateMove(move)) return false;

        // If the king is in check, only allow moves that remove the check
        if (isKingInCheck && !this.doesMoveRemoveCheck(move)) return false;

        // Check if the piece is pinned and the move is legal
        if (this.isPiecePinned(piece.coordinates, to, this.currentPlayer)) return false;

        return true;
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
