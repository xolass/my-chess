import React from 'react';
import { WhiteRookAsset } from '@/assets/whiteRook';
import { BlackRookAsset } from '@/assets/blackRook';
import { GenericPiece } from '@/types';

function RookPiece({ color }: GenericPiece) {

  if (color === 'w') {
    return (
      <WhiteRookAsset size={45} />
    );
  }

  return (
    <BlackRookAsset size={45} />
  )
}

export default RookPiece;