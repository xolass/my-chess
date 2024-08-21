import { Coordinates, FenColors, FenPiecesSection, FenType } from "@/types";

type Listener = () => void;

export class GameState {
  fenHistory: FenType[] = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"];

  currentMovingPiece: Coordinates | undefined;

  private listeners: Listener[] = [];

  addToFenHistory(fen: FenType) {
    this.fenHistory.push(fen);
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  get currentFen() {
    return this.fenHistory[this.fenHistory.length - 1];
  }
  get fenPieces() {
    return this.currentFen.split(" ")[0] as FenPiecesSection;
  }
  get turn(): FenColors {
    return this.currentFen.split(" ")[1] as FenColors;
  }
  get castleStatus() {
    return this.currentFen.split(" ")[2];
  }
  get enPassantTargetSquare() {
    return this.currentFen.split(" ")[3];
  }
  get halfMoveClock() {
    return Number(this.currentFen.split(" ")[4]);
  }
  get turnsCount() {
    return Number(this.currentFen.split(" ")[5]);
  }

  switchTurn(turn: FenColors): FenColors {
    return turn === "w" ? "b" : "w";
  }
}

export const gameState = new GameState();
