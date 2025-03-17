import { Colors, GenericPiece } from "../../shared/types";

import { BlackQueenAsset } from "assets/blackQueen";
import { WhiteQueenAsset } from "assets/whiteQueen";
import { twMerge } from "tailwind-merge";

function QueenPiece({ color }: GenericPiece) {
  return (
    <div className={twMerge("size-full absolute bg-contain z-20 ")}>
      {color === Colors.WHITE ? <WhiteQueenAsset /> : <BlackQueenAsset />}
    </div>
  );
}

export default QueenPiece;
