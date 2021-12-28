import * as yup from 'yup';

export const deviceValidationSchema = yup.object().shape({
  type: yup.string().nullable().required(),
  serialNumber: yup
    .string()
    .nullable()
    .required()
    .when('type', (type: DeviceType, schema: yup.StringSchema) => {
      switch (type) {
        case 'watch':
          return schema.length(15);
        case 'card':
          return schema.length(16);
      }
    }),
});
