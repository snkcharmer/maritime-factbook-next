"use client";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Container, Group, SimpleGrid, Text } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import Image from "next/image";
import Link from "next/link";

// const data = [
//   {
//     title: 'About',
//     links: [{ label: 'Forums', link: '#' }],
//   },
//   {
//     title: 'Categories',
//     links: [
//       { label: 'Contribute', link: '#' },
//       { label: 'Media assets', link: '#' },
//       { label: 'Changelog', link: '#' },
//       { label: 'Releases', link: '#' },
//     ],
//   },
//   {
//     title: 'Community',
//     links: [
//       { label: 'Join Discord', link: '#' },
//       { label: 'Follow on Twitter', link: '#' },
//       { label: 'Email newsletter', link: '#' },
//       { label: 'GitHub discussions', link: '#' },
//     ],
//   },
// ];

export default function Footer() {
  const { classes } = useStyles();

  // const groups = data.map((group) => {
  //   const links = group.links.map((link, index) => (
  //     <Text<'a'>
  //       key={index}
  //       className={classes.link}
  //       component="a"
  //       href={link.link}
  //       onClick={(event) => event.preventDefault()}
  //     >
  //       {link.label}
  //     </Text>
  //   ));

  //   return (
  //     <div className={classes.wrapper} key={group.title}>
  //       <Text className={classes.title}>{group.title}</Text>
  //       {links}
  //     </div>
  //   );
  // });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size="lg">
        <SimpleGrid
          cols={{ base: 3, xs: 4, sm: 5, md: 6, lg: 7 }}
          className="items-center"
        >
          <Link
            href="https://www.bagongpilipinastayo.com/"
            className={classes.logo}
          >
            <Image
              src="/bagong-pilipinas.png"
              alt=""
              width={140}
              height={140}
            />
          </Link>
          <Link
            href="https://dmw.gov.ph/"
            className={classes.logo}
            target="_blank"
          >
            <Image src="/dmw.png" alt="dmw" width={140} height={140} />
          </Link>
          <Link
            href="https://marina.gov.ph/"
            className={classes.logo}
            target="_blank"
          >
            <Image src="/marina.png" alt="marina" width={140} height={140} />
          </Link>
          <Link
            href="https://coastguard.gov.ph/"
            className={classes.logo}
            target="_blank"
          >
            <Image src="/pcg.png" alt="pcg" width={140} height={140} />
          </Link>
          <Link
            href="https://ched.gov.ph/"
            className={classes.logo}
            target="_blank"
          >
            <Image src="/ched.png" alt="ched" width={140} height={140} />
          </Link>
          <Link
            href="https://owwa.gov.ph/"
            className={classes.logo}
            target="_blank"
          >
            <Image src="/owwa.png" alt="owwa" width={140} height={140} />
          </Link>
          <Link
            href="https://www.bsp.gov.ph/"
            className={classes.logo}
            target="_blank"
          >
            <Image src="/bsp.png" alt="bsp" width={140} height={140} />
          </Link>
        </SimpleGrid>
        {/* <div className={classes.groups}>{groups}</div> */}
      </Container>
      <Container className={classes.afterFooter} size="lg">
        <Text size="sm">
          © 2024 National Maritime Polytechnic. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: "120px",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    //     backgroundColor: theme.colors.gray[0],
    backgroundColor: "#101e47",
    color: "white",
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },

  logo: {
    maxWidth: "400px",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: "5px",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },

  wrapper: {
    width: "160px",
  },

  link: {
    display: "block",
    color: theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: "3px",
    paddingBottom: "3px",

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `"Greycliff CF", ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colors.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colors.gray[2]}`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
    },
  },

  social: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: theme.spacing.xs,
    },
  },
}));
