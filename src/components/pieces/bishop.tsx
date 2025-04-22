import { Colors, GenericPiece } from "@/shared/types";

import { BlackBishopAsset } from "assets/blackBishop";
import { WhiteBishopAsset } from "assets/whiteBishop";
import { twMerge } from "tailwind-merge";

function BishopPiece({ color, className }: GenericPiece) {
  return (
    <div className={twMerge("size-full absolute bg-contain z-20", className)}>
      {color === Colors.WHITE ? <WhiteBishopAsset /> : <BlackBishopAsset />}
    </div>
  );
}

export default BishopPiece;
