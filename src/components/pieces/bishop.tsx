import { Colors, GenericPiece } from "@/types";
import { BlackBishopAsset } from "assets/blackBishop";
import { WhiteBishopAsset } from "assets/whiteBishop";

function BishopPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteBishopAsset />;
  }

  return <BlackBishopAsset />;
}

export default BishopPiece;
