import { Colors, GenericPiece } from "@/shared/types";

import { useGameStore } from "@/stores/GameContext";

import { BlackRookAsset } from "assets/blackRook";
import { WhiteRookAsset } from "assets/whiteRook";
import { twMerge } from "tailwind-merge";
function RookPiece({ color }: GenericPiece) {
  const player = useGameStore((state) => state.player);
  return (
    <div className={twMerge("size-full absolute bg-contain z-20 ", player === Colors.BLACK && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteRookAsset /> : <BlackRookAsset />}
    </div>
  );
}

export default RookPiece;
