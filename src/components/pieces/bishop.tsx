import { Colors, GenericPiece } from "@/types";
import { BlackBishopAsset } from "assets/blackBishop";
import { WhiteBishopAsset } from "assets/whiteBishop";

function BishopPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteBishopAsset size={45} />;
  }

  return <BlackBishopAsset size={45} />;
}

export default BishopPiece;
