"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  TextInput,
  Group,
  Badge,
  Box,
  Stack,
  Text,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";

export interface IAccordionData {
  category: string;
  items: { title: string; date: string; href?: string }[];
}

interface ISearchableAccordionProps {
  data: IAccordionData[];
}

export default function SearchableAccordion({
  data,
}: ISearchableAccordionProps) {
  const [search, setSearch] = useState<string>("");

  const filteredData = data
    .map((section) => {
      const categoryMatches = section.category
        .toLowerCase()
        .includes(search.toLowerCase());

      const filteredItems = section.items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

      if (categoryMatches || filteredItems.length > 0) {
        return { ...section, items: filteredItems };
      }
      return null;
    })
    .filter((section) => section !== null);

  return (
    <Stack>
      <TextInput
        placeholder="Search..."
        leftSection={<IconSearch size={18} />}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        mb="md"
      />

      <Accordion
        variant="contained"
        //   defaultValue="0"
        chevronPosition="left"
        chevron={<IconPlus />}
        bg="white"
      >
        {filteredData.map((section, i) =>
          section!.items.length > 0 || section!.category ? (
            <Accordion.Item value={`${i}`} key={i}>
              <Accordion.Control>
                <Group justify="space-between">
                  <Box>
                    <Text size="xl">{section!.category}</Text>
                  </Box>
                  <Badge size="sm" color="blue">
                    {section!.items.length}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {section!.items.map((item, index) => (
                  <Stack
                    key={index}
                    py={16}
                    sx={{
                      borderBottom: "1px solid #e9ecef",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    {item.href ? (
                      <Link href={item.href} className="cursor-pointer">
                        <Group
                          justify="space-between"
                          style={{ width: "100%" }}
                        >
                          <Box w="80%">
                            <Text size="xl">{item.title}</Text>
                          </Box>
                          <Badge>{item.date}</Badge>
                        </Group>
                      </Link>
                    ) : (
                      <>
                        <Box>{item.title}</Box>
                        <Badge>{item.date}</Badge>
                      </>
                    )}
                  </Stack>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          ) : null
        )}
      </Accordion>
    </Stack>
  );
}
