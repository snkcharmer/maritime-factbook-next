'use client';

import { Container, Text, Title } from '@mantine/core';
import classes from './HeroSection.module.css';

export function HeroSection() {
  // const router = useRouter();

  return (
    <Container pt="sm" size="lg">
      <div className={classes.inner}>
        <Title className={classes.subtitle}>Welcome to</Title>
        <Title className={classes.title}>
          The Philippine Maritime Manpower Factbook!
        </Title>

        <Text className={classes.description} mt={30}>
          The Philippine Maritime Manpower Factbook is a portal containing
          consolidated relevant and updated maritime industry-related data and
          statistics that seeks to provide a picture of the global and
          Philippine maritime manpower sector, presented in facts and figures
          that are derived from the data of various relevant data producer
          agencies, researches, and published reports. This interactive platform
          provides data that is readily accessible to industry stakeholders in
          aid of policy formulation and program development.
        </Text>

        {/* <Group mt={40}>
					<Button
						size="lg"
						className={classes.control}
						onClick={() => {
							router.push("/dashboard");
						}}
						rightSection={<IconArrowRight />}
					>
						Get started
					</Button>
					<Button
						variant="outline"
						size="lg"
						className={classes.control}
						onClick={() => {
							// open github
							window.open("https://github.com/ilagunzad/mantine-admin");
						}}
						rightSection={<IconStar />}
					>
						Give a Star
					</Button>
				</Group> */}
      </div>
    </Container>
  );
}
