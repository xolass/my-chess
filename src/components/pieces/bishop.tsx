import { BlackBishopAsset } from "@/assets/blackBishop";
import { WhiteBishopAsset } from "@/assets/whiteBishop";
import { Colors, GenericPiece } from "@/types";

function BishopPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteBishopAsset size={45} />;
  }

  return <BlackBishopAsset size={45} />;
}

export default BishopPiece;
