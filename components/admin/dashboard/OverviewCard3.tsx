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

const labels = ["2018", "2019", "2020", "2021"];

const data = {
	labels,
	datasets: [
		{
			label: "Tanker Trade",
			data: [3201, 3165, 2922, 2952], // Replace with actual Tanker Trade values
			backgroundColor: "#6366F1",
		},
		{
			label: "Main Bulks",
			data: [4690, 4660, 4531, 4761], // Replace with actual Main Bulks values
			backgroundColor: "#22D3EE",
		},
		{
			label: "Other Dry Cargo",
			data: [4000, 4050, 4100, 4200], // Replace with actual Other Dry Cargo values
			backgroundColor: "#E879F9",
		},
	],
};

export function OverviewCard3() {
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
				Fig 3. World Seaborne Trade (in Million Tons) by Types of Cargo,
				2018–2021
			</Title>
			<Bar options={options} data={data} />
		</Card>
	);
}
