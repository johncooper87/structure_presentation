import { Box, Grid } from '@material-ui/core';
import { AvatarInput, DatePicker, Select, SelectItem, Switch, TextField } from 'components';
import { ConstructionSiteSelect, EnterpriseSelect } from 'templates';
import PositionSelect from '../../PositionSelect';
import CitizenshipSelect from './CitizenshipSelect';
import InsuranceNumberField from './InsuranceNumberField';
import PassportField from './PassportField';
import WorkerDeviceSelect from './WorkerDeviceSelect';

const DevicePageView = () => {
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
                <TextField fullWidth required name="lastname" label="Фамилия" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth required name="firstname" label="Имя" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="middlename" label="Отчество" />
              </Grid>

              <Grid item container spacing={2}>
                <Grid item xs={8} sm={6}>
                  <DatePicker fullWidth required name="birthdate" label="Дата рождения" />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Select fullWidth required name="gender" label="Пол">
                    <SelectItem disabled value="" label="Не выбрано" />
                    <SelectItem value="male" label="Мужской" />
                    <SelectItem value="female" label="Женский" />
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CitizenshipSelect fullWidth />
          </Grid>
          <Grid item xs={6} sm={3}>
            <PassportField fullWidth />
          </Grid>
          <Grid item xs={6} sm={3}>
            <InsuranceNumberField fullWidth />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={4}>
            <EnterpriseSelect fullWidth required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PositionSelect fullWidth required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <WorkerDeviceSelect fullWidth />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ConstructionSiteSelect enterpriseFieldName={null} multiple name="siteIds" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Switch name="stationary" label="Стационарный порядок работы" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DevicePageView;
