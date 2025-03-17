import { Move } from "../types"
import { Turn } from "./Turn"

type TurnFunction = (turn: Turn) => void
type MoveFunction = (move: Move) => void

export class Listeners {
  public onTurnEndListener: TurnFunction[] = []
  public onTurnStartListener: TurnFunction[] = []
  public onAfterMoveListener: MoveFunction[] = []
  public onBeforeMoveListener: MoveFunction[] = []
}