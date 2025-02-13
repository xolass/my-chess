import BishopPiece from "@/components/pieces/bishop";
import KnightPiece from "@/components/pieces/knight";
import QueenPiece from "@/components/pieces/queen";
import RookPiece from "@/components/pieces/rook";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { Colors, PromotionOptions } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";
import { usePromotionStore } from "@/stores/PromotionContext";
import { twMerge } from "tailwind-merge";

export function PromotionPopup() {
  const game = useGameStore((state) => state.game);
  const handlePromotingPiece = usePromotionStore((state) => state.handlePromotingPiece);

  const clickOutsideRef = useOutsideClick(onClickOutside);

  function onClickOutside() {
    choosePiece(null);
  }

  function choosePiece(piece: PromotionOptions | null) {
    if (!handlePromotingPiece) return;
    handlePromotingPiece(piece);
  }

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
