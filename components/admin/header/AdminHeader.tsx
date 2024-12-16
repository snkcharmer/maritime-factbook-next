import { useState } from "react";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import cx from "clsx";
import {
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { useUser } from "@/hooks";

interface IAdminHeaderProps {
  opened: boolean;
  toggle: () => void;
}

export function AdminHeader({ opened, toggle }: IAdminHeaderProps) {
  const { logout, user } = useUser();
  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md" maw="100%">
        <Group justify="end">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar alt={user?.name} radius="xl" size={30} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user?.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Label>Settings</Menu.Label> */}
              {/* <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}
              >
                Change account
              </Menu.Item> */}
              <Menu.Item
                leftSection={<IconLogout size={16} stroke={1.5} />}
                onClick={() => logout()}
              >
                Logout
              </Menu.Item>

              {/* <Menu.Divider /> */}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors.gray[0],
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.white,
    },

    [`@media (max-width: ${theme.breakpoints.xs})`]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.white,
  },

  tabsList: {
    "&::before": {
      display: "none",
    },
  },

  tab: {
    fontWeight: 500,
    height: "38px",
    backgroundColor: "transparent",
    position: "relative",
    bottom: "-1px",

    "&::before, &::after": {
      backgroundColor: theme.colors.gray[2],
      content: '""',
    },

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor: theme.white,
      borderColor: theme.colors.gray[2],
      borderBottomColor: "transparent",
    },
  },
}));
