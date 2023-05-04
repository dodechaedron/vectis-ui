import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Head from 'next/head';

import { IntlTimeAgo } from '~/services/browser';
import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import Address from '~/components/Address';
import { Button } from '~/components/Buttons';
import { Input } from '~/components/Inputs';
import NotFound from '~/components/NotFound';
import Spinner from '~/components/Spinner';

import { ArrowDownTrayIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

import type { NextPage } from 'next';
import { VectisAccount } from '~/interfaces';
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1';
import { VoteInfo } from '@dao-dao/types/contracts/DaoProposalSingle.common';

const GuardianPage: NextPage = () => {
  const { queryClient, signingClient, userAddr, chainName } = useVectis();
  const { query, push: goToPage } = useRouter();
  const { toast, isLoading } = useToast();
  const [accountInfo, setAccountInfo] = useState<VectisAccount | null>(null);

  const [controllerAddr, setControllerAddr] = useState<string>('');
  const [proposals, setProposals] = useState<{ votes: VoteInfo[]; proposal: Proposal; isAlreadyVoted: boolean }[]>([]);

  const fetchGuardian = async () => {
    const account = await queryClient.getAccountInfo(query.address as string, chainName);

    if (!account.guardians.includes(userAddr)) {
      goToPage('/');
      return;
    }

    if (account.multisigAddress) {
      await fetchProposals(account.multisigAddress);
    }

    setControllerAddr(account.controllerAddr);
    setAccountInfo(account);
  };

  const fetchProposals = async (address: string) => {
    const proposals = await signingClient.getProposals(address);
    const openProposals = proposals.filter((proposal) => ['open', 'passed'].includes(proposal.status));
    if (proposals.length) {
      const proposalsInfo = await Promise.all(
        openProposals.map(async (proposal) => {
          const votes = await signingClient.getProposalVoteList(address, proposal.id as number);
          return { votes, proposal, isAlreadyVoted: votes.some((vote) => vote.voter === userAddr) };
        })
      );
      setProposals(proposalsInfo);
    }
  };

  useEffect(() => {
    if (!query.address) return;
    fetchGuardian();
  }, [query, userAddr]);

  const rotate = async () => {
    if (!accountInfo) return;
    if (accountInfo.multisigAddress) {
      const promise = signingClient.proxyProposeRotateOperation(accountInfo.address, accountInfo.multisigAddress, accountInfo.controllerAddr);
      await toast.promise(promise, 3000);
      await fetchGuardian();
    } else {
      const promise = signingClient.updateControllerAddr(accountInfo.address, accountInfo.controllerAddr);
      await toast.promise(promise, 3000);
      await fetchGuardian();
    }
  };

  const freeze = async () => {
    if (!accountInfo) return;
    if (accountInfo.multisigAddress) {
      const promise = signingClient.proxyProposeFreezeOperation(accountInfo.address, accountInfo.multisigAddress, accountInfo.frozen);
      await toast.promise(promise);
      await fetchGuardian();
    } else {
      const promise = signingClient.updateFreezeStatus(accountInfo.address);
      await toast.promise(promise);
      await fetchGuardian();
    }
  };

  const vote = async (proposalId: number, vote: 'yes' | 'no') => {
    if (!accountInfo?.multisigAddress) return;
    const promise = signingClient.voteProposal(accountInfo.multisigAddress, proposalId, vote);
    await toast.promise(promise);
    await fetchProposals(accountInfo.multisigAddress);
  };

  const executeProposal = async (proposalId: number) => {
    if (!accountInfo?.multisigAddress) return;
    const promise = signingClient.executeProposal(accountInfo.multisigAddress, proposalId);
    await toast.promise(promise, 5000);
    await fetchGuardian();
  };

  return (
    <>
      <Head>
        <title>Vectis | Guardian</title>
      </Head>

      {accountInfo ? (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))]">
          <div className="flex max-h-[22rem] flex-col rounded-md bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Smart Account</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Useful information for guardianship</p>
            </div>
            <div className="divide-y divide-gray-200">
              <p className="py-4 px-6 text-sm font-medium text-gray-900">
                Account Name: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{accountInfo.label}</span>
              </p>
              <div className="py-4 px-6 text-sm font-medium text-gray-900">
                Account Address: <Address className="text-gray-500" address={accountInfo.address} />
              </div>
              <p className="py-4 px-6 text-sm font-medium text-gray-900">
                Status: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{accountInfo.frozen ? 'Frozen' : 'Active'}</span>
              </p>
              <div className="grid grid-cols-3 gap-4 py-4 px-6">
                <p className="text-sm font-medium text-gray-900">
                  Multisig: <span className="col-span-1 mt-0 text-sm text-gray-500">{accountInfo.multisigAddress ? 'Yes' : 'No'}</span>
                </p>
                {accountInfo.threshold.weight ? (
                  <p className="text-sm font-medium text-gray-900">
                    Threshold:{' '}
                    <span className="col-span-1 mt-0 text-sm text-gray-500">
                      {accountInfo.threshold.weight} of {accountInfo.threshold.totalWeight}
                    </span>
                  </p>
                ) : null}
                {accountInfo.multisigAddress ? (
                  <div className="text-sm font-medium text-gray-900">
                    Multisig Address: <Address className="text-gray-500" address={accountInfo.multisigAddress} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex max-h-[22rem] flex-col rounded-md bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Guardian Actions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Execute guardianship actions over this account</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="flex flex-col gap-2 p-4">
                <h4 className="flex items-center gap-2 text-lg font-semibold">
                  Rotate Controller Address
                  <span>
                    <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
                  </span>
                </h4>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Input container="flex-1 h-10" value={controllerAddr} onChange={(e) => setControllerAddr(e.target.value)} />
                  <Button disabled={isLoading} className="flex-2 h-10 w-full py-1 sm:w-40" onClick={rotate}>
                    {accountInfo.multisigAddress ? 'Propose Rotation' : 'Rotate'}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between gap-2 p-4">
                <h4 className="flex items-center gap-2 text-lg font-semibold">
                  {accountInfo.frozen ? 'Unfreeze' : 'Freeze'} Account
                  <span>
                    <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
                  </span>
                </h4>
                <Button disabled={isLoading} className="h-10 w-40 py-2" onClick={freeze}>
                  {accountInfo.multisigAddress ? 'Propose ' : ''}
                  {accountInfo.frozen ? 'Unfreeze' : 'Freeze'}
                </Button>
              </div>
            </div>
          </div>
          {accountInfo.multisigAddress ? (
            <div className="flex flex-col gap-4">
              {proposals.length ? (
                proposals.map(({ votes, proposal, isAlreadyVoted }) => {
                  if (!accountInfo.threshold.weight) return null;
                  return (
                    <>
                      <div key={proposal.id as number} className="flex h-fit flex-col rounded-md bg-white shadow-sm">
                        <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
                          <h3 className="text-lg font-medium leading-6 text-gray-900 ">Active Proposal</h3>
                          <span className="mt-1 max-w-2xl text-sm text-gray-500">{proposal.title}</span>
                        </div>

                        <div className="divide-y divide-gray-200">
                          <p className="py-4 px-6 text-sm font-medium text-gray-900">
                            Proposal Id: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{proposal.id as number}</span>
                          </p>
                          <div className="py-4 px-6 text-sm font-medium text-gray-900">
                            Expires At:{' '}
                            <span className="text-gray-500">
                              {IntlTimeAgo(+new Date((proposal.expires as { at_time: number }).at_time / 1e6))}
                            </span>
                          </div>
                          <p className="py-4 px-6 text-sm font-medium text-gray-900">
                            Status: <span className="mt-1 text-sm capitalize text-gray-500 sm:col-span-2 sm:mt-0">{proposal.status}</span>
                          </p>
                          <div className="grid grid-cols-3 gap-4 py-4 px-6">
                            <p className="text-sm font-medium text-gray-900">
                              Votes:{' '}
                              <span className="col-span-1 mt-0 text-sm text-gray-500">
                                {votes.length + ' of ' + accountInfo.threshold.weight}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={clsx('flex', {
                          'justify-between': !isAlreadyVoted,
                          'justify-end': isAlreadyVoted
                        })}
                      >
                        {votes.length === accountInfo.threshold.weight ? (
                          <Button disabled={isLoading} onClick={() => executeProposal(proposal.id as number)}>
                            Execute Proposal
                          </Button>
                        ) : null}
                        {!isAlreadyVoted ? (
                          <>
                            <Button disabled={isLoading} onClick={() => vote(proposal.id as number, 'no')}>
                              Decline
                            </Button>
                            <Button disabled={isLoading} onClick={() => vote(proposal.id as number, 'yes')}>
                              Accept
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </>
                  );
                })
              ) : (
                <NotFound icon={ArrowDownTrayIcon} text="No Proposals" />
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <Spinner size="md" wrapper />
      )}
    </>
  );
};

export default GuardianPage;
