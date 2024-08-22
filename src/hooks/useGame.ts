import { getPieceColor, isSamePosition, isTurnOfPiece } from "@/auxFunctions";
import { Piece } from "@/classes/Piece";
import { useGameState } from "@/gameState";
import { useCallback, useMemo } from "react";
import { Board, Coordinates, FenPiecesSection, FenType, PieceLetter } from "../types";

export function useGame() {
  const { fenPieces, addToFenHistory, switchTurn, currentMovingPiece, ...state } = useGameState();

  const boardAsMatrix = useMemo(() => {
    function getFENRowAsArray(row: string) {
      const cells: Array<PieceLetter | null> = [];
      Array.from(row).forEach((char) => {
        if (Number.isNaN(Number(char))) {
          return cells.push(char as PieceLetter);
        }

        const emptySpaces = Number(char);
        cells.push(...Array.from<null>({ length: emptySpaces }).fill(null));
      });

      return cells;
    }

    const rows = fenPieces.split("/");

    const boardMatrix = rows.map((row) => getFENRowAsArray(row));
    return boardMatrix;
  }, [fenPieces]);

  const transformMatrixInFEN = useCallback((matrix: Board): FenPiecesSection => {
    return matrix
      .map((row) => {
        let result = "";
        let emptySpaces = 0;

        row.forEach((cell) => {
          if (!cell) {
            emptySpaces++;
            return;
          }

          if (emptySpaces) {
            result += emptySpaces;
            emptySpaces = 0;
          }

          result += cell;
        });

        if (emptySpaces) {
          result += emptySpaces;
        }

        return result;
      })
      .join("/") as FenPiecesSection;
  }, []);

  const setMovingPiece = useCallback(
    (coordinates: Coordinates) => {
      currentMovingPiece.current = coordinates;
    },
    [currentMovingPiece]
  );

  const canPieceMove = useCallback(
    (from: Coordinates, to: Coordinates) => {
      const piece = boardAsMatrix[from.row][from.col];
      if (!piece) return false;
      const pieceColor = getPieceColor(piece);

      if (!isTurnOfPiece(state.turn, pieceColor)) return false;
      if (isSamePosition(from, to)) return false;

      if (!Piece.isPieceWayOfMoving(boardAsMatrix, from, to, state.enPassantTargetSquare)) return false;

      return true;
    },
    [boardAsMatrix, state]
  );

  const movePiece = useCallback(
    (from: Coordinates, to: Coordinates) => {
      const tempBoard = structuredClone(boardAsMatrix);
      const piece = tempBoard[from.row][from.col];
      if (!piece) return;

      if (!canPieceMove(from, to)) return;

      tempBoard[from.row][from.col] = null;
      tempBoard[to.row][to.col] = piece;

      const piecesSection = transformMatrixInFEN(tempBoard);
      const newTurn = switchTurn(state.turn);

      // add logic of en passant, castling, halfMoveClock, turnsCount
      const fen: FenType = `${piecesSection} ${newTurn} ${state.castleStatus} ${state.enPassantTargetSquare} ${state.halfMoveClock} ${state.turnsCount}`;

      addToFenHistory(fen);
      currentMovingPiece.current = undefined;
    },
    [boardAsMatrix, transformMatrixInFEN, canPieceMove, currentMovingPiece, addToFenHistory, switchTurn, state]
  );

  return {
    boardAsMatrix,
    movePiece,
    setMovingPiece,
  };
}
