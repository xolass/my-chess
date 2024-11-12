import { useGameStore } from "@/stores/GameContext";
import { Colors, GenericPiece } from "@/types";
import { BlackKingAsset } from "assets/blackKing";
import { WhiteKingAsset } from "assets/whiteKing";

import { twMerge } from "tailwind-merge";

function KingPiece({ color }: GenericPiece) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayer);
  return (
    <div className={twMerge("size-full absolute bg-contain bg-black-queen", isBlackPlayer && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteKingAsset /> : <BlackKingAsset />}
    </div>
  );
}

export default KingPiece;
