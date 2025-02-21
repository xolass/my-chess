import { CaptureIndicator } from "@/components/cell/overlays/move-indicator/captureIndicator";
import { DotIndicator } from "@/components/cell/overlays/move-indicator/dotIndicator";
import { HoverIndicator } from "@/components/cell/overlays/move-indicator/hoverIndicator";
import { Piece } from "@/shared/classes/Piece";
import { Coordinates } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";

interface CellOverlayProps {
  movingPiece: Piece | undefined;
  cellCoordinates: Coordinates;
  isMouseOver: boolean;
  isPieceLegalMove: boolean;
  isPiecePreMove: boolean;
}

export function BoardCellOverlay(props: CellOverlayProps) {
  const { movingPiece, cellCoordinates, isMouseOver, isPieceLegalMove, isPiecePreMove } = props;

  const game = useGameStore((state) => state.game);
  const player = useGameStore((state) => state.player);

  const isYourPiece = movingPiece?.color === player;

  if (!isYourPiece) return null; // optimization since rerender on mouseEnter and mouseLeave
  if (!movingPiece) return null; // optimization since rerender on mouseEnter and mouseLeave
  if (!isPieceLegalMove && !isPiecePreMove) return null; // optimization since rerender on mouseEnter and mouseLeave

  function getIsCapture() {
    const attackedPiece = game.board.getSquare(cellCoordinates).piece;

    return attackedPiece;
  }

  const isCapture = getIsCapture();

  if (isMouseOver) {
    return <HoverIndicator isPreMove={isPiecePreMove} />;
  }

  if (isCapture) {
    return <CaptureIndicator isPreMove={isPiecePreMove} />;
  }

  return <DotIndicator isPreMove={isPiecePreMove} />;
}
