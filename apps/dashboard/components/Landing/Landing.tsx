import React, { useState } from 'react';
import clsx from 'clsx';

import { a } from '@react-spring/web';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Button } from '../Buttons';
import VectisLogo from '../Icons/VectisLogo';

import Overlay from './Overlay';
import Scene from './Scene';

const Landing = ({ background, fill, setBg }) => {
  const [cursor, setCursor] = useState('cursor-round');

  return (
    <>
      <div className="absolute top-0 left-0  h-fit w-full overflow-hidden p-4">
        <div className="flex items-center justify-between">
          <VectisLogo className="h-[24px] w-[100px]" fill={background} />
          <Button variant="white">Launch App</Button>
        </div>
      </div>
      <a.main className={clsx('h-screen w-screen flex flex-col md:flex-row', cursor)} style={{ background }}>
        <Overlay fill={fill} />
        <Canvas className="order-2 h-[70vh] sm:h-full flex-1" dpr={[1, 2]}>
          <Scene setBg={setBg} setCursor={setCursor} />
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        </Canvas>
      </a.main>
    </>
  );
};

export default Landing;
