'use client';

import { Flex, Grid, GridCol, Select } from '@mantine/core';
import { useState } from 'react';
import { WelcomeCard } from './WelcomeCard';
import { categoryData } from './ContextData';
import { OverviewCardUI } from './OverviewCardUI';

type CategoryKey = keyof typeof categoryData;

export function DataProviderDashboardContent() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(
    'WoSeaTradeGlobSupDem'
  );

  return (
    <Grid>
      {/* <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        <ProfileCard />
      </GridCol> */}
      <GridCol span={{ sm: 12, md: 12, lg: 8 }}>
        <Flex direction="column" h="100%" justify="space-between" gap="md">
          <WelcomeCard />
        </Flex>
      </GridCol>
      <GridCol span={12}>
        <Select
          label="Select Category"
          placeholder="Choose a category"
          data={[
            {
              value: 'WoSeaTradeGlobSupDem',
              label:
                'World Seaborne Trade and Global Supply & Demand Statistics',
            },
            {
              value: 'PhMarManData',
              label: 'Philippine Maritime Manpower Data',
            },
            {
              value: 'PhDomOverMerFleet',
              label: 'The Philippine Domestic and Overseas Merchant Fleet',
            },
            { value: 'SupManDev', label: 'Support to Manpower Development' },
            { value: 'FilWomenMar', label: 'Filipino Women in Maritime' },
          ]}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value as CategoryKey)}
          style={{ marginBottom: '2rem' }}
        />

        <Grid>
          {categoryData[selectedCategory]?.map((figure, idx) => (
            <GridCol span={{ sm: 12, md: 12, lg: 6 }} key={idx}>
              <OverviewCardUI
                title={figure.title}
                labels={figure.labels}
                datasets={figure.datasets}
              />
            </GridCol>
          ))}
        </Grid>
      </GridCol>
      {/* </div> */}
      {/* <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
				<OverviewCardUI
					title="Fig 1. World Gross Domestic Product (GDP) and Maritime Trade-to-GDP Ratio, 2006–2022"
					labels={["2016", "2017", "2018", "2019", "2020", "2021"]}
					datasets={[
						{
							label: "GDP",
							data: [75, 80, 85, 90, 95, 100],
							backgroundColor: "#4ADE80",
						},
						{
							label: "Seaborne Trade",
							data: [60, 65, 70, 80, 85, 90],
							backgroundColor: "#60A5FA",
						},
					]}
				/>
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 4 }}>
				<OverviewCardUI
					title="Fig 2. International Maritime Trade, 2003–2024 (Million tons loaded)"
					labels={[
						"Dry Bulk",
						"Oil",
						"Containers",
						"Other Dry",
						"Gas",
						"Chemicals",
					]}
					datasets={[
						{
							label: "Trade",
							data: [30, 25, 20, 15, 10, 5],
							backgroundColor: [
								"#F87171",
								"#34D399",
								"#60A5FA",
								"#FBBF24",
								"#A78BFA",
								"#FDBA74",
							],
						},
					]}
				/>
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 4 }}>
				<OverviewCardUI
					title="Fig 3. World Seaborne Trade (in Million Tons) by Types of Cargo, 2018–2021"
					labels={["2018", "2019", "2020", "2021"]}
					datasets={[
						{
							label: "Tanker Trade",
							data: [3201, 3165, 2922, 2952],
							borderColor: "#6366F1",
							backgroundColor: "rgba(99, 102, 241, 0.5)",
						},
						{
							label: "Main Bulks",
							data: [4690, 4660, 4531, 4761],
							borderColor: "#22D3EE",
							backgroundColor: "rgba(34, 211, 238, 0.5)",
						},
						{
							label: "Other Dry Cargo",
							data: [4000, 4050, 4100, 4200],
							borderColor: "#E879F9",
							backgroundColor: "rgba(232, 121, 249, 0.5)",
						},
					]}
				/>
			</GridCol> */}
    </Grid>
  );
}
