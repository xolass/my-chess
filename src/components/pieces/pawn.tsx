import { BlackPawnAsset } from "assets/blackPawn";
import { WhitePawnAsset } from "assets/whitePawn";
import { Colors, GenericPiece } from "../../types";

function PawnPiece({ color }: GenericPiece) {
  if (color === Colors.WHITE) {
    return <WhitePawnAsset />;
  }

  return <BlackPawnAsset />;
}

export default PawnPiece;
