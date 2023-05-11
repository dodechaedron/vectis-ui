import React from 'react';
import clsx from 'clsx';

import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { IntlTimeAgo } from '~/services/browser';
import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import { Button } from './Buttons';
import NotFound from './NotFound';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import { VectisAccount } from '~/interfaces';

interface Props {
  accountInfo: VectisAccount;
}

const GuardianProposals: React.FC<Props> = ({ accountInfo }) => {
  const { vectis, userAccounts, chainName, userAddr } = useVectis();
  const { toast, isLoading } = useToast();
  const queryClient = useQueryClient();

  const { data: openProposals } = useQuery(
    ['guardian_proposals', accountInfo.multisigAddress as string],
    () => vectis?.getProposals(accountInfo.multisigAddress as string),
    {
      select: (proposals) => proposals.filter((proposal) => ['open', 'passed'].includes(proposal.status)) || []
    }
  );

  const proposals = useQueries({
    queries:
      [...(openProposals || [])].map((proposal) => ({
        queryKey: ['guardian_vote_list', proposal.id],
        queryFn: () => vectis.getProposalVoteList(accountInfo.multisigAddress as string, proposal.id as number),
        select: (votes) => ({ votes, proposal, isAlreadyVoted: votes.some((vote) => userAccounts.includes(vote.voter)) })
      })) || []
  });

  const { mutateAsync: executeProposal } = useMutation({
    mutationFn: async (proposalId: number) =>
      await toast.promise(vectis.executeProposal(accountInfo.multisigAddress as string, proposalId), 3000),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['guardian_proposals'], type: 'all' });
      await queryClient.refetchQueries({ queryKey: ['accounts_by_guardians'], type: 'all' });
    }
  });

  const { mutateAsync: vote } = useMutation({
    mutationFn: async ({ proposalId, vote }: { proposalId: number; vote: 'yes' | 'no' }) =>
      await toast.promise(vectis.voteProposal(accountInfo.multisigAddress as string, proposalId, vote)),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['guardian_proposals'], type: 'all' });
      await queryClient.refetchQueries({ queryKey: ['guardian_vote_list'], type: 'all' });
    }
  });

  if (!proposals.length) {
    return (
      <div className="flex flex-col gap-4 bg-white">
        <NotFound icon={ArrowDownTrayIcon} text="No Proposals" />
      </div>
    );
  }

  return (
    <>
      {proposals?.map(({ data, isFetched }) => {
        if (!isFetched) return null;
        const { votes, proposal, isAlreadyVoted } = data as any;
        return (
          <div key={proposal.id} className="flex flex-col gap-4">
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
                  <span className="text-gray-500">{IntlTimeAgo(+new Date((proposal.expires as { at_time: number }).at_time / 1e6))}</span>
                </div>
                <p className="py-4 px-6 text-sm font-medium text-gray-900">
                  Status: <span className="mt-1 text-sm capitalize text-gray-500 sm:col-span-2 sm:mt-0">{proposal.status}</span>
                </p>
                <div className="grid grid-cols-3 gap-4 py-4 px-6">
                  <p className="text-sm font-medium text-gray-900">
                    Votes: <span className="col-span-1 mt-0 text-sm text-gray-500">{votes.length + ' of ' + accountInfo.threshold.weight}</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx('flex w-full gap-4', {
                'justify-end': !isAlreadyVoted,
                'justify-start': isAlreadyVoted
              })}
            >
              {votes.length === accountInfo.threshold.weight ? (
                <Button disabled={isLoading} onClick={() => executeProposal(proposal.id as number)}>
                  Execute Proposal
                </Button>
              ) : null}
              {!isAlreadyVoted ? (
                <>
                  <Button disabled={isLoading} onClick={() => vote({ proposalId: proposal.id, vote: 'no' })}>
                    Decline
                  </Button>
                  <Button disabled={isLoading} onClick={() => vote({ proposalId: proposal.id, vote: 'yes' })}>
                    Accept
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GuardianProposals;
