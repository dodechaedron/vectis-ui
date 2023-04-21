import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';

import { ModalProvider, TranslationsProvider, VectisProvider } from '~/providers';

import Layout from '~/components/Layout';

import type { AppProps } from 'next/app';

import 'react-tooltip/dist/react-tooltip.css';
import 'styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

function VectisApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>

      <TranslationsProvider>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <VectisProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Toaster position="bottom-center" reverseOrder={false} />
            </VectisProvider>
          </ModalProvider>
        </QueryClientProvider>
      </TranslationsProvider>
    </>
  );
}

export default VectisApp;
