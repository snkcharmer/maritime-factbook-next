import { IconFolderCog, IconGauge, IconTable } from '@tabler/icons-react';
import { Code, Group, ScrollArea, Text } from '@mantine/core';
import { LinksGroup } from './AdminLinksGroup';
import { createStyles } from '@mantine/emotion';
import Image from 'next/image';
import { TFbCategoryResponse } from '@/types';
import { useEffect } from 'react';
import { useFbCategory } from '@/hooks';
import { ADMIN_ROUTES, ROUTES } from '@/constants';
import { UserButton } from '@/components/reusable';
import { createPath } from '@/utils/route';

export function AdminNavbar() {
  const { classes } = useStyles();

  const { data: categories, fetchFbCategories } =
    useFbCategory<TFbCategoryResponse>();

  const categoryLinks =
    categories?.data.map((category) => ({
      label: category.name,
      link: createPath({
        path: ADMIN_ROUTES.resourceCategories,
        dynamicParams: { fbCategorySlug: category.slug },
      }),
    })) || [];

  const managementLinks = [
    {
      label: 'Resource Categories',
      link: ADMIN_ROUTES.resourceCategoriesManagement,
    },
    {
      label: 'User Accounts',
      link: ADMIN_ROUTES.userAccountsManagement,
    },
  ];

  const arrLinks = [
    { label: 'Dashboard', icon: IconGauge, link: ROUTES.dashboard },
    {
      label: 'Table Maker',
      icon: IconTable,
      link: ADMIN_ROUTES.dashboardTableMaker,
    },
    {
      label: 'Resource Categories',
      icon: IconTable,
      // initiallyOpened: true,
      links: categoryLinks, // Use the dynamic category links here
    },
    {
      label: 'Management',
      icon: IconFolderCog,
      links: managementLinks,
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
