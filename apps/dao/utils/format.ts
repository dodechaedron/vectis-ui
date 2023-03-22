import { Duration } from "@vectis/types/Cw20Stake.types";
import { Threshold } from "@vectis/types/DaoProposalSingle.types";

export const formatTime = (time: number) => {
  if (time < 3600) {
    const parsedTime = time / 60;
    const plural = parsedTime > 1 ? "s" : "";
    return `${parsedTime} Minute` + plural;
  }

  if (time < 86400) {
    const parsedTime = time / 3600;
    const plural = parsedTime > 1 ? "s" : "";
    return `${parsedTime} Hour` + plural;
  }

  const parsedTime = time / (3600 * 24);
  const plural = parsedTime > 1 ? "s" : "";
  return `${parsedTime} Day` + plural;
};

export const formatDuration = (d?: Duration | null): string => {
  if (!d) return "0";
  if ("height" in d) return `${d.height} blocks`;

  return `${formatTime(d.time)}`;
};

export const formatThreshold = (t: Threshold) => {
  if ("threshold_quorum" in t) {
    const quorum = "percent" in t.threshold_quorum.quorum ? `${parseFloat(t.threshold_quorum.quorum.percent) * 100}%` : "Majority";
    const threshold = "percent" in t.threshold_quorum.threshold ? `${parseFloat(t.threshold_quorum.threshold.percent) * 100}%` : "Majority";
    return { quorum, threshold };
  }

  return { quorum: "Majority", threshold: "Majority" };
};
