import React from 'react';
import williamCheckspeare from '../../assets/img/wc@2x.png';

export const WilliamCheckspeare: React.FC = () => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <img
          src={williamCheckspeare}
          alt="William Shakespeare with pixel sunglasses"
          className="w-full h-full object-contain"
          loading="eager"
          width={192}
          height={192}
        />
      </div>
    </div>
  );
};