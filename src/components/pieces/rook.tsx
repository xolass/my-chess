import { Colors, GenericPiece } from "@/shared/types";

import { BlackRookAsset } from "assets/blackRook";
import { WhiteRookAsset } from "assets/whiteRook";
import { twMerge } from "tailwind-merge";
function RookPiece({ color }: GenericPiece) {
  return (
    <div className={twMerge("size-full absolute bg-contain z-20 ")}>
      {color === Colors.WHITE ? <WhiteRookAsset /> : <BlackRookAsset />}
    </div>
  );
}

export default RookPiece;
