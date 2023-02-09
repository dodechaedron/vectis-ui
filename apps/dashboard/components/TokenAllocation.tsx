import React, { useEffect, useState } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  DoughnutControllerChartOptions,
  ElementChartOptions,
  Legend,
  Plugin,
  PluginChartOptions,
  ScaleChartOptions,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useVectis } from "~/providers";

import { _DeepPartialObject } from "chart.js/dist/types/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const chartOptions: _DeepPartialObject<
  CoreChartOptions<"doughnut"> &
    ElementChartOptions<"doughnut"> &
    PluginChartOptions<"doughnut"> &
    DatasetChartOptions<"doughnut"> &
    ScaleChartOptions<"doughnut"> &
    DoughnutControllerChartOptions
> = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    autoPadding: true,
    padding() {
      return {
        top: 0,
        right: 10,
        bottom: 0,
        left: 0,
      };
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "right" as const,
      fullSize: false,
    },
  },
  cutout: 45,
};

const TokenAllocation: React.FC = () => {
  const { signingClient, account } = useVectis();
  const [allocation, setAllocation] = useState<number[]>([]);
  const data: ChartData<"doughnut", number[], string> = {
    labels: ["Bonded", "Rewards", "Available", "Unbonding"],
    datasets: [
      {
        data: allocation,
        backgroundColor: ["#d0d7e7", "#778db9", "#475d90", "#303d5c"],
      },
    ],
  };

  useEffect(() => {
    const getAllocation = async () => {
      const { available, bonded, unbounded, rewards } = await signingClient.getAllocation(account.address);
      setAllocation([bonded, rewards, +available, unbounded]);
    };
    getAllocation();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <p>Allocation</p>
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-white px-2 py-4 shadow-sm 2xl:flex-row">
        <Doughnut data={data} options={chartOptions} className="max-h-[10rem] sm:max-w-sm" />
      </div>
    </div>
  );
};

export default TokenAllocation;
