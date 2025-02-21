import { Colors, GenericPiece } from "@/shared/types";
import { useGameStore } from "@/stores/GameContext";
import { BlackKnightAsset } from "assets/blackKnight";
import { WhiteKnightAsset } from "assets/whiteKnight";

import { twMerge } from "tailwind-merge";

function KnightPiece({ color }: GenericPiece) {
  const player = useGameStore((state) => state.player);
  return (
    <div className={twMerge("size-full absolute bg-contain z-20", player === Colors.BLACK && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteKnightAsset /> : <BlackKnightAsset />}
    </div>
  );
}

export default KnightPiece;
