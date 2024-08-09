import React from 'react';
import { GenericPiece } from '../../types';
import { WhiteQueenAsset } from '@/assets/whiteQueen';
import { BlackQueenAsset } from '@/assets/blackQueen';

function QueenPiece({ color }: GenericPiece) {

  if (color === 'w') {
    return (
      <WhiteQueenAsset size={45} />
    );
  }

  return (
    <BlackQueenAsset size={45} />
  )
}

export default QueenPiece;