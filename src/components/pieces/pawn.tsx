import React from 'react';
import { GenericPiece } from '../../types';
import { WhitePawnAsset } from '@/assets/whitePawn';
import { BlackPawnAsset } from '@/assets/blackPawn';

function PawnPiece({ color }: GenericPiece) {
  if (color === 'w') {
    return (
      <WhitePawnAsset size={45} />
    );
  }

  return (
    <BlackPawnAsset size={45} />
  )
}

export default PawnPiece;