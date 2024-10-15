import { BlackQueenAsset } from "@/assets/blackQueen";
import { WhiteQueenAsset } from "@/assets/whiteQueen";
import { Colors, GenericPiece } from "../../types";

function QueenPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteQueenAsset size={45} />;
  }

  return <BlackQueenAsset size={45} />;
}

export default QueenPiece;
