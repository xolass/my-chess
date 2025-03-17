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
import { getOppositeColor } from "../utils";
import { LegalMovesManager } from "./LegalMovesManager";
import { Listeners } from "./Listeners";
import { Turn } from "./Turn";

export class Game {
  insufficientMaterial: boolean = false;
  checkmate: boolean = false;
  stalemate: boolean = false;
  halfMoveClockDraw: boolean = false;
  winner: Colors | null = null;

  gameEnded: boolean = false;
  enPassantTargetSquare: Coordinates | undefined;

  fullTurns: [Turn, Turn | undefined][] = [] // white and black turn

  readonly listeners = new Listeners()
  readonly halfMoveClock = new HalfMoveClock()
  readonly castle = new CastleManager()

  constructor(from: Fen = new Fen()) {
    this.listeners.onTurnStartListener.push((turn) => {
      console.log(`Turn ${turn.turnCount} started`);
      this.calculateLegalMoves(turn);
      this.checkForEndgameConditions(turn);
    })

    this.listeners.onTurnEndListener.push((turn) => {
      console.log(`Turn ${turn.turnCount} ended`);
      this.startNewTurn();
    })


    const enPassantTargetSquare = from.enPassantTargetSquare === "-" ? undefined : MoveNotation.toCoordinate(from.enPassantTargetSquare);

    const firstTurn = new Turn({
      board: new Board().from(from.getMatrix()),
      turnCount: 1,
      halfMoveClock: 0,
      castleStatus: from.castleStatus,
      currentPlayer: from.turn,
      enPassantTargetSquare,
    },
      this.listeners
    )

    this.fullTurns = [[firstTurn, undefined]]
  }

  public clone(): Game {
    return new Game(this.currentTurn.toFen());
  }

  public makeMove({ from, to, flags }: Move) {
    if (this.gameEnded) throw new Error("Game has ended");

    const piece = this.board.getSquare(from)?.piece;
    const targetPiece = this.board.getSquare(to)?.piece;

    if (!piece) {
      return false;
    }

    MoveExecutor.executeMove(this.currentTurn, from, to, flags);

    this.castle.updateCastleStatus(this.currentTurn.board, from,)
    this.halfMoveClock.updateHalfClockMove(piece, targetPiece)
    this.enPassantTargetSquare = EnPassantManager.updateEnPassantTargetSquare(piece, from, to)

    this.currentTurn.endTurn({ from, to, flags: { ...flags, enPassantTargetSquare: this.enPassantTargetSquare } });
  }

  private calculateLegalMoves(turn: Turn) {
    console.log("calculating legal moves", this);
    if (this.gameEnded) return

    LegalMovesManager.calculateLegalMoves(turn); // for the current player
    LegalMovesManager.clearLastTurnLegalMoves(turn.board, turn.currentPlayer); // for the previous player
    LegalMovesManager.calculatePreMoves(turn.board, turn.currentPlayer); // for the previous player
  }

  public checkForEndgameConditions(turn: Turn) {
    console.log("checking for endgame conditions");
    if (this.gameEnded) throw new Error('game already ended')

    if (InsufficientMaterialManager.isInsufficientMaterial(turn.board.getAllPieces())) {
      this.insufficientMaterial = true;
      this.gameEnded = true
    } else if (CheckmateManager.isCheckmate(turn.board, turn.currentPlayer)) {
      this.winner = this.currentPlayer;
      this.checkmate = true;
      this.gameEnded = true
    } else if (StalemateManager.isStalemate(turn.board, turn.currentPlayer)) {
      this.stalemate = true;
      this.gameEnded = true
    } else if (this.halfMoveClock.isGameOverForHalfClockMoveRule()) {
      this.halfMoveClockDraw = true;
      this.gameEnded = true;
    }
  }

  private startNewTurn() {
    if (!this.currentTurn.isTurnOver) throw new Error("Turn not ended to start new");
    // start new turn
    const newTurn = new Turn({
      board: this.board,
      turnCount: this.fullTurns.length + 1,
      halfMoveClock: this.halfMoveClock.count,
      castleStatus: this.castleStatus, //this.getUpdateCastleStatus(piece),
      currentPlayer: getOppositeColor(this.currentPlayer),
      enPassantTargetSquare: this.enPassantTargetSquare // this.getUpdatedEnPassantTargetSquare(piece, from, to),
    }, this.listeners)

    if (this.currentPlayer === Colors.BLACK) {
      this.passTurnToWhite(newTurn)
    } else {
      this.passTurnToBlack(newTurn)
    }

  }


  private passTurnToWhite(newTurn: Turn) {
    this.fullTurns.push([newTurn, undefined])
  }

  private passTurnToBlack(newTurn: Turn) {
    this.currentFullTurn[1] = newTurn
  }

  get currentFullTurn() {
    return this.fullTurns[this.fullTurns.length - 1]
  }

  get currentTurn() {
    return this.currentFullTurn[1] || this.currentFullTurn[0]
  }

  get board(): Board {
    return this.currentTurn.board;
  }
  get currentPlayer(): Colors {
    return this.currentTurn.currentPlayer;
  }
  get castleStatus(): FenCastle {
    return this.currentTurn.castleStatus;
  }
  get turnsCount(): number {
    return this.fullTurns.length;
  }
}
