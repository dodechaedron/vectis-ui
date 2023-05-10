import React from 'react';
import { useQuery } from 'react-query';

import { useApp } from '~/providers';
import { useToast } from '~/hooks';

import { Button } from './Buttons';
import Spinner from './Spinner';

import { Plugin } from '@vectis/types/PluginRegistry.types';

interface Props {
  plugin: Plugin;
}

const PluginCard: React.FC<Props> = ({ plugin }) => {
  const { account, vectis } = useApp();
  const { toast } = useToast();
  const { data, isLoading, refetch } = useQuery(['user_plugins', account], () => vectis.getPlugins(account.address));

  const instantiatePlugin = async () => {
    await toast.promise(
      (async () => {
        await vectis.instantiateIdentityPlugin(account.address);
        await refetch();
      })()
    );
  };

  return (
    <div className="flex justify-between gap-4 rounded-xl bg-white p-2">
      <div className="flex gap-4">
        <img
          className="h-16 w-16 rounded-lg"
          src="https://media.discordapp.net/attachments/774316885792522303/1103570507913252884/Kyaris_logo_self_sovereing_identity_footprint_ui_c09cbdeb-9053-448c-b721-9a0a52731c3a.png?width=686&height=686"
        />
        <div className="flex flex-col justify-center">
          <p>{plugin.name}</p>
          <p>{plugin.latest_version}</p>
        </div>
      </div>
      <div className="flex items-center">
        {isLoading ? <Spinner /> : null}
        {isLoading ? null : (
          <Button variant="secondary" className="h-10" disabled={!!data?.query_plugins.length} onClick={instantiatePlugin}>
            {data?.query_plugins.length ? 'Installed' : 'Install Plugin'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PluginCard;
