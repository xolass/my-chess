import { BlackPawnAsset } from "assets/blackPawn";
import { WhitePawnAsset } from "assets/whitePawn";
import { twMerge } from "tailwind-merge";
import { Colors, GenericPiece } from "../../shared/types";

function PawnPiece({ color }: GenericPiece) {
  return (
    <div className={twMerge("size-full absolute bg-contain z-20")}>
      {color === Colors.WHITE ? <WhitePawnAsset /> : <BlackPawnAsset />}
    </div>
  );
}

export default PawnPiece;
