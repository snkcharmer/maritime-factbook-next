"use client";
import {
  Box,
  Center,
  Container,
  Group,
  HoverCard,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import Link from "next/link";
import Image from "next/image";
import { IconChevronDown, IconDatabase } from "@tabler/icons-react";
import { ROUTES } from "@/constants";
import { useFbCategory } from "@/hooks";
import { TFbCategoryResponse } from "@/types";
import { createPath } from "@/utils/route";
import { useState, useEffect } from "react";
import { ICardItem, staticCardItems } from "./CategoryList";

export function Header() {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const { data, fetchFbCategories } = useFbCategory<TFbCategoryResponse>();
  const [cardItems, setCardItems] = useState<ICardItem[]>([]);

  // Scroll state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.data) {
      const mergedItems = data.data.map((item, index) => ({
        title: item.name,
        icon: staticCardItems[index]?.icon || IconDatabase,
        href: createPath({
          path: ROUTES.resourceCategoriesHome,
          dynamicParams: { fbCategorySlug: item.slug },
        }),
        slug: item.slug,
      }));
      setCardItems(mergedItems);
    }
  }, [data]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={cx(classes.header, { [classes.scrolled]: scrolled })}>
      <Container size="lg">
        <Group justify="space-between" h="100%">
          <Link href="/">
            <Group gap={8}>
              <Image
                src="/dmw.png"
                alt=""
                width={50}
                height={50}
                className={cx(classes.logo, { [classes.logoSmall]: scrolled })}
              />
              <Image
                src="/logo.png"
                alt=""
                width={50}
                height={50}
                className={cx(classes.logo, { [classes.logoSmall]: scrolled })}
              />
              <Image
                src="/bagong-pilipinas.png"
                alt=""
                width={50}
                height={50}
                className={cx(classes.logo, { [classes.logoSmall]: scrolled })}
              />

              {/* <Text lh={1}>
                Philippine Maritime
                <br /> Manpower Factbook
              </Text> */}
            </Group>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <HoverCard
              width={600}
              radius="md"
              shadow="md"
              withinPortal
              zIndex={999}
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

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Stack gap={0}>{links}</Stack>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="https://nmp.gov.ph/history" className={classes.link}>
              About NMP
            </a>
            <a
              href="https://nmp.gov.ph/verification-of-certificate/contact/"
              className={classes.link}
            >
              Contact Us
            </a>
          </Group>
        </Group>
      </Container>
    </header>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 299,
    //     backgroundColor: "rgba(255, 255, 255, 0.95)",
    backgroundColor: "#101e47",
    color: "white",
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    transition: "padding 0.3s ease",
  },

  scrolled: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },

  logo: {
    transition: "transform 0.3s ease",
  },

  logoSmall: {
    transform: "scale(0.9)",
  },

  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.black,
    transition: "color 0.3s ease, transform 0.3s ease",
    "&:hover": {
      color: theme.colors.blue[6],
      transform: "translateY(-2px)",
    },
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));
