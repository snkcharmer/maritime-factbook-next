import { IconGauge, IconTable } from '@tabler/icons-react';
import { Group, ScrollArea, Text } from '@mantine/core';
import { LinksGroup } from './AdminLinksGroup';
import { createStyles } from '@mantine/emotion';
import { UserButton } from './UserButton';
import Image from 'next/image';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  { label: 'Table Maker', icon: IconTable, link: '/dashboard/table-maker' },
  { label: 'Tables', icon: IconTable, link: '/dashboard/tables' },
  // {
  //   label: 'Market news',
  //   icon: IconNotes,
  //   initiallyOpened: true,
  //   links: [
  //     { label: 'Overview', link: '/link1' },
  //     { label: 'Forecasts', link: '/link2' },
  //     { label: 'Outlook', link: '/link3' },
  //     { label: 'Real time', link: '/link4' },
  //   ],
  // },
  // {
  //   label: 'Releases',
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: 'Upcoming releases', link: '/' },
  //     { label: 'Previous releases', link: '/' },
  //     { label: 'Releases schedule', link: '/' },
  //   ],
  // },
  // { label: 'Analytics', icon: IconPresentationAnalytics },
  // { label: 'Contracts', icon: IconFileAnalytics },
  // { label: 'Settings', icon: IconAdjustments },
  // {
  //   label: 'Security',
  //   icon: IconLock,
  //   links: [
  //     { label: 'Enable 2FA', link: '/' },
  //     { label: 'Change password', link: '/' },
  //     { label: 'Recovery codes', link: '/' },
  //   ],
  // },
];

export function AdminNavbar() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group>
          <Image
            src="/logo.png"
            alt="Maritime Manpower Factbook"
            width={32}
            height={32}
          />
          <Text>Maritime Manpower Factbook</Text>
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
