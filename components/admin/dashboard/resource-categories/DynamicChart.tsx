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
    '#3DA9A6', // Teal (common in bars, lines)
    '#FFB950', // Orange (used for highlights, lines)
    '#2B2D42', // Dark Gray (axis lines, labels)
    '#8D99AE', // Light Gray-Blue (grid lines, subtle text)
    '#EDF2F4', // Light Gray (background)
    '#4CAF50', // Green (used in pie/donut charts)
    '#009688', // Aqua Green (additional highlights)
    '#FFC107', // Yellow (in bar charts or pie slices)
    '#00BFA6', // Vibrant Teal
    '#1E88E5', // Blue
    '#757575', // Neutral Gray
    '#6C757D', // Muted Grayish
    '#343A40', // Darker Charcoal
  ];
  return colors[index % colors.length];
};

export default DynamicChart;
