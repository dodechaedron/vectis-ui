import { useQuery } from 'react-query';
import Head from 'next/head';

import { useVectis } from '~/providers';

import PluginCard from '~/components/PluginCard';

import type { NextPage } from 'next';

const Plugins: NextPage = () => {
  const { queryClient } = useVectis();

  const { data: plugins } = useQuery(['plugins', queryClient], () => queryClient.getPluginsFromRegistry());

  return (
    <>
      <Head>
        <title>Vectis | Guardian</title>
      </Head>

      <div className="flex flex-1 flex-col gap-4 p-4 px-16">
        <h1 className="text-2xl font-bold">Plugins ({plugins?.total})</h1>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {plugins?.plugins.map((p) => (
            <PluginCard plugin={p} key={p.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Plugins;
