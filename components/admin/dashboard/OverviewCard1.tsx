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

const labels = ["2016", "2017", "2018", "2019", "2020", "2021"];

const data = {
	labels,
	datasets: [
		{
			label: "GDP",
			data: [75, 80, 85, 90, 95, 100], // Replace these with actual GDP values
			backgroundColor: "#4ADE80",
		},
		{
			label: "Seaborne Trade",
			data: [60, 65, 70, 80, 85, 90], // Replace these with actual Trade values
			backgroundColor: "#60A5FA",
		},
	],
};

export function OverviewCard1() {
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
				Fig 1. World Gross Domestic Product (GDP) and Maritime Trade-to-GDP
				Ratio, 2006-2022
			</Title>
			<Bar options={options} data={data} />
		</Card>
	);
}
