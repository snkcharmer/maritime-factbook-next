import { Title, Text, Group } from '@mantine/core';
import {
  IconDatabase,
  IconMagnetic,
  IconShip,
  IconTopologyStar3,
  IconWomanFilled,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const cardItems = [
  {
    title: 'World Seaborne Trade and Global Supply & Demand Statistics',
    category: 'WoSeaTradeGlobSupDem',
    icon: IconDatabase,
    href: '/category',
  },
  {
    title: 'Philippine Maritime Manpower Data',
    category: 'PhMarManData',
    description: 'Sample Description',
    icon: IconTopologyStar3,
    href: '/category',
  },
  {
    title: 'The Philippine Domestic and Overseas Merchant Fleet',
    category: 'PhDomOverMerFleet',
    icon: IconShip,
    href: '/category',
  },
  {
    title: 'Support to Manpower Development',
    category: 'SupManDev',
    icon: IconMagnetic,
    href: '/category',
  },
  {
    title: 'Filipino Women in Maritime',
    category: 'FilWomenMar',
    icon: IconWomanFilled,
    href: '/category',
  },
];

const CategoryList = () => {
  return (
    <>
      <Title>Categories</Title>
      <Group justify="center" grow>
        {cardItems.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: item.href,
              query: { title: item.title, category: item.category },
            }}
          >
            <div className="transition-colors duration-500 hover:bg-blue-500 hover:text-white cursor-pointer min-h-60 custom-card">
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
