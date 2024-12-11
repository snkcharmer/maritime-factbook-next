'use client';
import { ROUTES } from '@/constants';
import { useFbCategory } from '@/hooks';
import { TFbCategoryResponse } from '@/types';
import { createPath } from '@/utils/route';
import { Title, Text, Group } from '@mantine/core';
import {
  IconDatabase,
  IconTopologyStar3,
  IconShip,
  IconMagnetic,
  IconWomanFilled,
  Icon,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ICardItem {
  title: string;
  icon: Icon;
  href: string;
  slug: string;
}

const staticCardItems = [
  {
    icon: IconDatabase,
  },
  {
    icon: IconTopologyStar3,
  },
  {
    icon: IconShip,
  },
  {
    icon: IconMagnetic,
  },
  {
    icon: IconWomanFilled,
  },
];

const CategoryList = () => {
  const params = useParams();
  const { data, fetchFbCategories } = useFbCategory<TFbCategoryResponse>();
  const [cardItems, setCardItems] = useState<ICardItem[]>([]);

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.data) {
      const mergedItems = data.data.map((item, index) => ({
        title: item.name,
        icon: staticCardItems[index]?.icon || IconDatabase, // Use corresponding static icon or default
        href: createPath({
          path: ROUTES.resourceCategoriesHome,
          dynamicParams: { fbCategorySlug: item.slug },
        }),
        slug: item.slug,
      }));
      setCardItems(mergedItems);
    }
  }, [data]);

  return (
    <>
      <Title>Categories</Title>
      <Group justify="center" grow>
        {cardItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`transition-colors duration-500 hover:bg-blue-500 hover:text-white cursor-pointer min-h-60 custom-card ${
                params.fbCategorySlug === item.slug ? 'active' : ''
              }`}
            >
              <div className="flex m-4">
                <item.icon size={48} />
              </div>
              <Text fw={500}>{item.title}</Text>
            </div>
          </Link>
        ))}
      </Group>
    </>
  );
};

export default CategoryList;
