import { Board } from "@/controllers/classes/Board";
import { Castle } from "@/controllers/classes/Castle";
import { EnPassant } from "@/controllers/classes/EnPassant";
import { Fen } from "@/controllers/classes/Fen";
import { HalfMoveClock } from "@/controllers/classes/HalfMoveClock";
import MoveNotation from "@/controllers/classes/MoveNotation";
import { Piece } from "@/controllers/classes/Piece";
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

  public validateMove({ from, to }: Move): boolean {
    const startSquare = this.board.getSquare(from);
    const piece = startSquare.piece;

    if (!piece) {
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

    if (totalLegalMoves === 0) {
      const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);
      if (!king) return false;

      if (this.isPieceBeingAttacked(king)) {
        return true;
      }
    }

    return false;
  }

  public isStaleMate() {
    const pieces = this.board.getPieces(this.currentPlayer);

    const totalLegalMoves = pieces.reduce((prevValue, piece) => {
      return prevValue + piece.legalMoves.length;
    }, 0);

    if (totalLegalMoves === 0) {
      const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);
      if (!king) return false;

      if (!this.isPieceBeingAttacked(king)) {
        return true;
      }
    }

    return false;
  }

  public isPieceBeingAttacked(piece?: Piece): boolean {
    if (!piece) return false;
    const square = this.board.getSquare(piece.coordinates);

    if (piece.color === Colors.WHITE) return !!square.getBlackAttackingPieces(this.board).length;
    if (piece.color === Colors.BLACK) return !!square.getWhiteAttackingPieces(this.board).length;

    return false;
  }

  public willSquareBeAttacked(coordinates: Coordinates) {
    const square = this.board.getSquare(coordinates);

    if (this.currentPlayer === Colors.WHITE) return !!square.getBlackAttackingPieces(this.board).length;
    if (this.currentPlayer === Colors.BLACK) return !!square.getWhiteAttackingPieces(this.board).length;
  }

  private doesMoveRemoveCheck(move: Move): boolean {
    const simulatedGame = this.clone();
    simulatedGame.makeMove({ from: move.from, to: move.to });

    const [king] = simulatedGame.board.getPiecesOfAKind("k", this.currentPlayer);
    if (!king) return false;

    // Check if the king is still in check after the move
    return !this.isPieceBeingAttacked(king);
  }

  public calculateLegalMoves() {
    const colorPieces = this.board.getPieces(this.currentPlayer);
    const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);
    const isKingInCheck = this.isPieceBeingAttacked(king);
    let legalMoveCounter = 0;

    const legalMoves = colorPieces.map((piece) => {
      const isKingMoving = piece.name === "k";
      const possibleMoves = piece.calculatePossibleMoves(this.board);

      // Filter moves that are valid and don't leave the king in check
      const validLegalMoves = possibleMoves.filter((to) => {
        const move: Move = { from: piece.coordinates, to };

        if (!this.validateMove(move)) return false;

        // If the king is in check, only allow moves that remove the check
        if (isKingInCheck && !this.doesMoveRemoveCheck(move)) return false;
        if (isKingMoving && this.willSquareBeAttacked(to)) return false;

        return true;
      });

      if (piece instanceof King) {
        const kingCastleMoves = piece.getCastlePossibleMoves(this.board, this.castleStatus);

        validLegalMoves.push(...kingCastleMoves);
      }

      legalMoveCounter += validLegalMoves.length;
      piece.legalMoves = validLegalMoves;
      return { piece: piece.pieceLetter, validLegalMoves };
    });

    return legalMoves;
  }

  public switchPlayer() {
    console.log("switching player");
    if (this.currentPlayer === Colors.BLACK) {
      this.turn++;
    }

    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }
}
