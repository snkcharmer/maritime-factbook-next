'use client';
import { Group, Text, Accordion, Button, Stack } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { IconLink } from '@tabler/icons-react';

interface NestedItem {
  id: string;
  label: string;
  description: string;
  link: string;
}

interface CharacterItem {
  id: string;
  label: string;
  data: NestedItem[];
}

const charactersList: CharacterItem[] = [
  {
    id: '1',
    label: 'WoSeaTradeGlobSupDem',
    data: [
      {
        id: '1',
        label:
          'World Gross Domestic Product (GDP) and Maritime Trade-to-GDP Ratio, 2006-2022',
        description: ' ',
        link: ' ',
      },
      {
        id: '2',
        label: 'International Maritime Trade, 2003-2024 (Million tons loaded)',
        description: 'More details about Bender.',
        link: ' ',
      },
      {
        id: '3',
        label:
          'World Seaborne Trade (in Million Tons) by Types of Cargo, 2018-2021',
        description: 'More details about Bender.',
        link: ' ',
      },
      {
        id: '1',
        label:
          'World Gross Domestic Product (GDP) and Maritime Trade-to-GDP Ratio, 2006-2022',
        description: ' ',
        link: ' ',
      },
      {
        id: '2',
        label: 'International Maritime Trade, 2003-2024 (Million tons loaded)',
        description: 'More details about Bender.',
        link: ' ',
      },
      {
        id: '3',
        label:
          'World Seaborne Trade (in Million Tons) by Types of Cargo, 2018-2021',
        description: 'More details about Bender.',
        link: ' ',
      },
      {
        id: '1',
        label:
          'World Gross Domestic Product (GDP) and Maritime Trade-to-GDP Ratio, 2006-2022',
        description: ' ',
        link: ' ',
      },
      {
        id: '2',
        label: 'International Maritime Trade, 2003-2024 (Million tons loaded)',
        description: 'More details about Bender.',
        link: ' ',
      },
      {
        id: '3',
        label:
          'World Seaborne Trade (in Million Tons) by Types of Cargo, 2018-2021',
        description: 'More details about Bender.',
        link: ' ',
      },
    ],
  },
  {
    id: '2',
    label: 'PhMarManData',
    data: [
      {
        id: 'nested1',
        label: 'Figure 37. No. of SIRB Issued 2018-2022',
        description: ' .',
        link: ' ',
      },
    ],
  },
  {
    id: '3',
    label: 'PhDomOverMerFleet',
    data: [
      {
        id: '1',
        label:
          'Average GRT of Domestic Registered Vessels, by Ship Classification, 2018-2022',
        description: ' ',
        link: ' ',
      },
      {
        id: '2',
        label:
          'Average Age of Domestic Registered Vessels by Ship Classification, 2018-2022',
        description: ' ',
        link: ' ',
      },
    ],
  },
  {
    id: '4',
    label: 'SupManDev',
    data: [
      {
        id: '1',
        label:
          'Regional Location of MHEIs recognized by CHED, to accept enrollees for BSMT and BSMarE Programs, AY 2022-2023',
        description: ' ',
        link: ' ',
      },
    ],
  },
  {
    id: '5',
    label: 'FilWomenMar',
    data: [
      {
        id: '1',
        label: 'Age Profile of Women Seafarer-Respondents',
        description: ' .',
        link: ' ',
      },
    ],
  },
];

interface AccordionLabelProps {
  label: string;
}

function AccordionLabel({ label }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <div>
        <Text>{label}</Text>
      </div>
    </Group>
  );
}

export function Categories() {
  const { classes } = useStyles();
  const renderNestedAccordion = (data: NestedItem[]) => {
    return data.map((nestedItem, idx) => (
      <Button
        variant="default"
        leftSection={<IconLink size={16} />}
        key={idx}
        className="truncate max-w-auto text-xs"
      >
        {nestedItem.label}
      </Button>
    ));
  };

  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.id}>
      <Accordion.Control>
        <AccordionLabel label={item.label} />
      </Accordion.Control>
      <Accordion.Panel>
        <div className={classes.scrollable}>
          {item.data.length > 0 && (
            <Accordion
              chevronPosition="right"
              variant="contained"
              className="text-sm"
            >
              <Stack gap={6}>{renderNestedAccordion(item.data)}</Stack>
            </Accordion>
          )}
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="container mx-auto">
      <Accordion
        chevronPosition="right"
        variant="contained"
        defaultValue={charactersList[0].id}
      >
        {items}
      </Accordion>
    </div>
  );
}

const useStyles = createStyles(() => ({
  scrollable: {
    maxHeight: 350, // Adjust height as needed
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));
