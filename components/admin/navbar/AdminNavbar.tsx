import { IconGauge, IconTable } from '@tabler/icons-react';
import { Code, Group, ScrollArea, Text } from '@mantine/core';
import { LinksGroup } from './AdminLinksGroup';
import { createStyles } from '@mantine/emotion';
import { UserButton } from './UserButton';
import Image from 'next/image';
import { IFbSubCategoryByCategoryResponse } from '@/types';
import { useEffect } from 'react';
import { useFbCategory } from '@/hooks';

// const arrLinks = [
//   { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
//   { label: 'Table Maker', icon: IconTable, link: '/dashboard/table-maker' },
//   // { label: 'Tables', icon: IconTable, link: '/dashboard/tables' },
//   {
//     label: 'Resource Categories',
//     icon: IconTable,
//     initiallyOpened: true,
//     links: [
//       { label: 'Overview', link: '/link1' },
//       { label: 'Forecasts', link: '/link2' },
//       { label: 'Outlook', link: '/link3' },
//       { label: 'Real time', link: '/link4' },
//     ],
//   },
// ];

export function AdminNavbar() {
  const { classes } = useStyles();

  const { data: categories, fetchFbCategories } =
    useFbCategory<IFbSubCategoryByCategoryResponse>();

  const categoryLinks =
    categories?.data.map((category) => ({
      label: category.name,
      link: `/dashboard/resource-categories/${category.id}`,
    })) || [];

  const arrLinks = [
    { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
    { label: 'Table Maker', icon: IconTable, link: '/dashboard/table-maker' },
    {
      label: 'Resource Categories',
      icon: IconTable,
      initiallyOpened: true,
      links: categoryLinks, // Use the dynamic category links here
    },
  ];

  const links = arrLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group>
          <Image
            src="/logo.png"
            alt="Maritime Manpower Factbook"
            width={43}
            height={43}
          />
          <Text>Dashboard</Text>
          <Code fw={700}>Beta</Code>
        </Group>
      </div>

      <ScrollArea scrollbars="y" className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.white,
    height: '800px',
    width: '300px',
    padding: theme.spacing.md,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.colors.gray[3]}`,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.black,
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },

  links: {
    flex: 1,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `1px solid ${theme.colors.gray[3]}`,
  },
}));
