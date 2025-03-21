import { Colors, GenericPiece } from "@/shared/types";
import { BlackKnightAsset } from "assets/blackKnight";
import { WhiteKnightAsset } from "assets/whiteKnight";

import { twMerge } from "tailwind-merge";

function KnightPiece({ color }: GenericPiece) {
  return (
    <div className={twMerge("size-full absolute bg-contain z-20")}>
      {color === Colors.WHITE ? <WhiteKnightAsset /> : <BlackKnightAsset />}
    </div>
  );
}

export default KnightPiece;
