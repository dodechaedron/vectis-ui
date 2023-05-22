import { Suspense } from 'react';
import Head from 'next/head';

import Providers from '~/providers/Providers';

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
        <Providers>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Providers>
      </Suspense>
    </>
  );
}

export default VectisApp;
