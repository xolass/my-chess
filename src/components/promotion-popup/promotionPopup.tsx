import BishopPiece from "@/components/pieces/bishop";
import KnightPiece from "@/components/pieces/knight";
import QueenPiece from "@/components/pieces/queen";
import RookPiece from "@/components/pieces/rook";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { Colors, PromotionOptions } from "@/shared/types";
import { gameStore } from "@/stores/GameContext";
import { usePromotionStore } from "@/stores/PromotionContext";
import { twMerge } from "tailwind-merge";

interface PromotionPopupProps {
  colToSpawn: number;
  colorToSpawnTo: Colors;
}

export function PromotionPopup(props: PromotionPopupProps) {
  const { colToSpawn, colorToSpawnTo } = props;
  const game = gameStore((state) => state.game);
  const handlePromotingPiece = usePromotionStore((state) => state.handlePromotingPiece);

  const isPromotionModalOpen = usePromotionStore((state) => state.isPromotionModalOpen);
  const positionToSpawnModal = usePromotionStore((state) => state.positionToSpawnModal);

  const clickOutsideRef = useOutsideClick(onClickOutside);

  function onClickOutside() {
    choosePiece(null);
  }

  function choosePiece(piece: PromotionOptions | null) {
    if (!handlePromotingPiece) return;
    handlePromotingPiece(piece);
  }

  const isPromotingInThisCell = false; // isPromotionModalOpen && positionToSpawnModal?.col === col && positionToSpawnModal?.row === row;

  if (!isPromotingInThisCell) return null;

  return (
    <>
      <div id="modal-background" className="absolute inset-0 bg-black/25 z-10"></div>
      <div
        ref={clickOutsideRef}
        className={twMerge(
          "flex z-20 absolute",
          game.currentPlayer === Colors.WHITE && "flex-col top-0",
          game.currentPlayer === Colors.BLACK && "flex-col-reverse bottom-0"
        )}
      >
        <button
          id="promotion-queen"
          className="relative size-24 rounded-[999px] bg-white/40 transition-all duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("q")}
        >
          <div className="cursor-pointer flex items-center justify-center">
            <QueenPiece color={game.currentPlayer} />
          </div>
        </button>
        <button
          id="promotion-rook"
          className="relative size-24 rounded-[999px] bg-white/40 transition-[border-radius] duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("r")}
        >
          <div className="cursor-pointer flex items-center justify-center">
            <RookPiece color={game.currentPlayer} />
          </div>
        </button>
        <button
          id="promotion-knight"
          className="relative size-24 rounded-[999px] bg-white/40 transition-[border-radius] duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("n")}
        >
          <div className="cursor-pointer flex items-center justify-center">
            <KnightPiece color={game.currentPlayer} />
          </div>
        </button>
        <button
          id="promotion-bishop"
          className="relative size-24 rounded-[999px] bg-white/40 transition-[border-radius] duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("b")}
        >
          <div className="cursor-pointer flex items-center justify-center">
            <BishopPiece color={game.currentPlayer} />
          </div>
        </button>
      </div>
    </>
  );
}
