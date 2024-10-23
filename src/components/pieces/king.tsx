import { Colors, GenericPiece } from "@/types";
import { BlackKingAsset } from "assets/blackKing";
import { WhiteKingAsset } from "assets/whiteKing";

function KingPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteKingAsset />;
  }

  return <BlackKingAsset />;
}

export default KingPiece;
