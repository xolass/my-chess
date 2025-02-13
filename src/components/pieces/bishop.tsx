import { Colors, GenericPiece } from "@/shared/types";

import { useGameStore } from "@/stores/GameContext";

import { BlackBishopAsset } from "assets/blackBishop";
import { WhiteBishopAsset } from "assets/whiteBishop";
import { twMerge } from "tailwind-merge";

function BishopPiece({ color }: GenericPiece) {
  const player = useGameStore((state) => state.player);
  return (
    <div className={twMerge("size-full absolute bg-contain ", player === Colors.BLACK && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteBishopAsset /> : <BlackBishopAsset />}
    </div>
  );
}

export default BishopPiece;
