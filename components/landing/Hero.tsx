'use client';
import { IconCheck } from '@tabler/icons-react';
import { List, Text, ThemeIcon, Title } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import Image from 'next/image';

export default function Hero() {
  const { classes } = useStyles();
  return (
    // <Container size={1200} py={50} maw={1100}>
    <div className={classes.inner}>
      <div className={classes.content}>
        <Title className={classes.title}>
          Welcome to The Philippine Maritime Manpower Factbook!
        </Title>
        <Text c="dimmed" mt="md">
          Build fully functional accessible web applications faster than ever –
          Mantine includes more than 120 customizable components and hooks to
          cover you in any situation
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <IconCheck size={12} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>Generate Dynamic Tables</b> – customizable tables to organize and
            display collected data efficiently
          </List.Item>
          <List.Item>
            <b>Generate Dynamic Charts</b> – visualize gathered data through
            flexible and interactive charts
          </List.Item>
          <List.Item>
            <b>Export Data</b> – allow seamless export of collected data for
            reporting and analysis.
          </List.Item>
        </List>

        {/* <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button>
          </Group> */}
      </div>
      <Image
        src="/hero.svg"
        className={classes.image}
        alt=""
        width={200}
        height={300}
      />
    </div>
    // {/* </Container> */}
  );
}
const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },

  content: {
    maxWidth: '480px',
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colors.black,
    fontFamily: `'Greycliff CF', ${theme.fontFamily}`,
    fontSize: '44px',
    lineHeight: 1.2,
    fontWeight: 900,

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: '28px',
    },
  },

  control: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flex: 1,
    },
  },

  image: {
    width: '376px',
    height: '356px',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.colors.blue[0], // Use Mantine's predefined colors
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));
