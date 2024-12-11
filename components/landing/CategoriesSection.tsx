'use client';
import {
  IconCookie,
  IconGauge,
  IconLock,
  IconMessage2,
  IconUser,
} from '@tabler/icons-react';
import { Space, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import CardSection from './CardSection';
import BarChart from './charts/BarChartSection';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: IconMessage2,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={18} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <Stack gap={30}>
      <Title>Featured publications</Title>
      <CardSection />
      <Title>Data visualizations</Title>
      <Space h={40} />
      <BarChart />
      {/* <Grid gutter={40}>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <CardSection />
          <Space h={40} />
          <Title>Data visualizations</Title>
          <Space h={40} />
          <BarChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Categories />
        </Grid.Col>
      </Grid> */}
    </Stack>
  );
}
