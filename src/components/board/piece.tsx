"use client";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Colors, Coordinates, PieceLetter } from "../../types";
import BishopPiece from "../pieces/bishop";
import KingPiece from "../pieces/king";
import KnightPiece from "../pieces/knight";
import PawnPiece from "../pieces/pawn";
import QueenPiece from "../pieces/queen";
import RookPiece from "../pieces/rook";

interface Props {
  piece: PieceLetter | null;
  coordinates: Coordinates;
}

function PieceComponent({ piece, coordinates }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${piece} ${coordinates.col}-${coordinates.row}`,
    data: { piece, coordinates },
  });

  function getPiece() {
    switch (piece) {
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
  }

  return (
    <div ref={setNodeRef} className="cursor-pointer size-full" {...listeners} {...attributes}>
      {getPiece()}
    </div>
  );
}

export default React.memo(PieceComponent);
