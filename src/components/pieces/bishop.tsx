import { BlackBishopAsset } from '@/assets/blackBishop';
import { WhiteBishopAsset } from '@/assets/whiteBishop';
import { GenericPiece } from '@/types';
import React from 'react';

function BishopPiece({ color }: GenericPiece) {

  if (color === 'w') {
    return (
      <WhiteBishopAsset size={45} />
    );
  }

  return (
    <BlackBishopAsset size={45} />
  )
}

export default BishopPiece;