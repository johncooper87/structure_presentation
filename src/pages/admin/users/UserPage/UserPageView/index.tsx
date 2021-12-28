import { Box, Grid } from '@material-ui/core';
import { AvatarInput, DatePicker, Select, SelectItem, Switch, TextField } from 'components';
import { useFieldValue } from 'components/Form';
import { ConstructionSiteSelect, EnterpriseSelect } from 'templates';
import RoleSelect from '../../RoleSelect';

const DevicePageView = () => {

  const roleId = useFieldValue('roleId');

  return (
    <Box overflow="hidden">
      <Grid container direction="column" spacing={2}>

        <Grid item container spacing={2}>

          <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <AvatarInput name="photo" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={2}>

              <Grid item xs={12}>
                <Switch name="blocked" label="Заблокирован" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="username" label="Имя входа" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="email" label="Адрес эл. почты" />
              </Grid>
              <Grid item xs={12}>
                <RoleSelect required />
              </Grid>

            </Grid>
          </Grid>

        </Grid>

        <Grid item container spacing={2}>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth required name="lastname" label="Фамилия" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth name="firstname" label="Имя" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth name="middlename" label="Отчество" />
          </Grid>

        </Grid>

        <Grid item container spacing={2}>

          <Grid item xs={8} sm={3}>
            <DatePicker fullWidth name="birthdate" label="Дата рождения" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <Select fullWidth name="gender" label="Пол">
              <SelectItem disabled value="" label="Не выбрано" />
              <SelectItem value="male" label="Мужской" />
              <SelectItem value="female" label="Женский" />
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth name="phone" label="Номер телефона" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EnterpriseSelect fullWidth />
          </Grid>

        </Grid>

        {(roleId === 18 || roleId === 6) && (
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ConstructionSiteSelect onlyWithSigurSystem={null} multiple name="constructionSiteIds" />
            </Grid>
          </Grid>
        )}

      </Grid>
    </Box>
  );
};

export default DevicePageView;
