import React from 'react';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const FakeGraph: React.FC = () => {
  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center gap-2 rounded-md bg-white px-2 py-4 shadow-sm">
      <div className="absolute top-0 right-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-sm">
        <p className="text-xl font-bold">Coming Soon</p>
      </div>
      <Bar
        className="h-full"
        data={{
          datasets: [
            {
              label: 'Income',
              backgroundColor: '#d0d7e7',
              borderColor: '#d0d7e7',
              borderWidth: 1,
              data: Array.from({ length: 9 }, () => Math.floor(Math.random() * 100))
            }
          ],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          }
        }}
      />
    </div>
  );
};

export default FakeGraph;
