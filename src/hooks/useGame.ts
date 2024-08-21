import { isSamePosition } from "@/auxFunctions";
import { gameState } from "@/classes/GameState";
import { Piece } from "@/classes/Piece";
import { useCallback, useEffect, useState } from "react";
import { Board, Coordinates, FenPiecesSection, FenType, PieceLetter } from "../types";

export function useGame() {
  const [_, setFenHistory] = useState(gameState.fenHistory);

  useEffect(() => {
    const update = () => setFenHistory([...gameState.fenHistory]);

    gameState.subscribe(update);

    return () => {
      gameState.unsubscribe(update);
    };
  }, []);
  const getBoardAsMatrix = useCallback(() => {
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

    const fenPieces = gameState.fenPieces;
    const rows = fenPieces.split("/");

    const boardMatrix = rows.map((row) => getFENRowAsArray(row));
    return boardMatrix;
  }, []);

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

  const setMovingPiece = useCallback((coordinates: Coordinates) => {
    gameState.currentMovingPiece = coordinates;
  }, []);

  const canPieceMove = useCallback(
    (from: Coordinates, to: Coordinates) => {
      if (!Piece.isPieceWayOfMoving(getBoardAsMatrix(), from, to)) return false;

      return true;
    },
    [getBoardAsMatrix]
  );

  const movePiece = useCallback(
    (from: Coordinates, to: Coordinates) => {
      const tempBoard = getBoardAsMatrix();
      const piece = tempBoard[from.row][from.col];
      if (!piece) return;

      if (isSamePosition(from, to)) return;

      if (!canPieceMove(from, to)) return;

      tempBoard[from.row][from.col] = null;
      tempBoard[to.row][to.col] = piece;

      const piecesSection = transformMatrixInFEN(tempBoard);
      const newTurn = gameState.switchTurn(gameState.turn);

      // add logic of en passant, castling, halfMoveClock, turnsCount
      const fen: FenType = `${piecesSection} ${newTurn} ${gameState.castleStatus} ${gameState.enPassantTargetSquare} ${gameState.halfMoveClock} ${gameState.turnsCount}`;

      gameState.addToFenHistory(fen);
      gameState.currentMovingPiece = undefined;
    },
    [getBoardAsMatrix, transformMatrixInFEN, canPieceMove]
  );

  return {
    getBoardAsMatrix,
    movePiece,
    setMovingPiece,
  };
}
