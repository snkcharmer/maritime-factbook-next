'use client';
import { useFbCategory, useFbSubCategory } from '@/hooks';
import { IFbSubCategoryByCategoryResponse } from '@/types';
import { Group, Text, Accordion, Stack, Skeleton, Button } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { IconLink } from '@tabler/icons-react';
import { useEffect } from 'react';

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
  const { fetchFbCategories, data: categories, loading } = useFbCategory();
  const {
    fetchFbSubCategoriesByCategoryId,
    data: subCategories,
    loading: fetchingSubCategories,
    resetData,
  } = useFbSubCategory<IFbSubCategoryByCategoryResponse>();
  const handleFetchCategories = async () => {
    await fetchFbCategories();
  };

  const fetchSubCategories = async (id: string) => {
    console.log('id', id);
    resetData();
    await fetchFbSubCategoriesByCategoryId(id);
  };

  useEffect(() => {
    if (!loading) {
      handleFetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNestedAccordion = () => {
    console.log(
      'IFbSubCategoryByCategoryResponse',
      subCategories,
      fetchingSubCategories
    );
    if (fetchingSubCategories) return <Skeleton height={50} radius="sm" />;
    if (!subCategories) return <>No data here ...</>;
    return subCategories?.data.map((item, idx) => (
      <Button
        variant="default"
        leftSection={<IconLink size={16} />}
        key={idx}
        className="truncate max-w-auto text-xs"
      >
        {item.name}
      </Button>
    ));
  };

  const items = categories?.data.map((item) => (
    <Accordion.Item value={String(item.id)} key={item.id}>
      <Accordion.Control>
        <AccordionLabel label={item.name} />
      </Accordion.Control>
      <Accordion.Panel>
        <div className={classes.scrollable}>
          {item && (
            <Accordion
              chevronPosition="right"
              variant="contained"
              className="text-sm"
            >
              <Stack gap={6}>{renderNestedAccordion()}</Stack>
            </Accordion>
          )}
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="container mx-auto">
      <Skeleton visible={loading}>
        <Accordion
          chevronPosition="right"
          variant="contained"
          defaultValue={categories?.data[0].id}
          onChange={(val) => fetchSubCategories(String(val))}
        >
          {items}
        </Accordion>
      </Skeleton>
    </div>
  );
}

const useStyles = createStyles(() => ({
  scrollable: {
    maxHeight: 350,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));
