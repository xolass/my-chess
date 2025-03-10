import { Board } from "@/shared/classes/Board";
import { CastleManager } from "@/shared/classes/CastleManager";
import { CheckmateManager } from "@/shared/classes/CheckmateManager";
import { EnPassantManager } from "@/shared/classes/EnPassantManager";
import { Fen } from "@/shared/classes/Fen";
import { HalfMoveClock } from "@/shared/classes/HalfMoveClock";
import { InsufficientMaterialManager } from "@/shared/classes/InsufficientMaterialManager";
import { MoveExecutor } from "@/shared/classes/MoveExecutor";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { StalemateManager } from "@/shared/classes/StalemateManager";
import { Colors, Coordinates, FenCastle, Move } from "@/shared/types";
import { getOppositeColor } from "@/shared/utils";

type GameConstructor = Fen;

export class Game {
  board: Board;
  currentPlayer: Colors;
  castleStatus: FenCastle;
  turn: number;
  halfMoveClock: number;
  enPassantTargetSquare: Coordinates | undefined;
  insufficientMaterial: boolean = false;
  checkmate: boolean = false;
  stalemate: boolean = false;
  winner: Colors | null = null;

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

  public makeMove({ from, to, flags }: Move) {
    const startSquare = this.board.getSquare(from);
    const endSquare = this.board.getSquare(to);
    const piece = startSquare.piece;
    const targetPiece = endSquare.piece;

    if (!piece)
      throw new Error("Invalid move: no piece at this position.", { cause: { board: this.board.formatedGrid } });

    MoveExecutor.executeMove(this, from, to, flags);

    this.checkForEndgameConditions();

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

  private checkForEndgameConditions() {
    const enemy = getOppositeColor(this.currentPlayer);
    if (InsufficientMaterialManager.isInsufficientMaterial(this.board.getAllPieces())) {
      this.insufficientMaterial = true;
    }

    if (CheckmateManager.isCheckmate(this.board, enemy)) {
      this.winner = this.currentPlayer;
      this.checkmate = true;
    }

    if (StalemateManager.isStalemate(this.board, enemy)) {
      console.log("stalemate");
      this.stalemate = true;
    }
  }

  public switchPlayer() {
    if (this.currentPlayer === Colors.BLACK) {
      this.turn++;
    }
    this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }
}
