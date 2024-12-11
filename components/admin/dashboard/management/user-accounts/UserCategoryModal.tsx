'use client';
import { Toastify } from '@/components/reusable';
import { useUserCategory } from '@/hooks';
import { userCategorySchema } from '@/validations';
import { Modal, Button, TextInput } from '@mantine/core';
import { Formik, Form } from 'formik';

interface IUserCategoryModalProps {
  opened: boolean;
  onClose: () => void;
}

const UserCategoryModal = (props: IUserCategoryModalProps) => {
  const { opened, onClose } = props;
  const { createUserCategory } = useUserCategory();

  return (
    <Modal opened={opened} onClose={onClose} title="Add User Category" centered>
      <Formik
        initialValues={{ name: '', description: '' }}
        validationSchema={userCategorySchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            console.log(values);
            await createUserCategory(values);
            Toastify({
              message: 'User category added successfully',
              type: 'success',
            });
            resetForm();
            onClose();
          } catch (error) {
            Toastify({ message: JSON.stringify(error), type: 'warning' });
          }
        }}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form>
            <TextInput
              label="Category Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
            <TextInput
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && errors.description}
            />
            <Button
              type="submit"
              fullWidth
              mt="md"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserCategoryModal;
