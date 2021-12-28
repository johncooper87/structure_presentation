import * as yup from 'yup';

const validateSite = yup.object({
  name: yup.string().required(),
  enterpriseId: yup.string().required(),
});

export default validateSite;
