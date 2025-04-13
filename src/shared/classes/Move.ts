import { Coordinates, MoveFlags } from "@/shared/types";

export class Move {
  constructor(public from: Coordinates, public to: Coordinates, public flags?: MoveFlags) {}
}
