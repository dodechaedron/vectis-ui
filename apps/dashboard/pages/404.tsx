import Head from "next/head";
import Link from "next/link";

import { Button } from "~/components/Buttons";

import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Page not found</title>
      </Head>
      <div className="flex flex-1 h-full w-full items-center justify-center bg-white rounded-md shadow-xl pb-4">
        <div className="flex flex-1 flex-col items-center">
          <h1 className="font-bold text-kashmir-blue-500 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">The page you’re looking for doesn’t exist.</p>
          <Button>
            <Link href="/accounts">Accounts Page</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
