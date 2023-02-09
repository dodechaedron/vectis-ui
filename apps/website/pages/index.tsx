import React from 'react';
import Head from 'next/head';

import Landing from 'components/Landing/Landing';

import type { NextPage } from 'next';

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis</title>
      </Head>
      <Landing />
    </>
  );
};

export default LandingPage;
