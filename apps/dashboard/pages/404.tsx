import Head from 'next/head';
import Link from 'next/link';

import { Button } from '~/components/Buttons';

import { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Page not found</title>
      </Head>
      <div className="flex h-[calc(100vh-72px)] w-full flex-1 items-center justify-center rounded-md bg-white pb-4 shadow-xl">
        <div className="flex flex-1 flex-col items-center">
          <h1 className="text-9xl font-bold text-kashmir-blue-500">404</h1>

          <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">The page you’re looking for doesn’t exist.</p>
          <Button>
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
