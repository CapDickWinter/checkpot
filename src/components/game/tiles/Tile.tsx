import React from 'react';
import { CloudShape } from './CloudShape';
import { CheckMark } from './CheckMark';
import { HamletIcon } from './HamletIcon';
import { TILE_DEFAULTS } from '../../../constants/colors';
import { getRandomTileColor } from '../../../utils/colors';

interface TileProps {
  revealed: boolean;
  isHamlet: boolean;
  onClick: () => void;
  disabled: boolean;
  gameOver: boolean;
}

export const Tile: React.FC<TileProps> = ({
  revealed,
  isHamlet,
  onClick,
  disabled,
  gameOver
}) => {
  const [tileColor] = React.useState(getRandomTileColor);
  const shouldReveal = revealed || (gameOver && isHamlet);
  const shouldShowHamlet = shouldReveal && isHamlet;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative aspect-square w-full transition-all duration-200
        bg-[#1A1A1A] hover:bg-[#242424]
        disabled:cursor-not-allowed
      `}
    >
      {shouldShowHamlet ? (
        <HamletIcon />
      ) : (
        <>
          <CloudShape color={revealed ? tileColor : TILE_DEFAULTS.CLOUD.DEFAULT} />
          <CheckMark color="black" />
        </>
      )}
    </button>
  );
};