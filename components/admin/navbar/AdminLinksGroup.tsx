import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { createStyles } from '@mantine/emotion';

interface AdminLinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string; // For single link
  links?: { label: string; link: string }[]; // For grouped links
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: AdminLinksGroupProps) {
  const { classes } = useStyles();
  const isGrouped = Array.isArray(links) && links.length > 0;
  const [opened, setOpened] = useState(initiallyOpened || false);

  const groupedItems = (links || []).map((item) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
    >
      {item.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => (isGrouped ? setOpened((o) => !o) : null)}
        className={classes.control}
        component={link ? 'a' : 'div'}
        href={link || undefined}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {isGrouped && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {isGrouped ? <Collapse in={opened}>{groupedItems}</Collapse> : null}
    </>
  );
}

export function AdminLinksGroup() {
  const groupedMock = {
    label: 'Releases',
    icon: IconChevronRight,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  };

  const singleMock = {
    label: 'Dashboard',
    icon: IconChevronRight,
    link: '/dashboard',
  };

  return (
    <Box mih={220} p="md">
      <LinksGroup {...groupedMock} />
      <LinksGroup {...singleMock} />
    </Box>
  );
}

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colors[theme.primaryColor][7],
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: theme.spacing.md,
    marginLeft: theme.spacing.xl,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colors.gray[3]}`,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));
