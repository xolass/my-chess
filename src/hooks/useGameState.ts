import { useCallback, useEffect, useMemo, useState } from "react";
import { Board, FenColors, Coordinates, FenPieces, FenType, Piece } from "../types";
import { useRookActions } from "./useRookActions";
import { isSamePosition } from "@/auxFunctions";
import { useBishopActions } from "./useBishopActions";
import { useKnightActions } from "./useKnightActions";
import { useQueenActions } from "./useQueenActions";
import { useKingActions } from "./useKingActions";
import { usePawnActions } from "./usePawnActions";

// TODO: remove things that are not state related, for example game logic (canPieceMove, movePiece)
export function useGameState() {
  const { canRookMove, isRook } = useRookActions()
  const { canBishopMove, isBishop } = useBishopActions()
  const { canKnightMove, isKnight } = useKnightActions()
  const { canQueenMove, isQueen } = useQueenActions()
  const { canKingMove, isKing } = useKingActions()
  const { canPawnMove, isPawn } = usePawnActions()

  const [FENHistory, setFENHistory] = useState<FenType[]>(["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"])
  const [currentMovingPiece, setCurrentMovingPiece] = useState<{ piece: Piece; coordinates: Coordinates }>()

  const currentFEN = useMemo(() => FENHistory[FENHistory.length - 1], [FENHistory])

  const addFENToHistory = (fen: FenType) => setFENHistory((prevFenHistory) => [...prevFenHistory, fen])

  const fenPieces = useMemo(() => currentFEN.split(' ')[0] as FenPieces, [currentFEN])
  const turn = useMemo(() => currentFEN.split(' ')[1] as FenColors, [currentFEN])
  const castleStatus = useMemo(() => currentFEN.split(' ')[2], [currentFEN])
  const enPeasentTargetSquare = useMemo(() => currentFEN.split(' ')[3], [currentFEN])
  const halfMoveClock = useMemo(() => Number(currentFEN.split(' ')[4]), [currentFEN])
  const turnsCount = useMemo(() => Number(currentFEN.split(' ')[5]), [currentFEN])

  const switchTurn = (turn: FenColors): FenColors => {
    if (turn === 'w') {
      return 'b'
    }

    return 'w'
  }

  const transformMatrixInFEN = useCallback((matrix: Board): FenPieces => {
    return matrix.map((row) => {
      let result = ''
      let emptySpaces = 0

      row.forEach((cell) => {
        if (!cell) {
          emptySpaces++
          return
        }

        if (emptySpaces) {
          result += emptySpaces
          emptySpaces = 0
        }

        result += cell
      })

      if (emptySpaces) {
        result += emptySpaces
      }

      return result
    }).join('/') as FenPieces
  }, [])


  const boardAsMatrix = useMemo(() => {
    const rows = fenPieces.split('/')

    const boardMatrix = rows.map((row) => getFENRowAsArray(row))

    return boardMatrix
  }, [fenPieces])

  function getFENRowAsArray(row: string) {
    const cells: Array<Piece | null> = []
    Array.from(row).forEach((char) => {
      if (Number.isNaN(Number(char))) {
        return cells.push(char as Piece)
      }

      const emptySpaces = Number(char)
      cells.push(...Array.from<null>({ length: emptySpaces }).fill(null))
    })

    return cells
  }

  const getPieceInCell = useCallback(({ row, col }: Coordinates) => boardAsMatrix[row][col], [boardAsMatrix])

  const canPieceMove = useCallback((from: Coordinates, to: Coordinates) => {
    const piece = boardAsMatrix[from.row][from.col]

    if (!piece) return false

    if (isRook(piece)) {
      return canRookMove(boardAsMatrix, from, to)
    }
    if (isBishop(piece)) {
      return canBishopMove(boardAsMatrix, from, to)
    }
    if (isQueen(piece)) {
      return canQueenMove(boardAsMatrix, from, to)
    }
    if (isKnight(piece)) {
      return canKnightMove(boardAsMatrix, from, to)
    }
    if (isKing(piece)) {
      return canKingMove(boardAsMatrix, from, to)
    }
    if (isPawn(piece)) {
      return canPawnMove(boardAsMatrix, from, to, enPeasentTargetSquare)
    }

    return true

  }, [
    isPawn,
    canPawnMove,
    enPeasentTargetSquare,
    boardAsMatrix,
    canRookMove,
    isRook,
    canBishopMove,
    isBishop,
    isKnight,
    canKnightMove,
    isQueen,
    canQueenMove,
    isKing,
    canKingMove
  ])

  const movePiece = useCallback((from: Coordinates, to: Coordinates) => {
    const piece = boardAsMatrix[from.row][from.col]

    if (!piece) return
    if (isSamePosition(from, to)) return
    if (!canPieceMove(from, to)) return

    boardAsMatrix[from.row][from.col] = null
    boardAsMatrix[to.row][to.col] = piece

    const pieces = transformMatrixInFEN(boardAsMatrix)
    const newTurn = switchTurn(turn)
    const fen: FenType = `${pieces} ${newTurn} ${castleStatus} ${enPeasentTargetSquare} ${halfMoveClock} ${turnsCount}`

    addFENToHistory(fen)
    setCurrentMovingPiece(undefined)
  }, [
    boardAsMatrix,
    transformMatrixInFEN,
    canPieceMove,
    turn,
    castleStatus,
    enPeasentTargetSquare,
    halfMoveClock,
    turnsCount
  ])

  const setMovingPiece = (piece: Piece, coordinates: Coordinates) => {
    setCurrentMovingPiece({ piece, coordinates })
  }


  return {
    boardAsMatrix,
    getPieceInCell,
    movePiece,
    currentMovingPiece,
    setMovingPiece,
  }
}