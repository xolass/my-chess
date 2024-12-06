import { Colors, GenericPiece } from "@/types";

import { useGameStore } from "@/stores/GameContext";

import { BlackBishopAsset } from "assets/blackBishop";
import { WhiteBishopAsset } from "assets/whiteBishop";
import { twMerge } from "tailwind-merge";

function BishopPiece({ color }: GenericPiece) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayerVision);
  return (
    <div className={twMerge("size-full absolute bg-contain ", isBlackPlayer && "rotate-180")}>
      {color === Colors.WHITE ? <WhiteBishopAsset /> : <BlackBishopAsset />}
    </div>
  );
}

export default BishopPiece;
