import React from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { RxLink2 } from "react-icons/rx";
import { IoPersonSharp, IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { IntlAddress, IntlAddressCustom } from "../../../utils/intl";
import { ProgressBar } from "../../../components/ProgressBar";
import clsx from "clsx";
import VoteInfo from "../../../components/VoteInfo";

const test = async (proposalId: string) => {
  const { proposal } = {} as any;

  const { threshold, quorum } = (
    proposal.threshold as unknown as { threshold_quorum: { quorum: { percent: string }; threshold: { percent: string } } }
  ).threshold_quorum;

  const yesVotes = Number(proposal.votes.yes);
  const noVotes = Number(proposal.votes.no);
  const abstainVotes = Number(proposal.votes.abstain);
  const turnoutTotal = yesVotes + noVotes + abstainVotes;
  const totalVotingPower = Number(proposal.total_power);

  const turnoutPercent = (turnoutTotal / totalVotingPower) * 100;
  const turnoutYesPercent = turnoutTotal ? (yesVotes / turnoutTotal) * 100 : 0;
  const turnoutNoPercent = turnoutTotal ? (noVotes / turnoutTotal) * 100 : 0;
  const turnoutAbstainPercent = turnoutTotal ? (abstainVotes / turnoutTotal) * 100 : 0;

  const totalYesPercent = (yesVotes / totalVotingPower) * 100;
  const totalNoPercent = (noVotes / totalVotingPower) * 100;
  const totalAbstainPercent = (abstainVotes / totalVotingPower) * 100;

  const quorumReached = turnoutPercent >= Number(quorum.percent);
  const tresholdReached = yesVotes >= (totalVotingPower * (Number(threshold.percent) * 100)) / 100;
  return {
    proposal,
    quorumReached,
    tresholdReached,
    threshold,
    quorum,
    totalYesPercent,
    totalNoPercent,
    totalAbstainPercent,
    turnoutPercent,
  };
};

export default function PageProposal() {
  const { proposal, quorumReached, threshold, quorum, totalYesPercent, totalNoPercent, totalAbstainPercent, turnoutPercent, tresholdReached } =
    {} as any;
  const id = "1";

  /* export interface Proposal {
  allow_revoting: boolean;
  deposit_info?: CheckedDepositInfo | null;
  description: string;
  expiration: Expiration;
  min_voting_period?: Expiration | null;
  msgs: CosmosMsgForEmpty[];
  proposer: Addr;
  start_height: number;
  status: "open" | "rejected" | "passed" | "executed" | "closed";
  threshold: Threshold;
  title: string;
  total_power: Uint128;
  votes: Votes;
  [k: string]: unknown;
} */

  const progressVotes = [
    {
      thickness: 5,
      backgroundColor: "bg-zinc-300",
      arrowColor: "text-zinc-300",
      data: [
        {
          value: totalYesPercent,
          color: "bg-teal-500",
        },
        {
          value: totalNoPercent,
          color: "bg-rose-500",
        },
        {
          value: totalAbstainPercent,
          color: "bg-zinc-200",
        },
      ],
    },
  ];

  const progressQuorum = [
    {
      thickness: 5,
      backgroundColor: "bg-zinc-300",
      arrowColor: "text-zinc-300",
      data: [
        {
          value: turnoutPercent,
          color: "bg-zinc-200",
        },
      ],
    },
  ];

  const messages = proposal?.msgs?.map((msg: any, i: number) => {
    return <div key={`proposal-msg-${i}`}></div>;
  });

  return null;

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-xl font-bold">{proposal.title}</h1>
        <h2 className="text-3xl">Proposal:</h2>
        <div>{proposal.description}</div>
        <p className="text-xs text-zinc-300">Messages:</p>
        <div>{messages}</div>
      </div>
      <div className="flex min-w-[21rem] flex-col gap-4">
        <VoteInfo proposalId={id} />
        <div>
          <h2 className="mb-2 text-lg font-medium">Proposal Details</h2>
          <div className="space-y-2 rounded-lg bg-zinc-700/30 p-4 text-sm">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <AiOutlineFieldNumber className="h-5 w-5 text-zinc-100" />
                {id}
              </div>
              <div
                className={clsx(
                  "font-bold uppercase",
                  proposal.status.includes("open") && "text-sky-500",
                  proposal.status.includes("rejected") && "text-rose-500",
                  proposal.status.includes("passed") && "text-emerald-500",
                  proposal.status.includes("executed") && "text-indigo-500",
                  proposal.status.includes("closed") && "text-amber-500"
                )}
              >
                {proposal.status}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-zinc-300">Proposer</p>
              <a href={proposal.proposer} target="_blank" className="hover:text-emerald-600" rel="noreferrer">
                {IntlAddressCustom(proposal.proposer, 10)}
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-medium">Results</h2>
          <div className="flex flex-col gap-2 rounded-lg bg-zinc-700/30 p-4">
            <div className="flex items-center justify-between text-xs">
              <p className="text-teal-500">Yes {totalYesPercent}%</p>
              <p className="text-rose-500">No {totalNoPercent}%</p>
              <p className="text-zinc-200">Abstain {totalAbstainPercent}%</p>
            </div>
            <ProgressBar rows={progressVotes} caretPosition={Number(threshold.percent) * 100} />
            <div className="flex w-full justify-between rounded-md bg-zinc-300/10 px-3 py-2 text-xs">
              <p>
                Passing threshold: <span className="uppercase">{Number(threshold.percent) * 100}%</span>
              </p>
              <div className={clsx("flex items-center justify-center gap-1", tresholdReached ? "text-emerald-600" : "text-rose-600")}>
                {tresholdReached ? <IoCheckmarkSharp className="h-4 w-4 text-emerald-600" /> : <IoClose className="h-4 w-4 text-rose-600" />}
                <p className="text-xs text-zinc-300">{tresholdReached ? "Passing" : "Failing"}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs">
              <p>Turnout</p>
              <p>{turnoutPercent}%</p>
            </div>
            <ProgressBar rows={progressQuorum} caretPosition={Number(quorum.percent) * 100} />
            <div className="flex w-full justify-between rounded-md bg-zinc-300/10 px-3 py-2 text-xs">
              <p>
                Quorum: <span className="uppercase">{Number(quorum.percent) * 100} %</span>
              </p>
              <div className={clsx("flex items-center justify-center gap-1", quorumReached ? "text-emerald-600" : "text-rose-600")}>
                {quorumReached ? <IoCheckmarkSharp className="h-4 w-4 text-emerald-600" /> : <IoClose className="h-4 w-4 text-rose-600" />}
                <p className="text-xs text-zinc-300">{quorumReached ? "Reached" : "Unreached"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
