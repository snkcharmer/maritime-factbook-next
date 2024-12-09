import { FakeSkeleton } from '@/components/reusable';
import { useFbTableAssignee } from '@/hooks';
import { TFbTableAssigneeResponse } from '@/types';
import { Button, Drawer, Stack } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import React, { useEffect } from 'react';

interface IAssigneesDrawerProps {
  fbTableId: string;
  opened: boolean;
  onClose: () => void;
}

const AssigneesDrawer = (props: IAssigneesDrawerProps) => {
  const { fbTableId, opened, onClose } = props;
  const { fetchFbTableAssignees, data, loading } =
    useFbTableAssignee<TFbTableAssigneeResponse>();

  useEffect(() => {
    if (fbTableId) {
      fetchFbTableAssignees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableId]);

  console.log('test', loading, data);

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
        ) : (
          data?.data.map((val, idx) => {
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
        )}
      </Stack>
    </Drawer>
  );
};

export default AssigneesDrawer;
