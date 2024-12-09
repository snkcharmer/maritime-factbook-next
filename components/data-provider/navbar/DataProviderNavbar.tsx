import { IconGauge, IconLogs, IconTable } from '@tabler/icons-react';
import { Code, Group, ScrollArea, Text } from '@mantine/core';
import { LinksGroup } from './DataProviderLinksGroup';
import { createStyles } from '@mantine/emotion';
import Image from 'next/image';
import { ROUTES } from '@/constants';
import { UserButton } from '@/components/reusable';

export function DataProviderNavbar() {
  const { classes } = useStyles();

  const arrLinks = [
    { label: 'Dashboard', icon: IconGauge, link: ROUTES.dashboard },
    { label: 'Assigned Tables', icon: IconTable, link: ROUTES.assignedTables },
    {
      label: 'Activity Log',
      icon: IconLogs,
      link: ROUTES.activityLog,
    },
  ];

  const links = arrLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

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
