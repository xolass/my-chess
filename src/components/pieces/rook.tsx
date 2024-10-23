import { Colors, GenericPiece } from "@/types";
import { BlackRookAsset } from "assets/blackRook";
import { WhiteRookAsset } from "assets/whiteRook";

function RookPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteRookAsset size={45} />;
  }

  return <BlackRookAsset size={45} />;
}

export default RookPiece;
