import { Colors, GenericPiece } from "@/types";
import { BlackKnightAsset } from "assets/blackKnight";
import { WhiteKnightAsset } from "assets/whiteKnight";

function KnightPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteKnightAsset />;
  }

  return <BlackKnightAsset />;
}

export default KnightPiece;
