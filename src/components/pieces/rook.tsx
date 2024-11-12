import { Colors, GenericPiece } from "@/types";

import { useGameStore } from "@/stores/GameContext";

import { BlackRookAsset } from "assets/blackRook";
import { WhiteRookAsset } from "assets/whiteRook";
import { twMerge } from "tailwind-merge";
function RookPiece({ color }: GenericPiece) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayer);
  return (
    <div className={twMerge("size-full absolute bg-contain bg-black-queen", isBlackPlayer && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteRookAsset /> : <BlackRookAsset />}
    </div>
  );
}

export default RookPiece;
