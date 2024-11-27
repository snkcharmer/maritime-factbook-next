"use client";

import { Card, Title } from "@mantine/core";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

const labels = ["2013", "2014", "2015", "2016", "2017"];

const data = {
	labels,
	datasets: [
		{
			label: "Dry Bulk",
			data: [30, 35, 40, 45, 50], // Replace with actual Dry Bulk values
			backgroundColor: "#F87171",
		},
		{
			label: "Oil",
			data: [20, 25, 30, 35, 40], // Replace with actual Oil values
			backgroundColor: "#34D399",
		},
		{
			label: "Containers",
			data: [15, 20, 25, 30, 35], // Replace with actual Container values
			backgroundColor: "#60A5FA",
		},
		{
			label: "Other Dry",
			data: [10, 15, 20, 25, 30], // Replace with actual Other Dry values
			backgroundColor: "#FBBF24",
		},
	],
};

export function OverviewCard2() {
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
			<Title order={5}>
				Fig 2. International Maritime Trade, 2003–2024 (Million tons loaded)
			</Title>
			<Bar options={options} data={data} />
		</Card>
	);
}
