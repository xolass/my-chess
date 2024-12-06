import { useGameStore } from "@/stores/GameContext";
import { Colors, GenericPiece } from "../../types";

import { BlackQueenAsset } from "assets/blackQueen";
import { WhiteQueenAsset } from "assets/whiteQueen";
import { twMerge } from "tailwind-merge";

function QueenPiece({ color }: GenericPiece) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayerVision);
  return (
    <div className={twMerge("size-full absolute bg-contain ", isBlackPlayer && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteQueenAsset /> : <BlackQueenAsset />}
    </div>
  );
}

export default QueenPiece;
