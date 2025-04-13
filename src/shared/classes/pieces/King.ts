import { Board } from "@/shared/classes/Board";
import { CastleManager } from "@/shared/classes/CastleManager";
import { Move } from "@/shared/classes/Move";
import { Piece } from "@/shared/classes/Piece";
import { Colors, Coordinates, FenCastle } from "@/shared/types";
import { directionToCoordinates } from "@/shared/utils";

export class King extends Piece {
  castleLegalMoves: Move[] = []; // So the player can castle moving the king above the rook or to it's final square
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

  public getCastlePossibleMoves(board: Board, castleStatus: FenCastle): Move[] {
    const from = this.coordinates;
    const castlePossibilities = [
      CastleManager.WHITE_SHORT_ROOK_COORDINATES,
      CastleManager.WHITE_LONG_ROOK_COORDINATES,
      CastleManager.BLACK_SHORT_ROOK_COORDINATES,
      CastleManager.BLACK_LONG_ROOK_COORDINATES,
    ];

    const castleLegalMoves = castlePossibilities
      .filter((to) => {
        return CastleManager.canCastle(board, from, to, castleStatus);
      })
      .map((to) => {
        return new Move(from, to, {
          castle: {
            color: this.color,
            isLongCastle: CastleManager.isLongCastle(from, to),
            isShortCastle: CastleManager.isShortCastle(from, to),
          },
        });
      });

    this.castleLegalMoves = this.getAuxiliaryCastleMoves(castleLegalMoves);

    return castleLegalMoves;
  }

  private getAuxiliaryCastleMoves(castleLegalMoves: Move[]): Move[] {
    return castleLegalMoves.map((move) => {
      const { row, col } = move.to;
      let modifier = 0;
      if (move.flags?.castle?.isLongCastle) {
        modifier = 2;
      } else if (move.flags?.castle?.isShortCastle) {
        modifier = -1;
      }
      const auxiliaryMove = new Move(move.from, { row, col: col + modifier }, move.flags);

      return auxiliaryMove;
    });
  }

  private isKingWayOfMoving(from: Coordinates, to: Coordinates) {
    const isHorizontal = from.row === to.row;
    const isVertical = from.col === to.col;
    const isDiagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);

    // less or equal because in case of up, down, left right, col/row is equal, so === 0
    const isMovingOneSquare = Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;

    return isMovingOneSquare && (isHorizontal || isVertical || isDiagonal);
  }

  override calculatePossibleMoves(board: Board): Array<Move> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };

        if (board.isInsideBoard(next) && this.isValidMove(board, next)) {
          return new Move(this.coordinates, next);
        }
      })
      .filter(Boolean) as Move[];

    return moves;
  }

  override getAllDirectionMoves(board: Board): Array<Move> {
    const directions = Object.values(directionToCoordinates);

    const moves = directions
      .map((direction) => {
        if (!direction.pieces.includes(this.pieceLetter)) return;

        let next = { row: this.coordinates.row + direction.row, col: this.coordinates.col + direction.col };

        if (board.isInsideBoard(next)) {
          return new Move(this.coordinates, next);
        }
      })
      .filter(Boolean) as Move[];

    return moves;
  }
}
