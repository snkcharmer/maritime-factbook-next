import { FakeSkeleton, NoData } from "@/components/reusable";
import { useFbTableAssignee } from "@/hooks";
import { IFbTableAssignee } from "@/types";
import { Button, Drawer, Stack } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import React, { useEffect } from "react";

interface IAssigneesDrawerProps {
  fbTableId: string;
  opened: boolean;
  onClose: () => void;
}

const AssigneesDrawer = (props: IAssigneesDrawerProps) => {
  const { fbTableId, opened, onClose } = props;
  const { data, loading, fetchFbTableAssigneeByFbTableId } =
    useFbTableAssignee<IFbTableAssignee[]>();

  useEffect(() => {
    if (fbTableId && opened) {
      fetchFbTableAssigneeByFbTableId(fbTableId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableId, opened]);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Assignees"
      position="right"
    >
      <Stack align="stretch" justify="flex-start" gap="xs">
        {loading ? (
          <FakeSkeleton rows={5} />
        ) : data && data.length ? (
          data.map((val, idx) => {
            return (
              <Button
                component="a"
                //   href={createPath({
                //     path: ADMIN_ROUTES.resourceCategoriesTable,
                //     dynamicParams: {
                //       fbCategorySlug: String(val.fbCategory?.slug),
                //       fbTableSlug: val.slug,
                //     },
                //   })}
                href="/"
                variant="default"
                leftSection={<IconLink size={16} />}
                key={idx}
                className="truncate text-xs inline-flex"
              >
                {val.user?.name}
              </Button>
            );
          })
        ) : (
          <NoData showButton={false} />
        )}
      </Stack>
    </Drawer>
  );
};

export default AssigneesDrawer;
