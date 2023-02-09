import Head from "next/head";

import Dashboard from "~/components/Dashboard";

import type { NextPage } from "next";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Dashboard</title>
      </Head>
      <div className="flex flex-1 flex-col gap-4 h-full">
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
