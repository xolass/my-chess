import { Colors, GenericPiece } from "@/shared/types";
import { BlackKingAsset } from "assets/blackKing";
import { WhiteKingAsset } from "assets/whiteKing";

import { twMerge } from "tailwind-merge";

function KingPiece({ color }: GenericPiece) {
  return (
    <div className={twMerge("size-full absolute bg-contain z-20 ")}>
      {color === Colors.WHITE ? <WhiteKingAsset /> : <BlackKingAsset />}
    </div>
  );
}

export default KingPiece;
