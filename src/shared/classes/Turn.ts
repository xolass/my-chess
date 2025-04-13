import { Move } from "@/shared/classes/Move";
import { Colors, Coordinates, FenCastle } from "../types";
import { Board } from "./Board";
import { Fen } from "./Fen";
import { Listeners } from "./Listeners";
import { MoveNotation } from "./MoveNotation";

type TurnData = {
  board: Board;
  turnCount: number;
  halfMoveClock: number;
  castleStatus: FenCastle;
  currentPlayer: Colors;
  enPassantTargetSquare: Coordinates | undefined;
};

export class Turn {
  board: Board;
  turnCount: number;
  halfMoveClock: number;
  castleStatus: FenCastle;
  currentPlayer: Colors;
  enPassantTargetSquare: Coordinates | undefined;
  move?: Move;

  private turnOver: boolean = false;

  constructor(data: TurnData, private readonly listeners?: Listeners) {
    this.board = data.board;
    this.turnCount = data.turnCount;
    this.halfMoveClock = data.halfMoveClock;
    this.castleStatus = data.castleStatus;
    this.currentPlayer = data.currentPlayer;
    this.enPassantTargetSquare = data.enPassantTargetSquare;

    this.startTurn();
  }

  public clone(): Turn {
    return new Turn({
      board: new Board().from(this.board.getLettersGrid()),
      turnCount: this.turnCount,
      halfMoveClock: this.halfMoveClock,
      castleStatus: this.castleStatus,
      currentPlayer: this.currentPlayer,
      enPassantTargetSquare: this.enPassantTargetSquare,
    });
  }

  private startTurn() {
    if (this.turnOver) throw new Error("Turn already ended");
    this.listeners?.onTurnStartListener.forEach((fn) => fn(this));
  }

  public endTurn(move: Move, enPassantTargetSquare?: Coordinates) {
    // this throws an error so we are aware that some logic is wrong
    if (this.turnOver) throw new Error("Turn already ended");

    this.move = move;
    this.enPassantTargetSquare = enPassantTargetSquare;
    this.turnOver = true;
    this.listeners?.onTurnEndListener.forEach((fn) => fn(this));
  }

  public toFen(): Fen {
    const fen = new Fen();
    fen.setFenPieces(Fen.fromBoard(this.board));
    fen.setCastleStatus(this.castleStatus);
    fen.setTurnsCount(this.turnCount);
    fen.setHalfMoveClock(this.halfMoveClock);
    fen.setTurn(this.currentPlayer);
    fen.setEnPassantTargetSquare(this.enPassantTargetSquare ? MoveNotation.toCell(this.enPassantTargetSquare) : "-");
    return fen;
  }

  get isTurnOver() {
    return this.turnOver;
  }
}
