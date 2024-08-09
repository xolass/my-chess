import { BlackKingAsset } from '@/assets/blackKing';
import { WhiteKingAsset } from '@/assets/whiteKing';
import { GenericPiece } from '@/types';
import React from 'react';

function KingPiece({ color }: GenericPiece) {

  if (color === 'w') {
    return (
      <WhiteKingAsset size={45} />
    );
  }

  return (
    <BlackKingAsset size={45} />
  )
}

export default KingPiece;