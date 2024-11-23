'use client';
import {
  Button,
  Container,
  Image,
  em,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import image from '@/public/404.svg';
import { createStyles } from '@mantine/emotion';
import Link from 'next/link';

export default function NotFound() {
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image.src} className={classes.mobileImage} alt="" />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            href="/"
            component={Link}
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            Get back to home page
          </Button>
        </div>
        <Image src={image.src} className={classes.desktopImage} alt="" />
      </SimpleGrid>
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

  mobileImage: {
    [`@media (min-width: 48em)`]: {
      display: 'none',
    },
  },

  desktopImage: {
    [`@media (max-width: 47.99em)`]: {
      display: 'none',
    },
  },
}));
