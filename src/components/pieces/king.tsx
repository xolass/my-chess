import { Colors, GenericPiece } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";
import { BlackKingAsset } from "assets/blackKing";
import { WhiteKingAsset } from "assets/whiteKing";

import { twMerge } from "tailwind-merge";

function KingPiece({ color }: GenericPiece) {
  const player = useGameStore((state) => state.player);
  return (
    <div className={twMerge("size-full absolute bg-contain ", player === Colors.BLACK && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteKingAsset /> : <BlackKingAsset />}
    </div>
  );
}

export default KingPiece;
