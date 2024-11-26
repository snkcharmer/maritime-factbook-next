"use client";
import { Group, Text, Accordion } from "@mantine/core";


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
    id: "1",
    label: "WoSeaTradeGlobSupDem",
    data: [
      {
        id: "1",
        label: "World Gross Domestic Product (GDP) and Maritime Trade-to-GDP Ratio, 2006-2022",
        description: " ",
        link: " ",
      },
      {
        id: "2",
        label: "International Maritime Trade, 2003-2024 (Million tons loaded)",
        description: "More details about Bender.",
        link: " ",
      },
      {
        id: "3",
        label: "World Seaborne Trade (in Million Tons) by Types of Cargo, 2018-2021",
        description: "More details about Bender.",
        link: " ",
      },
    ],
  },
  {
    id: "2",
    label: "PhMarManData",
    data: [
      {
        id: "nested1",
        label: "Figure 37. No. of SIRB Issued 2018-2022",
        description: " .",
        link: " ",
      },
    ],
  },
  {
    id: "3",
    label: "PhDomOverMerFleet",
    data: [
      {
        id: "1",
        label: "Average GRT of Domestic Registered Vessels, by Ship Classification, 2018-2022",
        description: " ",
        link: " ",
      },
      {
        id: "2",
        label: "Average Age of Domestic Registered Vessels by Ship Classification, 2018-2022",
        description: " ",
        link: " ",
      },
    ],
  },
  {
    id: "4",
    label: "SupManDev",
    data: [
      {
        id: "1",
        label: "Regional Location of MHEIs recognized by CHED, to accept enrollees for BSMT and BSMarE Programs, AY 2022-2023",
        description: " ",
        link: " ",
      },
    ],
  },
  {
    id: "5",
    label: "FilWomenMar",
    data: [
      {
        id: "1",
        label: "Age Profile of Women Seafarer-Respondents",
        description: " .",
        link: " ",
      },
    ],
  },
  
];

interface AccordionLabelProps {
  label: string;
}

function AccordionLabel({ label  }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <div>
        <Text>{label}</Text>
      </div>
    </Group>
  );
}


export function Categories() {
  const renderNestedAccordion = (data: NestedItem[]) => {
    return data.map((nestedItem, index) => (
      <div key={nestedItem.id}>
        <a href="/home/resource">{index + 1}. {nestedItem.label}</a>
      </div>
    ));
  };

  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.id}>
      <Accordion.Control>
        <AccordionLabel label={item.label} />
      </Accordion.Control>
      <Accordion.Panel>
        {item.data.length > 0 && (
          <Accordion chevronPosition="right" variant="contained">
            {renderNestedAccordion(item.data)}
          </Accordion>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="container mx-auto px-20">
      <Accordion chevronPosition="right" variant="contained">
        {items}
      </Accordion>
    </div>
  );
}
