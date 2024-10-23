import { Colors, GenericPiece } from "@/types";
import { BlackRookAsset } from "assets/blackRook";
import { WhiteRookAsset } from "assets/whiteRook";

function RookPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteRookAsset />;
  }

  return <BlackRookAsset />;
}

export default RookPiece;
