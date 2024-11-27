"use client";

import { Card, Title, Select } from "@mantine/core";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useState } from "react";

// Register all required Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Tooltip,
	Legend
);

// Define chart options (common for all chart types)
export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

// Define props for the component
interface OverviewCardProps {
	title: string; // Title of the card
	labels: string[]; // Chart labels
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string | string[];
		borderColor?: string;
	}[]; // Dataset configuration
}

export function OverviewCardUI({ title, labels, datasets }: OverviewCardProps) {
	const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar"); // Default to bar

	// Chart data structure
	const data = {
		labels,
		datasets,
	};

	// Render the correct chart component based on the `chartType`
	const renderChart = () => {
		switch (chartType) {
			case "line":
				return <Line options={options} data={data} />;
			case "pie":
				return <Pie options={options} data={data} />;
			case "bar":
			default:
				return <Bar options={options} data={data} />;
		}
	};

	return (
		<Card
			radius="md"
			w="100%"
			h="100%"
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			{/* Card Title */}
			<Title order={5} style={{ marginBottom: "1rem" }}>
				{title}
			</Title>

			{/* Dropdown for Chart Type Selection */}
			<Select
				label="Chart Type"
				placeholder="Select chart type"
				data={[
					{ value: "bar", label: "Bar" },
					{ value: "line", label: "Line" },
					{ value: "pie", label: "Pie" },
				]}
				value={chartType}
				onChange={(value) => setChartType(value as "bar" | "line" | "pie")}
				style={{ marginBottom: "1rem" }}
			/>

			{/* Render Chart */}
			{renderChart()}
		</Card>
	);
}
