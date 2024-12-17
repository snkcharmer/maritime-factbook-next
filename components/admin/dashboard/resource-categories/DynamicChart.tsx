import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type TChartType = 'bar' | 'line' | 'pie';

const DynamicChart = ({ tableData }: { tableData: any }) => {
  const xLabels = useMemo(
    () => tableData?.headers[0]?.subHeaders?.slice(1) || [],
    [tableData]
  );

  const datasets = useMemo(() => {
    return (
      tableData?.rows?.map((row: any, rowIndex: number) => ({
        label: row[0],
        data: row.slice(1).map((value: any) => Number(value) || 0),
        backgroundColor: getColor(rowIndex),
        borderColor: getColor(rowIndex),
        borderWidth: 1,
      })) || []
    );
  }, [tableData]);

  const data = {
    labels: xLabels,
    datasets,
  };

  return (
    <div style={{ width: '100%', height: 'auto' }} className="">
      <Bar data={data} />
    </div>
  );
};

const getColor = (index: number) => {
  const colors = [
    'rgba(0, 123, 255, 0.8',
    'rgba(255, 152, 0, 0.8',
    'rgba(0, 150, 136, 0.8',
    'rgba(255, 193, 7, 0.8',
    'rgba(156, 39, 176, 0.8',
    'rgba(0, 188, 212, 0.8',
    'rgba(3, 169, 244, 0.8',
    'rgba(139, 195, 74, 0.8',
    'rgba(244, 67, 54, 0.8',
    'rgba(103, 58, 183, 0.8',
    'rgba(255, 99, 132, 0.8',
    'rgba(255, 159, 64, 0.8',
    'rgba(75, 192, 192, 0.8',
    'rgba(54, 162, 235, 0.8',
    'rgba(153, 102, 255, 0.8',
    'rgba(255, 205, 86, 0.8',
    'rgba(255, 87, 51, 0.8',
    'rgba(39, 174, 96, 0.8',
    'rgba(233, 30, 99, 0.8',
  ];
  return colors[index % colors.length];
};

export default DynamicChart;
