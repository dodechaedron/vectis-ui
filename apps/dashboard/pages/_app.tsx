import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import AppProvider from '~/providers/AppProvider';

import Layout from '~/components/Layout';
import Spinner from '~/components/Spinner';

import type { AppProps } from 'next/app';

import 'react-tooltip/dist/react-tooltip.css';
import 'styles/globals.css';

function VectisApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>
      <Suspense fallback={<Spinner size="md" wrapper />}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="bottom-center" reverseOrder={false} />
        </AppProvider>
      </Suspense>
    </>
  );
}

export default VectisApp;
