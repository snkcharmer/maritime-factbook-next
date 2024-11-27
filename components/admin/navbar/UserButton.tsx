import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { useUser } from '@/hooks';

export function UserButton() {
  const { user } = useUser();
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.email}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.id}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.black,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));
