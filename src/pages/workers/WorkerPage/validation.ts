import * as yup from 'yup';

export const workerValidationSchema = yup.object().shape({
  lastname: yup.string().nullable().required(),
  firstname: yup.string().nullable().required(),
  birthdate: yup.date().nullable().required(),
  gender: yup.string().nullable().required(),
  enterpriseId: yup.string().nullable().required(),
  positionId: yup.string().nullable().required(),
});
