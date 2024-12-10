'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export type TChartType = 'bar' | 'line' | 'pie';

interface ChartProps {
  chartType: TChartType;
  tableData: {
    headers: { label: string; subHeaders: string[] }[];
    rows: string[][];
  };
}

const DynamicChart = ({ chartType, tableData }: ChartProps) => {
  const validHeaders = tableData.headers.filter(
    (header) =>
      header.label.trim() !== '' &&
      header.subHeaders.some((sub) => sub.trim() !== '')
  );

  const labels = validHeaders
    .map((header) => header.subHeaders.filter((sub) => sub.trim() !== ''))
    .flat();

  const validSubHeaderIndices = tableData.headers
    .map((header, headerIndex) =>
      header.subHeaders
        .map((sub, subIndex) => (sub.trim() !== '' ? subIndex : null))
        .filter((index) => index !== null)
        .map((subIndex) => headerIndex * header.subHeaders.length + subIndex)
    )
    .flat();

  const datasets = tableData.rows.map((row, rowIndex) => ({
    label: row[0],
    data: validSubHeaderIndices.map((index) => Number(row[index + 1])),
    backgroundColor: `rgba(${50 * rowIndex}, ${100 + rowIndex * 30}, ${
      150 + rowIndex * 20
    }, 0.5)`,
    borderColor: `rgba(${50 * rowIndex}, ${100 + rowIndex * 30}, ${
      150 + rowIndex * 20
    }, 1)`,
    borderWidth: 1,
  }));

  const data = {
    labels,
    datasets: chartType === 'pie' ? datasets.slice(0, 1) : datasets,
  };

  const ChartComponent = {
    bar: Bar,
    line: Line,
    pie: Pie,
  }[chartType];

  return <ChartComponent data={data} />;
};

export default DynamicChart;
