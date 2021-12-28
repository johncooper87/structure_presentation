import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
  username: yup.string().nullable().required(),
  lastname: yup.string().nullable().required(),
  roleId: yup.string().nullable().required(),
  email: yup.string().nullable().required(),
  phone: yup.string().nullable().required(),
});
