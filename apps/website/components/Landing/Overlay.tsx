import React from 'react';

import { a, SpringValue } from '@react-spring/web';

interface Props {
  fill: SpringValue<string>;
}

export const Overlay: React.FC<Props> = ({ fill }) => {
  return (
    <div className="relative order-2 h-[50vh] mb-[-20rem] md:mb-0 md:h-full md:order-1 flex-1 pointer-none">
      <a.svg viewBox="0 0 583 720" fill={fill} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <text fill="#566fa1" style={{ whiteSpace: 'pre', fontWeight: '800', fontSize: 52 }} letterSpacing="0em">
          <tspan x={15} y={257.909}>
            {'Vectis Accounts \u2014'}
          </tspan>
        </text>
        <text style={{ whiteSpace: 'pre', fontWeight: '800', fontSize: 46 }} letterSpacing="0em">
          <tspan x={15} y={321.909}>
            An interchain wallet
          </tspan>
          <tspan x={15} y={372.909}>
            solution with enhanced
          </tspan>
          <tspan x={15} y={423.909}>
            features for mass adoption
          </tspan>
        </text>
      </a.svg>
    </div>
  );
}
