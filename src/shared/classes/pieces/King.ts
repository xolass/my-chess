import { Board } from "@/shared/classes/Board";
import { CastleManager } from "@/shared/classes/CastleManager";
import { Piece } from "@/shared/classes/Piece";
import { Colors, Coordinates, FenCastle } from "@/shared/types";
import { directionToCoordinates } from "@/shared/utils";

export class King extends Piece {
  constructor(public override color: Colors, public override coordinates: Coordinates) {
    super(color, coordinates, "k");
  }

  override isValidMove(board: Board, to: Coordinates): boolean {
    const from = this.coordinates;

    if (this.isSamePosition(to)) return false;

    if (this.isTryingToCaptureAlly(board, to)) return false;

    if (!this.isKingWayOfMoving(from, to)) return false;

    return true;
  }

  public getCastlePossibleMoves(board: Board, castleStatus: FenCastle) {
    const from = this.coordinates;
    const castlePossibilities = [
      CastleManager.WHITE_SHORT_ROOK_COORDINATES,
      CastleManager.WHITE_LONG_ROOK_COORDINATES,
      CastleManager.BLACK_SHORT_ROOK_COORDINATES,
      CastleManager.BLACK_LONG_ROOK_COORDINATES,
    ];

    const castleLegalMoves = castlePossibilities.filter((to) => {
      return CastleManager.canCastle(board, from, to, castleStatus);
    });

    return castleLegalMoves;
  }

  private isKingWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);

    // less or equal because in case of up, down, left right, col/row is equal, so === 0
    const isMovingOneSquare = Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;

    return isMovingOneSquare && (isHorizontal || isVertical || isDiagonal);
  }

  override calculatePossibleMoves(board: Board): Array<Coordinates> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };

        if (board.isInsideBoard(next) && this.isValidMove(board, next)) {
          return next;
        }
      })
      .filter(Boolean) as Coordinates[];

    return moves;
  }

  override getAllDirectionMoves(board: Board): Array<Coordinates> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };

        if (board.isInsideBoard(next)) {
          return next;
        }
      })
      .filter(Boolean) as Coordinates[];

    return moves;
  }
}
