export const categoryData = {
  WoSeaTradeGlobSupDem: [
    {
      title:
        'Fig 1. World Gross Domestic Product (GDP) and Maritime Trade-to-GDP Ratio, 2006–2022',
      labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
      datasets: [
        {
          label: 'GDP',
          data: [75, 80, 85, 90, 95, 100],
          backgroundColor: '#4ADE80',
        },
        {
          label: 'Seaborne Trade',
          data: [60, 65, 70, 80, 85, 90],
          backgroundColor: '#60A5FA',
        },
      ],
    },
    {
      title:
        'Fig 2. International Maritime Trade, 2003–2024 (Million tons loaded)',
      labels: [
        'Dry Bulk',
        'Oil',
        'Containers',
        'Other Dry',
        'Gas',
        'Chemicals',
      ],
      datasets: [
        {
          label: 'Trade',
          data: [30, 25, 20, 15, 10, 5],
          backgroundColor: [
            '#F87171',
            '#34D399',
            '#60A5FA',
            '#FBBF24',
            '#A78BFA',
            '#FDBA74',
          ],
        },
      ],
    },
  ],
  PhMarManData: [
    {
      title: 'Fig 37. Number of SIRB Issued (2018–2022)',
      labels: ['2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'Count',
          data: [196278, 183208, 80439, 78954, 78246],
          backgroundColor: '#4ADE80',
        },
      ],
    },
    {
      title: 'Fig 38. Seafarers with SIRB by Sex, By Region (2018–2021)',
      labels: [
        'ARMM',
        'CAR',
        'Region 2',
        'Region 4B',
        'Region 10',
        'Region 11',
        'Region 12',
        'NCR',
        'Region 6',
      ],
      datasets: [
        {
          label: 'Male',
          data: [1626, 3234, 9402, 10383, 14951, 17402, 17224, 47050, 51942],
          backgroundColor: '#60A5FA',
        },
        {
          label: 'Female',
          data: [74, 199, 434, 433, 499, 793, 654, 4587, 1251],
          backgroundColor: '#FBBF24',
        },
      ],
    },
  ],
  // Add data for other categories (PhDomOverMerFleet, SupManDev, FilWomenMar) here
};

export const categories = [
  {
    name: 'World Seaborne Trade and Global Supply & Demand Statistics',
    description:
      "This section contains data and statistics pertaining to international trade and transport services, seafarer workforce global demand and supply situation, the Philippines' share in the global supply of maritime manpower, and seafarers' wages in certain types of ships. Seaborn trade and fleet development, among others, are considered main drivers of demand of seafarers.",
    figures: ['Figure 1', 'Figure 2', 'Figure 3'],
  },
  {
    name: 'Philippine Maritime Manpower Data',
    description:
      'This section contains data and statistics relating to the country’s maritime manpower profile data such as age, sex, region of origin of registered Filipino seafarers, Deployed Filipino Seafarers by Major Category/Occupational Group, Top 10 Occupation/Rank of deployed seafarers, Top 5 Vessels and Top 10 Flags of Registry embarked by Filipino seafarers for the period 2018-2022.',
    figures: ['Figure 4', 'Figure 5'],
  },
  {
    name: 'The Philippine Domestic and Overseas Merchant Fleet',
    description:
      'This section comprises data and statistics covering the Philippine Domestic and Overseas Merchant Fleet, including data on the Philippines’ ranking in liner shipping connectivity and ship building and ship repair as well as other relevant information in the domestic maritime such as: port statistics, maritime accidents and Harbor Pilotage in the Philippines.',
    figures: ['Figure 6', 'Figure 7'],
  },
  {
    name: 'Support to Manpower Development',
    description:
      'This section covers data and statistics from the Maritime Higher Education Institutions and Maritime Training Institutions. The two institutions are crucial partners of the regulatory bodies in the implementation of the Maritime Education and Training (MET) and in sustaining the manpower development of the country.',
    figures: ['Figure 8', 'Figure 9'],
  },
  {
    name: 'Filipino Women in Maritime',
    description:
      'This section contains preliminary data and statistics of the Filipino Women in Maritime based on the result of the survey conducted in CY 2022 on the research/study ‘Profile of Filipino Women in Maritime. The survey is also part of the Philippine’s efforts to collect, consolidate and analyze data regarding the participation of women in the maritime sector in order to establish an evidentiary foundation that will set the country baselines, identify gaps and develop policies aimed at removing barriers and increasing female participation in the sector.',
    figures: ['Figure 10'],
  },
];
