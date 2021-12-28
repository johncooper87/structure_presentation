import { Box, Grid, Paper } from '@material-ui/core';
import * as yup from 'yup';

import { TextField, Switch, Field } from 'components';
import { useFieldValue } from 'components/Form';
import { useFormPageMode } from 'hooks';

const validateSigurCredentials = yup.object({
  address: yup.string().required(),
  port: yup.number().required(),
  login: yup.string().required(),
  password: yup
    .string()
    .test({
      message: 'Необходимо указать значение',
      test: (value, { parent }) => {
        if (parent.id != null || value?.length > 0) return true;
        return false;
      },
    }),
  databaseLog: yup.string().required(),
  databaseMain: yup.string().required(),
});

const ipAddressRegExp =
  /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))/g;
const validateIp = (value: string) => {
  if (ipAddressRegExp.test(value)) return undefined;
  return 'Невалидный IP адрес';
};

function SigurCredentials() {
  const hasTurnstiles = useFieldValue('hasTurnstiles');
  const formMode = useFormPageMode();

  return (
    <Paper>
      <Box padding="12px">

        <Box display="flex" justifyContent="flex-end">
          <Switch name="hasTurnstiles" label="Есть турникеты" />
        </Box>

        {hasTurnstiles && (
          <Field name="sigurCredentials" validate={validateSigurCredentials}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                Реквизиты для подключения к БД
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="address" label="Адрес" validate={validateIp} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth type="number" name="port" label="Порт" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="login" label="Логин" />
              </Grid>
              {formMode !== 'read' && (
                <Grid item xs={12}>
                  <TextField
                    required={formMode !== 'edit'}
                    fullWidth
                    name="password"
                    label="Пароль"
                    helperText={formMode === 'edit' ? 'Оставьте поле пустым чтобы пароль не изменился' : null}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField required fullWidth name="databaseMain" label="Имя базы где лежат сотрудники и тд" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="databaseLog" label="Имя базы где лежат логи" />
              </Grid>

            </Grid>
          </Field>
        )}

      </Box>
    </Paper>
  );
}

export default SigurCredentials;
