import { Colors } from "@/shared/types";
import { EventEmitter } from "events";

type GameEvents = {
  checkmate: [Colors];
  stalemate: [];
};

export const gameEventEmitter = new EventEmitter<GameEvents>();
