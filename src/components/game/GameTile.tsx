import React from 'react';
import { DefaultTile } from './tiles/DefaultTile';
import { HamletIcon } from './tiles/HamletIcon';
import { getRandomTileColor } from '../../utils/colors';

interface GameTileProps {
  revealed: boolean;
  isHamlet: boolean;
  onClick: () => void;
  disabled: boolean;
  gameOver: boolean;
}

export const GameTile: React.FC<GameTileProps> = ({
  revealed,
  isHamlet,
  onClick,
  disabled,
  gameOver
}) => {
  const [tileColor] = React.useState(getRandomTileColor);

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
      {revealed ? (
        <div className="absolute inset-0">
          {isHamlet ? (
            <HamletIcon />
          ) : (
            <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M44.0006 28.7263C44.0006 26.3045 42.5969 24.2106 40.5588 23.214C40.9696 22.4277 41.2018 21.5333 41.2018 20.5847C41.2018 17.4443 38.6564 14.8984 35.5165 14.8984C34.7071 14.8984 33.9373 15.0676 33.2403 15.3725C32.3542 13.3852 30.3615 12 28.0454 12C25.6969 12 23.6811 13.4241 22.814 15.4561C22.07 15.0987 21.2362 14.8984 20.3556 14.8984C17.2157 14.8984 14.6703 17.4443 14.6703 20.5847C14.6703 21.5538 14.9127 22.4663 15.3401 23.2649C13.3572 24.2806 12 26.345 12 28.7263C12 30.9141 13.1455 32.8342 14.8693 33.9196C14.7407 34.3944 14.6721 34.8939 14.6721 35.4094C14.6721 38.5499 17.2176 41.0957 20.3575 41.0957C21.1635 41.0957 21.9303 40.928 22.6249 40.6255C23.5106 42.6139 25.5038 44 27.8208 44C30.1729 44 32.1914 42.5714 33.0562 40.5344C33.8022 40.8941 34.6387 41.0957 35.5223 41.0957C38.6622 41.0957 41.2076 38.5499 41.2076 35.4094C41.2076 34.917 41.145 34.4392 41.0274 33.9836C42.8089 32.9108 44.0006 30.9577 44.0006 28.7263Z"
                fill={tileColor}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.5812 21.9694C34.1708 22.3615 34.331 23.1573 33.9391 23.7471L27.4924 33.4461C27.0076 34.1756 25.978 34.2821 25.3541 33.6674L21.7158 30.0829C21.2114 29.586 21.2053 28.7741 21.7022 28.2697C22.1991 27.7652 23.0108 27.7591 23.5152 28.256L26.1426 30.8447L31.8038 22.3274C32.1958 21.7377 32.9915 21.5774 33.5812 21.9694Z"
                fill="black"
              />
            </svg>
          )}
        </div>
      ) : (
        <DefaultTile />
      )}
    </button>
  );
};