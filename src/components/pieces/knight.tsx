import React from 'react';
import { WhiteKnightAsset } from '@/assets/whiteKnight';
import { BlackKnightAsset } from '@/assets/blackKnight';
import { GenericPiece } from '@/types';

function KnightPiece({ color }: GenericPiece) {
  if (color === 'w') {
    return (
      <WhiteKnightAsset size={45} />
    );
  }

  return (
    <BlackKnightAsset size={45} />
  )
}

export default KnightPiece;