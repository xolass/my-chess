import { BlackPawnAsset } from "assets/blackPawn";
import { WhitePawnAsset } from "assets/whitePawn";
import { Colors, GenericPiece } from "../../types";

function PawnPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhitePawnAsset size={45} />;
  }

  return <BlackPawnAsset size={45} />;
}

export default PawnPiece;
