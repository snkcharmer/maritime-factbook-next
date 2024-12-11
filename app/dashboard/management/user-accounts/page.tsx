'use client';
import { PageContainer } from '@/components/reusable';
import { Table, Button, Text, Group } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks';
import UserCategoryModal from '@/components/admin/dashboard/management/user-accounts/UserCategoryModal';
import UserModal from '@/components/admin/dashboard/management/user-accounts/UserModal'; // Assuming UserModal is the user addition modal
import { IUser, TUserResponse } from '@/types';
import { formatText } from '@/utils/string';
import { formatDate } from '@/utils/date';
import { UserRoleEnum } from '@/context/enum';

const UserAccountsManagement = () => {
  const [openedUserModal, setOpenedUserModal] = useState<boolean>(false);
  const [openedCategoryModal, setOpenedCategoryModal] =
    useState<boolean>(false);
  const { data, fetchAllUsers } = useUser<TUserResponse>();

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = data?.data.map((user: IUser) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{formatText(user.role)}</Table.Td>
      <Table.Td>
        {user.role === UserRoleEnum.ADMIN ? (
          <Text fs="italic">N/A</Text>
        ) : (
          user.category?.name
        )}
      </Table.Td>
      <Table.Td>{formatDate(user.createdAt!)}</Table.Td>
    </Table.Tr>
  ));

  const handleAddUser = () => fetchAllUsers();

  return (
    <PageContainer title="User Accounts Management">
      <Group justify="space-between">
        <Button onClick={() => setOpenedUserModal(true)} mb="md">
          Add User
        </Button>
        <Button
          variant="outline"
          onClick={() => setOpenedCategoryModal(true)}
          mb="md"
        >
          Add User Category
        </Button>
      </Group>
      <Table.ScrollContainer minWidth={500} type="native">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>User Category</Table.Th>
              <Table.Th>Date Registered</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows?.length ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4} align="center">
                  No data yet ...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {/* Modals */}
      <UserCategoryModal
        opened={openedCategoryModal}
        onClose={() => setOpenedCategoryModal(false)}
      />
      <UserModal
        opened={openedUserModal}
        onClose={() => setOpenedUserModal(false)}
        onAddUser={handleAddUser}
      />
    </PageContainer>
  );
};

export default UserAccountsManagement;
