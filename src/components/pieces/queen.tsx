import { useGameStore } from "@/stores/GameContext";
import { Colors, GenericPiece } from "../../shared/types";

import { BlackQueenAsset } from "assets/blackQueen";
import { WhiteQueenAsset } from "assets/whiteQueen";
import { twMerge } from "tailwind-merge";

function QueenPiece({ color }: GenericPiece) {
  const player = useGameStore((state) => state.player);
  return (
    <div className={twMerge("size-full absolute bg-contain ", player === Colors.BLACK && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteQueenAsset /> : <BlackQueenAsset />}
    </div>
  );
}

export default QueenPiece;
