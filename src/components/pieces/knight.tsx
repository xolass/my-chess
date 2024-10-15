import { BlackKnightAsset } from "@/assets/blackKnight";
import { WhiteKnightAsset } from "@/assets/whiteKnight";
import { Colors, GenericPiece } from "@/types";

function KnightPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteKnightAsset size={45} />;
  }

  return <BlackKnightAsset size={45} />;
}

export default KnightPiece;
