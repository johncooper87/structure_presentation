import { Grid, GridProps } from '@material-ui/core';
import { Select, SelectItem, TextField } from 'components';
import DeviceSerialNumberField from './DeviceSerialNumberField';
import DeviceStatusSwitch from './DeviceStatusSwitch';
import DeviceWorkerSelect from './DeviceWorkerSelect';

const rowSizings: GridProps = {
  xs: 12,
  sm: 8,
  md: 6,
  lg: 4,
};

const DevicePageView = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2} {...rowSizings}>
        <Grid item xs={6}>
          <Select fullWidth required name="type" label="Тип">
            <SelectItem value="watch" label="Часы" />
            <SelectItem value="card" label="Карта" />
          </Select>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <DeviceStatusSwitch />
        </Grid>
      </Grid>
      <Grid item {...rowSizings}>
        <DeviceSerialNumberField fullWidth />
      </Grid>
      <Grid item {...rowSizings}>
        <TextField
          name="version"
          type="number"
          label="Версия прошивки"
          readOnly
          fullWidth
        />
      </Grid>
      <Grid item {...rowSizings}>
        <DeviceWorkerSelect fullWidth />
      </Grid>
    </Grid>
  );
};

export default DevicePageView;
