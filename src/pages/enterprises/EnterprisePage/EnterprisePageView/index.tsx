import { Grid, Box, Button, Typography } from '@material-ui/core';
import AddContactIcon from '@material-ui/icons/PersonAdd';
import { TextField, Switch } from 'components';
import { useForm, FieldArray } from 'components/Form';
import useDebouncedHandler from 'hooks/useDebouncedHandler';
import { http } from 'utils';
import ContactField from './ContactField';

const TINMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

interface TINInfo {
  name: string;
  ogrn: string;
  addr: string;
}

const EnterprisePageView = () => {
  const form = useForm();

  const retrieveEnterpriseInfoByTIN = useDebouncedHandler(async (value: string) => {
    const { result }: APIResponse<TINInfo> = await http.get(
      '/api/kbi/enterprises/inninfo?inn=' + value
    );
    const { name, ogrn, addr } = result || {};
    form.batch(() => {
      form.change('name', name);
      form.change('PSRN', ogrn);
      form.change('address', addr);
    });
    return result === undefined ? 'Указанного ИНН не существует' : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 1000);

  const validateTIN = useCallback(async (value: string) => {
    if (!/\d{10}/.test(value)) return 'Неверное значение';
    const error = await retrieveEnterpriseInfoByTIN(value);
    return error;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box overflow="hidden" pl={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12} container justifyContent="space-between" spacing={2} wrap="nowrap">
            <Grid item>
              <TextField required name="TIN" label="ИНН" maskedInputProps={{ mask: TINMask }} validate={validateTIN} />
            </Grid>
            <Grid item>
              <Switch name="archive" label="Архивная" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth readOnly name="name" label="Название" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth readOnly name="PSRN" label="ОГРН" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline readOnly name="address" label="Адрес" />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} container direction="column" spacing={2}>
          <Grid item>
            <Typography style={{ fontWeight: 'bold' }}>Контакты</Typography>
          </Grid>
          <FieldArray name="contacts">
            {({ map, push, remove, length, readOnly }) => (
              <>
                {map(index => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid key={index} item>
                    <ContactField index={index} readOnly={readOnly} onDelete={() => remove(index)} />
                  </Grid>
                )) || null}
                <Grid item>
                  {!readOnly && length < 2 && (
                    <Button variant="outlined" onClick={() => push({})}>
                      <AddContactIcon className="leading-icon" />
                      Добавить контакт
                    </Button>
                  )}
                </Grid>
              </>
            )}
          </FieldArray>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnterprisePageView;
