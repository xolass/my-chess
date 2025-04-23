import BishopPiece from "@/components/pieces/bishop";
import KnightPiece from "@/components/pieces/knight";
import QueenPiece from "@/components/pieces/queen";
import RookPiece from "@/components/pieces/rook";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { MoveNotation } from "@/shared/classes/MoveNotation";
import { Colors, PromotionOptions } from "@/shared/types";
import { gameStore } from "@/stores/GameContext";
import { promotionStore } from "@/stores/PromotionContext";
import { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

interface PromotionPopupProps {
  colToSpawn: number;
  colorToSpawnTo: Colors;
}

export function PromotionPopup(props: PromotionPopupProps) {
  const { colToSpawn, colorToSpawnTo } = props;
  const { game } = gameStore.getState();
  const { handlePromotingPiece } = promotionStore.getState();

  const rowToSpawn = colorToSpawnTo === Colors.WHITE ? 0 : 7;

  const clickOutsideRef = useOutsideClick(onClickOutside);

  const cellToSpawnId = MoveNotation.toCell({
    col: colToSpawn,
    row: rowToSpawn,
  });

  function onClickOutside() {
    choosePiece(null);
  }

  function choosePiece(piece: PromotionOptions | null) {
    if (!handlePromotingPiece) return;
    handlePromotingPiece(piece);
  }

  const cellToSpawn = document.getElementById(cellToSpawnId);

  if (!cellToSpawn) {
    throw new Error("Promotion popup cell not found");
  }

  const cellSize = `${cellToSpawn.getBoundingClientRect().width}px`;

  return ReactDOM.createPortal(
    <>
      <div id="modal-background" className="fixed inset-0 bg-black/35 z-30"></div>
      <div
        ref={clickOutsideRef}
        className={twMerge(
          "flex z-40 absolute",
          game.currentPlayer === Colors.WHITE && "flex-col top-0",
          game.currentPlayer === Colors.BLACK && "flex-col-reverse bottom-0"
        )}
      >
        <PromotionButtonPiece
          id="promotion-queen"
          onClick={() => choosePiece("q")}
          style={{ height: cellSize, width: cellSize }}
        >
          <QueenPiece
            className="transition-all duration-200 ease-out size-[80%] hover:size-[100%]"
            color={game.currentPlayer}
          />
        </PromotionButtonPiece>

        <PromotionButtonPiece
          id="promotion-rook"
          onClick={() => choosePiece("r")}
          style={{ height: cellSize, width: cellSize }}
        >
          <RookPiece
            className="transition-all duration-200 ease-out size-[80%] hover:size-[100%]"
            color={game.currentPlayer}
          />
        </PromotionButtonPiece>
        <PromotionButtonPiece
          id="promotion-knight"
          onClick={() => choosePiece("n")}
          style={{ height: cellSize, width: cellSize }}
        >
          <KnightPiece
            className="transition-all duration-200 ease-out size-[80%] hover:size-[100%]"
            color={game.currentPlayer}
          />
        </PromotionButtonPiece>
        <PromotionButtonPiece
          id="promotion-bishop"
          onClick={() => choosePiece("b")}
          style={{ height: cellSize, width: cellSize }}
        >
          <BishopPiece
            className="transition-all duration-200 ease-out size-[80%] hover:size-[100%]"
            color={game.currentPlayer}
          />
        </PromotionButtonPiece>
      </div>
    </>,
    cellToSpawn
  );
}
interface PromotionButtonPieceProps {
  id: string;
  onClick: VoidFunction;
  style: CSSProperties;
  children?: React.ReactNode;
}

function PromotionButtonPiece({ id, onClick, children, style }: PromotionButtonPieceProps) {
  return (
    <button
      id={id}
      style={style}
      className="relative rounded-[50px] bg-gray-100/90 shadow-promotion-popup-cell transition-all duration-200 ease-out hover:rounded-[4px]"
      onClick={onClick}
    >
      <div className="cursor-pointer flex items-center justify-center">{children}</div>
    </button>
  );
}
