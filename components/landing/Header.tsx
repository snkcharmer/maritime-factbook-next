'use client';
import {
  Box,
  Center,
  Container,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import Link from 'next/link';
import Image from 'next/image';
import { IconChevronDown, IconDatabase } from '@tabler/icons-react';
import { ROUTES } from '@/constants';
import { useFbCategory } from '@/hooks';
import { TFbCategoryResponse } from '@/types';
import { createPath } from '@/utils/route';
import { useState, useEffect } from 'react';
import { ICardItem, staticCardItems } from './CategoryList';

export function Header() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { data, fetchFbCategories } = useFbCategory<TFbCategoryResponse>();
  const [cardItems, setCardItems] = useState<ICardItem[]>([]);

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.data) {
      const mergedItems = data.data.map((item, index) => ({
        title: item.name,
        icon: staticCardItems[index]?.icon || IconDatabase, // Use corresponding static icon or default
        href: createPath({
          path: ROUTES.resourceCategoriesHome,
          dynamicParams: { fbCategorySlug: item.slug },
        }),
        slug: item.slug,
      }));
      setCardItems(mergedItems);
    }
  }, [data]);

  const links = cardItems.map((item, i) => (
    <UnstyledButton
      className={classes.subLink}
      key={i}
      component="a"
      href={item.href}
    >
      <Group wrap="nowrap">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>

        <Text size="sm" fw={500}>
          {item.title}
        </Text>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="lg">
          <Group justify="space-between" h="100%">
            <Link href="/">
              <Group gap={8}>
                <Image src="/logo.png" alt="" width={50} height={50} />
                <Text>Maritime Manpower Factbook</Text>
              </Group>
            </Link>

            <Group h="100%" gap={0} visibleFrom="sm">
              <Link href="/" className={classes.link}>
                Home
              </Link>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Categories
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.blue[6]} />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Categories</Text>
                    {/* <Anchor href="#" fz="xs">
                      View all
                    </Anchor> */}
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  {/* <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" c="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div> */}
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#https://nmp.gov.ph/" className={classes.link}>
                About NMP
              </a>
              <a
                href="https://nmp.gov.ph/verification-of-certificate/contact/"
                className={classes.link}
              >
                Contact Us
              </a>
            </Group>
            {/* 
            <Group visibleFrom="sm">
              <Button component={Link} href="/login" variant="default">
                Log in
              </Button>
              <Button>Sign up</Button>
            </Group> */}
          </Group>
        </Container>
      </header>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: '0.8rem',
    paddingBottom: '0.8rem',
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.black,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      height: '42px',
      width: '100%',
    },

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },

  dropdownFooter: {
    backgroundColor: theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colors.gray[1]}`,
  },
}));
