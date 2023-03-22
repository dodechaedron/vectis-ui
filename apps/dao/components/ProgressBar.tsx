import clsx from "clsx";
import { RiArrowDropUpFill } from "react-icons/ri";

export interface ProgressBarProps {
  rows: {
    backgroundColor?: string;

    thickness: number;
    data?: {
      value: number;
      color: string;
    }[];
  }[];
  arrowColor?: string;
  caretPosition?: number;
  alignEnd?: boolean;
}

export const ProgressBar = ({ rows, caretPosition, alignEnd, arrowColor }: ProgressBarProps) => (
  <div className="relative w-full">
    <div className={`flex w-full flex-col items-stretch overflow-hidden rounded-full`}>
      {rows.map(({ backgroundColor, data, thickness }, rowIndex) => (
        <div
          key={rowIndex}
          className={clsx("flex flex-row items-stretch", backgroundColor ? "bg-zinc-300" : backgroundColor, alignEnd && "justify-end")}
          style={{
            height: thickness,
          }}
        >
          {data?.map(({ value, color }, index) => (
            <div key={index} className={clsx("h-full", color)} style={{ width: `${value}%` }}></div>
          ))}
        </div>
      ))}
    </div>
    <RiArrowDropUpFill
      className={clsx("absolute bottom-[-1.1rem] z-10 !h-8 !w-8", !arrowColor ? "text-zinc-300" : "")}
      style={{
        left: `${caretPosition}%`,
      }}
    />
  </div>
);
