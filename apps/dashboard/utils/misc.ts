import { Proposal, Vote, VoteInfo } from "@dao-dao/types/contracts/cw-proposal-single/CwProposalSingleContract";

type AggregatedVoteInfo = {
  proposal_id: number;
  voters: string[];
  vote: Vote;
  weight: number;
};

export function groupVoteListByVote(proposal: Proposal, voteList: VoteInfo[], vote: Vote) {
  return voteList
    .filter((v) => v.vote === vote)
    .reduce<AggregatedVoteInfo>(
      (acc, cur) => ({
        ...acc,
        voters: [...acc.voters, cur.voter],
        weight: acc.weight + (cur.weight as number),
      }),
      {
        proposal_id: proposal.id,
        voters: [],
        vote: vote,
        weight: 0,
      } as AggregatedVoteInfo
    );
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
