'use client';
import { Button, Container, em, Stack, Text, Title } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import Link from 'next/link';

export default function NotFound() {
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <Stack>
        <div>
          <Title className={classes.title}>No data available...</Title>
          <Text c="dimmed" size="lg">
            It seems there’s no data to display on this page at the moment. This
            could happen because there’s no content uploaded yet, or the data
            has been removed. Please check back later or contact support for
            further assistance.
          </Text>
          <Button
            href="/"
            component={Link}
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            Return to home page
          </Button>
        </div>
      </Stack>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: '80px',
    paddingBottom: '80px',
  },

  title: {
    fontWeight: 900,
    fontSize: '34px',
    marginBottom: theme.spacing.md,
    fontFamily: `"Greycliff CF", ${theme.fontFamily}`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: em(32),
    },
  },

  control: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: '100%',
    },
  },
}));
