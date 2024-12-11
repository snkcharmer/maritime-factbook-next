'use client';
import React, { useEffect } from 'react';
import {
  Modal,
  TextInput,
  Button,
  Select,
  Group,
  PasswordInput,
} from '@mantine/core';
import { useUser, useUserCategory } from '@/hooks'; // Assuming you already have a hook for user categories
import { IUser, TUserCategoryResponse } from '@/types';
import { UserRoleEnum } from '@/context/enum';
import { Formik, Form } from 'formik';
import { IconAt } from '@tabler/icons-react';
import { createUserSchema } from '@/validations';
import { Toastify } from '@/components/reusable';

interface UserModalProps {
  opened: boolean;
  onClose: () => void;
  onAddUser: () => void;
}

// const generatePassword = (length: number = 8) => {
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
//   let password = '';
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     password += characters[randomIndex];
//   }
//   return password;
// };

const UserModal = ({ opened, onClose, onAddUser }: UserModalProps) => {
  //   const [isPasswordGenerated, setIsPasswordGenerated] =
  //     useState<boolean>(false);
  const { data: userCategories, fetchUserCategories } =
    useUserCategory<TUserCategoryResponse>();
  const { createUser } = useUser<IUser>();
  //   const handleGeneratePassword = () => {
  //     const generated = generatePassword(8);
  //     setIsPasswordGenerated(true);
  //     return generated;
  //   };

  useEffect(() => {
    fetchUserCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Add New User">
      <Formik
        initialValues={{
          name: '',
          email: '',
          role: UserRoleEnum.DATA_PROVIDER,
          categoryId: '',
          //   password: isPasswordGenerated ? handleGeneratePassword() : '',
          password: '',
        }}
        validationSchema={createUserSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createUser(values);
            Toastify({
              message: 'User category added successfully',
              type: 'success',
            });
            onAddUser();
            resetForm();
            onClose();
          } catch (error) {
            Toastify({ message: JSON.stringify(error), type: 'warning' });
          }
        }}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <TextInput
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && errors.name ? errors.name : undefined}
              placeholder="Enter user's name"
            />
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconAt size={14} />}
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && errors.email ? errors.email : undefined}
              placeholder="Enter user's name"
            />

            <Select
              label="Role"
              name="role"
              value={values.role}
              onChange={(value) => setFieldValue('role', value)}
              data={[
                { value: UserRoleEnum.DATA_PROVIDER, label: 'User' },
                { value: UserRoleEnum.ADMIN, label: 'Admin' },
              ]}
              error={touched.role && errors.role ? errors.role : undefined}
            />

            <Select
              label="User Category"
              name="categoryId"
              value={values.categoryId}
              onChange={(value) => setFieldValue('categoryId', value)}
              data={
                (userCategories
                  ? userCategories?.data
                  : [{ value: '', label: '' }]
                ).map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                })) || []
              }
              error={
                touched.categoryId && errors.categoryId
                  ? errors.categoryId
                  : undefined
              }
            />

            <PasswordInput
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              placeholder="Enter password"
            />

            {/* <Group justify="space-between" mt="md">
              <Button
                variant="outline"
                onClick={() =>
                  setFieldValue('password', handleGeneratePassword())
                }
              >
                Generate Password
              </Button>
              <Text color="gray" size="sm">
                Or enter manually
              </Text>
            </Group> */}

            <Group justify="space-between" mt="md">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                color="blue"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Submitting' : 'Add User'}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserModal;
