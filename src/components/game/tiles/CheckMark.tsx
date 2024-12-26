import React from 'react';

interface CheckMarkProps {
  color: string;
}

export const CheckMark: React.FC<CheckMarkProps> = ({ color }) => (
  <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.5812 21.9694C34.1708 22.3615 34.331 23.1573 33.9391 23.7471L27.4924 33.4461C27.0076 34.1756 25.978 34.2821 25.3541 33.6674L21.7158 30.0829C21.2114 29.586 21.2053 28.7741 21.7022 28.2697C22.1991 27.7652 23.0108 27.7591 23.5152 28.256L26.1426 30.8447L31.8038 22.3274C32.1958 21.7377 32.9915 21.5774 33.5812 21.9694Z"
      fill="black"
      className="transition-colors duration-200"
    />
  </svg>
);