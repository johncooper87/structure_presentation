import React from 'react';
import { Box, Grid, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import { TextField, Field, Autocomplete } from 'components';
import DeleteContactIcon from '@material-ui/icons/Clear';
import { useFieldValues } from 'hooks';

const useStyles = makeStyles(() => ({
  root: {
    width: '300px',
  },
}));

const informingTypes = [
  {
    type: 'email',
    label: 'E-mail',
  },
  {
    type: 'phone',
    label: 'Телефон',
  },
];

// временное решение до тех пор пока не сможем в информирование добавить несколько телефонов или email'ов
const getOptionList = (values, index) => {
  if (values.length === 0) return informingTypes;
  if (values.length === 1) return informingTypes;
  if (values.length === 2) {
    if (index === 0 && values[1].informingType === 'email') return [informingTypes[1]];
    if (index === 0 && values[1].informingType === 'phone') return [informingTypes[0]];
    if (index === 1 && values[0].informingType === 'email') return [informingTypes[1]];
    if (index === 1 && values[0].informingType === 'phone') return [informingTypes[0]];
  }
  return informingTypes;
};

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
const required = (value) => (value ? undefined : 'Обязательное поле');
const email = value => {
  const regexpEmail = /\S+@\S+\.\S+/;
  return regexpEmail.test(value) ? undefined : 'Введите корректный email';
};
const phone = value => {
  const regexpPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return regexpPhone.test(value) ? undefined : 'Введите корректный телефон';
};

const UserInformingField = ({ index, onDelete, readOnly }) => {
  const styles = useStyles();
  const values = useFieldValues('informingContacts');
  return (
    <Box padding="10px">
      <Field name={`informingContacts[${index}]`}>
        <Grid container direction="row" spacing={2}>
          <Grid item>

            <Autocomplete
              classes={styles}
              validate={required}
              name="informingType"
              label="Тип информирования"
              // @ts-ignore
              getOptionValue={({ type }) => type}
              // @ts-ignore
              getOptionLabel={({ label }) => label}
              options={getOptionList(values, index)}
              disabled={readOnly}
            />
          </Grid>
          {values[index].informingType === 'phone' &&
            <Grid item>
              <TextField
                classes={styles}
                validate={composeValidators(required, phone)}
                fullWidth
                name="phone"
                label="Телефон"
              />
            </Grid>}
          {values[index].informingType === 'email' &&
            <Grid item>
              <TextField
                classes={styles}
                validate={composeValidators(required, email)}
                fullWidth
                name="email"
                label="Эл. почта"
              />
            </Grid>}
          <Grid item>
            {!readOnly && (
            <Tooltip title="Удалить метод информирования">
              <span>
                <IconButton onClick={onDelete}>
                  <DeleteContactIcon />
                </IconButton>
              </span>
            </Tooltip>
                )}
          </Grid>
        </Grid>
      </Field>
    </Box>
  );
};

export default UserInformingField;
