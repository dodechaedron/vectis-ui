import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import { ModalProvider, TranslationsProvider, VectisProvider } from '~/providers';

import Layout from '~/components/Layout';

import type { AppProps } from 'next/app';

import 'react-tooltip/dist/react-tooltip.css';
import 'styles/globals.css';

function VectisApp({ Component, pageProps }: AppProps) {
  if (Component.displayName === 'LandingPage') {
    return (
      <>
        <Head>
          <title>Vectis</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>

      <TranslationsProvider>
        <ModalProvider>
          <VectisProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toaster position="bottom-center" reverseOrder={false} />
          </VectisProvider>
        </ModalProvider>
      </TranslationsProvider>
    </>
  );
}

export default VectisApp;
