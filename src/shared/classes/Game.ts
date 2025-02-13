import { Board } from "@/shared/classes/Board";
import { CastleManager } from "@/shared/classes/CastleManager";
import { EnPassantManager } from "@/shared/classes/EnPassantManager";
import { Fen } from "@/shared/classes/Fen";
import { GameUtils } from "@/shared/classes/GameUtils";
import { HalfMoveClock } from "@/shared/classes/HalfMoveClock";
import { MoveExecutor } from "@/shared/classes/MoveExecutor";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { King } from "@/shared/classes/pieces/King";
import { Pawn } from "@/shared/classes/pieces/Pawn";
import { Colors, Coordinates, FenCastle, Move } from "@/shared/types";

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

  public toFen(): Fen {
    const fen = new Fen();
    fen.setFenPieces(Fen.fromBoard(this.board));
    fen.setCastleStatus(this.castleStatus);
    fen.setTurnsCount(this.turn);
    fen.setHalfMoveClock(this.halfMoveClock);
    fen.setTurn(this.currentPlayer);
    fen.setEnPassantTargetSquare(this.enPassantTargetSquare ? MoveNotation.toCell(this.enPassantTargetSquare) : "-");
    return fen;
  }

  public clone(): Game {
    return new Game(this.toFen());
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

    if (CastleManager.isCastleMove(from, to) && !CastleManager.canCastle(this.board, from, to, this.castleStatus)) {
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

    MoveExecutor.executeMove(this, from, to, flags);

    if (CastleManager.shouldUpdateCastleStatus(piece.pieceLetter, this.castleStatus)) {
      this.castleStatus = CastleManager.updateCastleStatus(this.board, piece.coordinates, this.castleStatus);
    }

    if (HalfMoveClock.shouldReset(piece, targetPiece)) {
      this.halfMoveClock = 0;
    } else {
      this.halfMoveClock++;
    }

    if (EnPassantManager.isMoveEnpassantEnabling(piece, from, to)) {
      this.enPassantTargetSquare = EnPassantManager.getEnPassantTargetSquare(to);
    } else {
      this.enPassantTargetSquare = undefined;
    }

    this.switchPlayer();

    return true;
  }

  public calculateLegalMoves() {
    const colorPieces = this.board.getPieces(this.currentPlayer);
    const [king] = this.board.getPiecesOfAKind("k", this.currentPlayer);
    const isKingInCheck = GameUtils.isPieceBeingAttacked(this.board, king);
    let legalMoveCounter = 0;

    const legalMoves = colorPieces.map((piece) => {
      const isKingMoving = piece.name === "k";
      const possibleMoves = piece.calculatePossibleMoves(this.board);

      // Filter moves that are valid and don't leave the king in check
      const validLegalMoves = possibleMoves.filter((to) => {
        const move: Move = { from: piece.coordinates, to };

        if (!this.validateMove(move)) return false;

        // If the king is in check, only allow moves that remove the check
        if (isKingInCheck && !GameUtils.doesMoveRemoveCheck(this, move)) return false;
        if (isKingMoving && GameUtils.isSquareAttacked(this.board, to, this.currentPlayer)) return false;

        return true;
      });

      if (piece instanceof Pawn) {
        const enPassantLegalMoves = EnPassantManager.getEnPassantLegalMoves(
          this.board,
          piece,
          this.currentPlayer,
          this.enPassantTargetSquare
        );

        validLegalMoves.push(...enPassantLegalMoves);
      }

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
    if (this.currentPlayer === Colors.BLACK) {
      this.turn++;
    }

    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }
}
