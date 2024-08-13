import { useCallback, useEffect, useMemo, useState } from "react";
import { Board, Coordinates, FenType, Piece } from "../types";
import { useRookActions } from "./useRookActions";
import { isSamePosition } from "@/auxFunctions";


export function useGameState() {
  const { canRookMove, isRook } = useRookActions()
  const [FENHistory, setFENHistory] = useState<FenType[]>(["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"])
  const [currentMovingPiece, setCurrentMovingPiece] = useState<{ piece: Piece; coordinates: Coordinates }>()

  const currentFEN = useMemo(() => FENHistory[FENHistory.length - 1], [FENHistory])

  const addFENToHistory = useCallback((fen: FenType) => {
    setFENHistory([...FENHistory, fen])
  }, [FENHistory])

  const getFENPieces = useCallback(() => currentFEN.split(' ')[0], [currentFEN])
  const getTurn = useCallback(() => currentFEN.split(' ')[1], [currentFEN])
  const getFENCastleStatus = useCallback(() => currentFEN.split(' ')[2], [currentFEN])
  const getEnPeasentTargetSquare = useCallback(() => currentFEN.split(' ')[3], [currentFEN])
  const getHalfMoveClock = useCallback(() => currentFEN.split(' ')[4], [currentFEN])
  const getTurns = useCallback(() => currentFEN.split(' ')[5], [currentFEN])


  const transformMatrixInFEN = useCallback((matrix: Board): FenType => {
    const piecesPartOfFEN = matrix.map((row) => {
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
    }).join('/')

    return `${piecesPartOfFEN} ${currentFEN.split(' ').slice(1).join(' ')}` as FenType
  }, [currentFEN])


  const boardAsMatrix = useMemo(() => {
    const boardAsFEN = getFENPieces()
    const rows = boardAsFEN.split('/')

    const boardMatrix = rows.map((row) => getFENRowAsArray(row))

    return boardMatrix
  }, [getFENPieces])

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
  }, [boardAsMatrix, canRookMove, isRook])

  const movePiece = useCallback((from: Coordinates, to: Coordinates) => {
    const piece = boardAsMatrix[from.row][from.col]

    if (!piece) return
    if (isSamePosition(from, to)) return
    if (!canPieceMove(from, to)) return

    boardAsMatrix[from.row][from.col] = null
    boardAsMatrix[to.row][to.col] = piece

    setCurrentMovingPiece(undefined)
    addFENToHistory(transformMatrixInFEN(boardAsMatrix))
  }, [boardAsMatrix, addFENToHistory, transformMatrixInFEN, canPieceMove])

  const setMovingPiece = useCallback((piece: Piece, coordinates: Coordinates) => {
    setCurrentMovingPiece({ piece, coordinates })
  }, [])


  return {
    boardAsMatrix,
    getPieceInCell,
    movePiece,
    currentMovingPiece,
    setMovingPiece,
  }
}