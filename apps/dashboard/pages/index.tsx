import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Head from 'next/head';

import { Anek_Latin } from '@next/font/google';
import { useSpring } from '@react-spring/core';
import { Canvas } from '@react-three/fiber';

import Button from '~/components/Buttons/Button';
import VectisLogo from '~/components/Icons/VectisLogo';
import Landing from '~/components/Landing/Landing';
import Stars from '~/components/Landing/Stars';

import type { NextPage } from 'next';

const font = Anek_Latin({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});

const LandingPage: NextPage = () => {
  const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, []);
  const [darkMode, setDarkMode] = useState(false);
  const { push: goToPage } = useRouter();

  const setDark = (t: any) => {
    set(t);
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <title>Vectis</title>
      </Head>
      <div className={clsx(font.className, 'absolute h-screen w-screen overflow-hidden cursor-round')}>
        <Canvas className="transparent" camera={{ position: [0, 0, 1] }}>
          <Stars color={darkMode ? background.toJSON() : '#303d5c'} />
        </Canvas>
      </div>
      <Landing background={background} fill={fill} setBg={setDark} />
      <div className="absolute top-0 left-0  h-fit w-full overflow-hidden p-4 cursor-round">
        <div className="flex items-center justify-between">
          <VectisLogo className={clsx('h-[24px] w-[100px]', darkMode ? 'fill-white' : 'fill-kashmir-blue-500')} />
          <Button onClick={() => goToPage('/dashboard')} variant={darkMode ? 'white' : 'primary'}>
            Launch App
          </Button>
        </div>
      </div>
    </>
  );
};

LandingPage.displayName = 'LandingPage';

export default LandingPage;
