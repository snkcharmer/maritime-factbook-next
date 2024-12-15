import { IFbTableAssignee } from "@/types";
import { createPath, ROUTES } from "@/utils/route";
import {
  ActionIcon,
  Card,
  Group,
  Menu,
  rem,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconDots, IconEdit } from "@tabler/icons-react";

interface IAssignedTablesProps {
  data: IFbTableAssignee[];
}

const AssignedTables = (props: IAssignedTablesProps) => {
  const { data = [] } = props;

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 10, sm: "xl" }}
      verticalSpacing={{ base: "md", sm: "xl" }}
    >
      {data?.map((row, idx) => {
        return (
          <Card key={idx} shadow="sm" radius="md" withBorder pt={0}>
            <Group justify="space-between" py={4}>
              <Text fw={500} size="sm">
                Assigned to you
              </Text>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    component="a"
                    href={createPath({
                      path: ROUTES.assignedTablesView,
                      dynamicParams: {
                        fbTableSlug: row.id as string,
                      },
                    })}
                    leftSection={
                      <IconEdit style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Edit
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Card.Section withBorder inheritPadding py="xs">
              <Text size="sm" mb="md">
                <Text span inherit>
                  {row.fbTable?.name}
                </Text>
              </Text>
              <Card.Section mt="sm"></Card.Section>
            </Card.Section>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
export default AssignedTables;
