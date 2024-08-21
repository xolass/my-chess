"use client";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Coordinates, PieceLetter } from "../../types";
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
        return <PawnPiece color={"w"} />;
      case "p":
        return <PawnPiece color={"b"} />;
      case "R":
        return <RookPiece color={"w"} />;
      case "r":
        return <RookPiece color={"b"} />;
      case "N":
        return <KnightPiece color={"w"} />;
      case "n":
        return <KnightPiece color={"b"} />;
      case "B":
        return <BishopPiece color={"w"} />;
      case "b":
        return <BishopPiece color={"b"} />;
      case "Q":
        return <QueenPiece color={"w"} />;
      case "q":
        return <QueenPiece color={"b"} />;
      case "K":
        return <KingPiece color={"w"} />;
      case "k":
        return <KingPiece color={"b"} />;
      default:
        return null;
    }
  }

  return (
    <div ref={setNodeRef} className="cursor-pointer" {...listeners} {...attributes}>
      {getPiece()}
    </div>
  );
}

export default React.memo(PieceComponent);
