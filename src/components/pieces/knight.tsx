import { useGameStore } from "@/stores/GameContext";
import { Colors, GenericPiece } from "@/types";
import { BlackKnightAsset } from "assets/blackKnight";
import { WhiteKnightAsset } from "assets/whiteKnight";

import { twMerge } from "tailwind-merge";

function KnightPiece({ color }: GenericPiece) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayer);
  return (
    <div className={twMerge("size-full absolute bg-contain bg-black-queen", isBlackPlayer && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteKnightAsset /> : <BlackKnightAsset />}
    </div>
  );
}

export default KnightPiece;
