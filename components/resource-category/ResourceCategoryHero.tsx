'use client';
import { useFbCategory } from '@/hooks';
import { IFbCategory } from '@/types';
import { Container, Text, Title } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Hero() {
  const { classes } = useStyles();
  const { fbCategorySlug } = useParams();
  const { data: fbCategory, getFbCategoryBySlug } =
    useFbCategory<IFbCategory>();

  useEffect(() => {
    if (fbCategorySlug) {
      getFbCategoryBySlug(fbCategorySlug as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategorySlug]);

  return (
    <div className={classes.inner}>
      <Container size="lg" className="text-center">
        <Title className={classes.title}>{fbCategory?.name}</Title>
        <Text c="white" mt="md">
          {fbCategory?.description}
        </Text>
      </Container>
    </div>
    // {/* </Container> */}
  );
}
const useStyles = createStyles((theme) => ({
  inner: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    alignItems: 'center',
    background:
      'linear-gradient(0deg,rgba(0,0,0,.3),rgba(0,0,0,.3)),url(/bg-hero.jpg) 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  title: {
    color: 'white',
    fontFamily: `'Greycliff CF', ${theme.fontFamily}`,
    fontSize: '44px',
    lineHeight: 1.2,
    fontWeight: 900,

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: '28px',
    },
  },
}));
