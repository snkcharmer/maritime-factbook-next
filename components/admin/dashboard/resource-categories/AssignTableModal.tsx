'use client';
import { Toastify } from '@/components/reusable';
import { useFbTableAssignee } from '@/hooks';
import { IUser } from '@/types';
import { pluralize } from '@/utils/string';
import { fbTableAssigneeSchema } from '@/validations';
import { Modal, Button, MultiSelect } from '@mantine/core';
import { Formik, Form } from 'formik';

interface IAssignTableModalProps {
  fbTableId: string;
  opened: boolean;
  onClose: () => void;
  users: IUser[];
}

const AssignTableModal = (prop: IAssignTableModalProps) => {
  const { fbTableId, opened, onClose, users } = prop;
  const { assignTableToUser } = useFbTableAssignee();

  const userOptions =
    users.map(({ name, id }) => ({ label: name, value: id as string })) || [];

  return (
    <Modal opened={opened} onClose={onClose} title="Assign Table" centered>
      <Formik
        enableReinitialize={true}
        initialValues={{ users: [] }}
        validationSchema={fbTableAssigneeSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await assignTableToUser({ fbTableId, userId: values.users });
            Toastify({
              message: `Table assigned to ${pluralize(
                values.users.length,
                'user'
              )}`,
              type: 'success',
            });
            resetForm();
            onClose();
          } catch (error) {
            Toastify({ message: JSON.stringify(error), type: 'warning' });
          }
        }}
      >
        {({ isSubmitting, setFieldValue, errors, touched, values }) => (
          <Form>
            <MultiSelect
              label="Select user"
              name="users"
              data={userOptions}
              value={values.users}
              onChange={(value) => setFieldValue('users', value)}
              hidePickedOptions
              multiple
              searchable
              error={touched.users && errors.users}
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

export default AssignTableModal;
