import { useGameStore } from "@/stores/GameContext";
import { BlackPawnAsset } from "assets/blackPawn";
import { WhitePawnAsset } from "assets/whitePawn";
import { twMerge } from "tailwind-merge";
import { Colors, GenericPiece } from "../../types";

function PawnPiece({ color }: GenericPiece) {
  const isBlackPlayer = useGameStore((state) => state.isBlackPlayerVision);
  return (
    <div className={twMerge("size-full absolute bg-contain", isBlackPlayer && "rotate-180")}>
      {color === Colors.WHITE ? <WhitePawnAsset /> : <BlackPawnAsset />}
    </div>
  );
}

export default PawnPiece;
