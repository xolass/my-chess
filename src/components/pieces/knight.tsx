import { Colors, GenericPiece } from "@/types";
import { BlackKnightAsset } from "assets/blackKnight";
import { WhiteKnightAsset } from "assets/whiteKnight";

function KnightPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteKnightAsset size={45} />;
  }

  return <BlackKnightAsset size={45} />;
}

export default KnightPiece;
