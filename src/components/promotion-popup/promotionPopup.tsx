import BishopPiece from "@/components/pieces/bishop";
import KnightPiece from "@/components/pieces/knight";
import QueenPiece from "@/components/pieces/queen";
import RookPiece from "@/components/pieces/rook";
import { useGameStore } from "@/stores/GameContext";
import { Colors, PromotionOptions } from "@/types";
export function PromotionPopup() {
  const handlePromotingPiece = useGameStore((state) => state.handlePromotingPiece);
  function choosePiece(piece: PromotionOptions) {
    if (!handlePromotingPiece) return;
    handlePromotingPiece(piece);
  }

  return (
    <>
      <div id="modal-background" className="absolute inset-0 bg-black/25 z-10"></div>
      <div className="flex flex-col gap-1 z-20 absolute top-0">
        <button
          id="promotion-queen"
          className="border-1 border-white p-1 rounded-[999px] bg-black/90 transition-all duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("q")}
        >
          <QueenPiece color={Colors.WHITE} />
        </button>
        <button
          id="promotion-rook"
          className="border-1 border-white p-1 rounded-[999px] bg-black/40 transition-[border-radius] duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("r")}
        >
          <RookPiece color={Colors.WHITE} />
        </button>
        <button
          id="promotion-knight"
          className="border-1 border-white p-1 rounded-[999px] bg-black/40 transition-[border-radius] duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("n")}
        >
          <KnightPiece color={Colors.WHITE} />
        </button>
        <button
          id="promotion-bishop"
          className="border-1 border-white p-1 rounded-[999px] bg-black/40 transition-[border-radius] duration-0 ease-in hover:rounded-[4px] "
          onClick={() => choosePiece("b")}
        >
          <BishopPiece color={Colors.WHITE} />
        </button>
      </div>
    </>
  );
}
