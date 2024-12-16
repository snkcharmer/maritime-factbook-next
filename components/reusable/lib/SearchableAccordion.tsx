'use client';

import React, { useState } from 'react';
import { Accordion, TextInput, Group, Badge, Box, Stack } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export interface IAccordionData {
  category: string;
  items: { title: string; date: string }[];
}

interface ISearchableAccordionProps {
  data: IAccordionData[];
}

export default function SearchableAccordion({
  data,
}: ISearchableAccordionProps) {
  const [search, setSearch] = useState<string>('');

  // Filter the data based on search input
  const filteredData = data
    .map((section) => {
      // Check if category matches search
      const categoryMatches = section.category
        .toLowerCase()
        .includes(search.toLowerCase());

      // Filter items based on title
      const filteredItems = section.items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

      // Return the section if either category matches OR there are matching items
      if (categoryMatches || filteredItems.length > 0) {
        return { ...section, items: filteredItems };
      }
      return null;
    })
    .filter((section) => section !== null); // Remove null sections

  return (
    <Stack>
      <TextInput
        placeholder="Search..."
        leftSection={<IconSearch size={18} />}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        mb="md"
      />

      <Accordion variant="contained" defaultValue="0">
        {filteredData.map((section, i) =>
          section!.items.length > 0 || section!.category ? (
            <Accordion.Item value={`${i}`} key={i}>
              <Accordion.Control>
                <Group justify="space-between">
                  <Box>{section!.category}</Box>
                  <Badge size="sm" color="blue">
                    {section!.items.length}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {section!.items.map((item, index) => (
                  <Group
                    key={index}
                    justify="space-between"
                    py={8}
                    sx={{
                      borderBottom: '1px solid #e9ecef',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box>{item.title}</Box>
                    <Badge>{item.date}</Badge>
                  </Group>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          ) : null
        )}
      </Accordion>
    </Stack>
  );
}
