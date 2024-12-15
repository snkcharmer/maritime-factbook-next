import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type TChartType = "bar" | "line" | "pie";

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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Dynamic Bar Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={data} />
    </div>
  );
};

const getColor = (index: number) => {
  const colors = [
    "#4285F4",
    "#FBBC05",
    "#EA4335",
    "#34A853",
    "#FF9900",
    "#AA46BE",
  ];
  return colors[index % colors.length];
};

export default DynamicChart;
