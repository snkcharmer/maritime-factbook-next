"use client";
import { Text, Title, Stack, Divider } from "@mantine/core";
import { createStyles } from "@mantine/emotion";

const BriefDescription = () => {
  const { classes } = useStyles();

  return (
    <Stack gap="md" align="flex-start" id="second-fold">
      <Title order={2} className="font-bold text-[1.8rem] text-blue-700">
        Welcome to the Philippine Maritime Manpower Factbook!
      </Title>
      <Divider size="sm" color="blue" />
      <Text size="md" className={classes.text}>
        The Philippine Maritime Manpower Factbook is a comprehensive web portal
        designed to provide consolidated, relevant, and up-to-date data and
        statistics on the maritime industry. Its primary aim is to deliver a
        clear and detailed overview of both the global and Philippine maritime
        manpower sectors.
      </Text>
      <Text size="md" className={classes.text}>
        The information is meticulously collected from reliable sources,
        including government agencies, research studies, and published reports.
        Through this interactive platform, industry stakeholders can easily
        access data to support policy formulation, strategic planning, and
        program development.
      </Text>
    </Stack>
  );
};

export default BriefDescription;

const useStyles = createStyles((theme) => ({
  text: {
    color: theme.colors.dark[7],
    lineHeight: 1.6,
  },
}));
