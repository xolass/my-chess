import { BlackQueenAsset } from "assets/blackQueen";
import { WhiteQueenAsset } from "assets/whiteQueen";
import { Colors, GenericPiece } from "../../types";

function QueenPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhiteQueenAsset />;
  }

  return <BlackQueenAsset />;
}

export default QueenPiece;
