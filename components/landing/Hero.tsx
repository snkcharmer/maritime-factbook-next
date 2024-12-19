"use client";
import {
  Container,
  Text,
  Title,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { classes } = useStyles();

  // Scroll handler for the CTA button
  const handleScrollToSecondFold = () => {
    const secondFoldElement = document.getElementById("second-fold");
    if (secondFoldElement) {
      const headerOffset = 100; // Adjust this value to match header height
      const elementPosition = secondFoldElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Image
        src="/bg-hero.jpg"
        alt="Philippine Maritime Manpower Factbook"
        width={1200}
        height={300}
        loading="lazy"
        layout="responsive"
      />
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    //     width: "100%",
    //     padding: "5rem 0",
    overflow: "hidden",
  },

  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7))",
    zIndex: -1,
  },

  inner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    animation: "fadeInUp 1.2s ease-out",
  },

  content: {
    background: "#0939adc7",
    padding: "3rem",
    borderRadius: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  },

  supTitle: {
    color: "white",
    fontSize: "24px",
    lineHeight: 1.2,
    fontWeight: 900,
  },

  title: {
    color: "white",
    fontSize: "44px",
    lineHeight: 1.2,
    fontWeight: 900,
    marginTop: "0.5rem",
    marginBottom: "1rem",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: "32px",
    },
  },

  description: {
    color: "white",
    fontSize: "18px",
    lineHeight: 1.6,
    marginTop: "0.5rem",
  },

  ctaButton: {
    backgroundColor: "#f59e1c",
    color: "white",
    fontSize: "18px",
    padding: "10px 20px",
    transition: "background-color 0.3s ease",

    "&:hover": {
      backgroundColor: "#e68900",
    },
  },

  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translateY(50px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));
