"use client";

import { Card, List, Space, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

export function WelcomeCard() {
	return (
		<Card radius="md">
			<Title order={5}>Welcome back!</Title>
			<Text fz="sm" c="dimmed" fw="500">
				Maritime Manpower Factbook Dashboard
			</Text>
			<Space h="sm" />
			<List
				center
				size="sm"
				spacing="sm"
				icon={
					<ThemeIcon color="green.3" size={22} radius="xl">
						<IconCircleCheck size="1rem" />
					</ThemeIcon>
				}
			>
				<List.Item>
					Data submitted by John Doe <Text size="xs">less than a minute</Text>
				</List.Item>
				<List.Item>
					Data submitted by Johnny Seans <Text size="xs">29mins ago</Text>
				</List.Item>
				<List.Item>
					Data submitted by Mona Lisa <Text size="xs">2hrs ago</Text>
				</List.Item>
			</List>
		</Card>
	);
}
