import * as yup from 'yup';

export const fbTableAssigneeSchema = yup.object().shape({
  users: yup
    .array()
    .of(yup.string().required('Each user must be a valid string'))
    .min(1, 'At least one user must be selected')
    .required('Select at least one user'),
});
