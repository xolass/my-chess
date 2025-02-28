"use client";
import { DraggablePiece } from "@/components/dnd-components/draggable-piece";
import { Piece } from "@/shared/classes/Piece";
import React, { useMemo } from "react";
import { Colors } from "../../shared/types";
import BishopPiece from "./bishop";
import KingPiece from "./king";
import KnightPiece from "./knight";
import PawnPiece from "./pawn";
import QueenPiece from "./queen";
import RookPiece from "./rook";

interface PieceProps {
  piece: Piece;
}

function PieceComponent({ piece }: PieceProps) {
  const { pieceLetter } = piece;
  // const { pieceDragRelease } = useGameActions();
  // const movingPiece = useMoveStore(({ movingPiece }) => movingPiece);

  const pieceToPlace = useMemo(() => {
    switch (pieceLetter) {
      case "P":
        return <PawnPiece color={Colors.WHITE} />;
      case "p":
        return <PawnPiece color={Colors.BLACK} />;
      case "R":
        return <RookPiece color={Colors.WHITE} />;
      case "r":
        return <RookPiece color={Colors.BLACK} />;
      case "N":
        return <KnightPiece color={Colors.WHITE} />;
      case "n":
        return <KnightPiece color={Colors.BLACK} />;
      case "B":
        return <BishopPiece color={Colors.WHITE} />;
      case "b":
        return <BishopPiece color={Colors.BLACK} />;
      case "Q":
        return <QueenPiece color={Colors.WHITE} />;
      case "q":
        return <QueenPiece color={Colors.BLACK} />;
      case "K":
        return <KingPiece color={Colors.WHITE} />;
      case "k":
        return <KingPiece color={Colors.BLACK} />;
      default:
        return null;
    }
  }, [pieceLetter]);

  // function handlePieceClick() {
  //   if (!movingPiece) return;
  //   pieceDragRelease(movingPiece.coordinates, piece.coordinates);
  // }

  return (
    <DraggablePiece piece={piece}>
      <div className="size-full">{pieceToPlace}</div>
    </DraggablePiece>
  );
}

export default React.memo(PieceComponent);
