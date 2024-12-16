"use client";
import { Container, Text, Title } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import Image from "next/image";

export default function Hero() {
  const { classes } = useStyles();
  return (
    // <Container size={1200} py={50} maw={1100}>
    <div className={classes.inner}>
      <Container size="lg" className="flex items-center justify-between">
        <div className={classes.content}>
          <Title className={classes.title}>
            Welcome to The
            <br />
            Philippine Maritime Manpower Factbook!
          </Title>
          <Text c="white" mt="md" className="text-justify">
            The Philippine Maritime Manpower Factbook is a portal containing
            consolidated relevant and updated maritime industry-related data and
            statistics that seeks to provide a picture of the global and
            Philippine maritime manpower sector, presented in facts and figures
            that are derived from the data of various relevant data producer
            agencies, researches, and published reports. This interactive
            platform provides data that is readily accessible to industry
            stakeholders in aid of policy formulation and program development.
          </Text>

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
          src="/home-hero.webp"
          className={classes.image}
          alt=""
          width={500}
          height={600}
        />
      </Container>
    </div>
    // {/* </Container> */}
  );
}
const useStyles = createStyles((theme) => ({
  inner: {
    paddingTop: "0rem",
    paddingBottom: "4rem",
    alignItems: "center",
    background:
      "linear-gradient(0deg,rgba(0,0,0,.3),rgba(0,0,0,.3)),url(/bg-hero.jpg) 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    maxWidth: "480px",
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: "white",
    fontFamily: `'Greycliff CF', ${theme.fontFamily}`,
    fontSize: "44px",
    lineHeight: 1.2,
    fontWeight: 900,

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: "28px",
    },
  },

  control: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flex: 1,
    },
  },

  image: {
    width: "500px",
    height: "600px",

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.colors.blue[0], // Use Mantine's predefined colors
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));
