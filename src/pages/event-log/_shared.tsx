import { Grid, Tooltip } from '@material-ui/core';
import Charge20Icon from '@material-ui/icons/Battery20';
import Charge30Icon from '@material-ui/icons/Battery30';
import Charge50Icon from '@material-ui/icons/Battery50';
import Charge60Icon from '@material-ui/icons/Battery60';
import Charge80Icon from '@material-ui/icons/Battery80';
import Charge90Icon from '@material-ui/icons/Battery90';
import ChargeFullIcon from '@material-ui/icons/BatteryFull';
import ChargeUnknownIcon from '@material-ui/icons/BatteryUnknown';
import PackageTimeIcon from '@material-ui/icons/Event';
import PutOnIcon from '@material-ui/icons/Link';
import PutOffIcon from '@material-ui/icons/LinkOff';
import LocationIcon from '@material-ui/icons/MyLocation';
import AlertIcon from '@material-ui/icons/NotificationImportant';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import TimeFromLastPointIcon from '@material-ui/icons/Schedule';
import WorkShiftIcon from '@material-ui/icons/Timelapse';
import WiifOnIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import { formatDuration } from 'utils';

export function ListItemPowerIndicator({ value }: { value: boolean }) {
  return (
    <Tooltip title={value ? 'Включены' : 'Выключены'}>
      <PowerIcon style={{ color: value ? 'hsl(105deg 40% 65%)' : '#f34151' }} />
    </Tooltip>
  );
}

export function ListItemPutOnIndicator({ value }: { value: boolean }) {
  return value == null ? null : value ? (
    <Tooltip title="Одеты">
      <PutOnIcon style={{ color: 'hsl(105deg 40% 65%)' }} />
    </Tooltip>
  ) : (
    <Tooltip title="Сняты">
      <PutOffIcon style={{ color: '#f34151' }} />
    </Tooltip>
  );
}

export function ListItemWorkshiftTimings({ start, end }: { start: string; end: string }) {
  return (
    <Grid container wrap="nowrap">
      <Grid item>
        <Tooltip title="Время начала и конца смены">
          <WorkShiftIcon style={{ fontSize: '32px' }} />
        </Tooltip>
      </Grid>
      <Grid item style={{ fontSize: '12px' }}>
        <p>{start ? new Date(start).toLocaleString('ru') : '-'}</p>
        <p>{end ? new Date(end).toLocaleString('ru') : '-'}</p>
      </Grid>
    </Grid>
  );
}

export function ListItemLastPackageTime({ value }: { value: string }) {
  return (
    <Grid container alignItems="center" style={{ fontSize: '12px' }} wrap="nowrap">
      <Tooltip title="Время последнего пакета">
        <PackageTimeIcon fontSize="small" />
      </Tooltip>
      {new Date(value).toLocaleString('ru')}
    </Grid>
  );
}

export function ListItemLastPointDuration({ value }: { value: number }) {
  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Tooltip title="Время с момента передачи последней координаты">
        <TimeFromLastPointIcon fontSize="small" />
      </Tooltip>
      {formatDuration(value)}
    </Grid>
  );
}

export function ListItemLastAlertTime({ value }: { value: string }) {
  return (
    <Grid item>
      <Grid container alignItems="center" wrap="nowrap">
        <Tooltip title="Время последнего сигнала тревоги">
          <AlertIcon fontSize="small" />
        </Tooltip>
        {new Date(value).toLocaleString('ru')}
      </Grid>
    </Grid>
  );
}

export function ListItemWifiIndicator({ value }: { value: boolean }) {
  return value ? (
    <Tooltip title="Подключено к Wifi">
      <WiifOnIcon fontSize="small" />
    </Tooltip>
  ) : (
    <Tooltip title="Нет подключения к Wifi">
      <WifiOffIcon fontSize="small" />
    </Tooltip>
  );
}

function getBatteryChargeIcon(charge: number) {
  if (!charge) return ChargeUnknownIcon;
  if (charge > 90) return ChargeFullIcon;
  if (charge > 80 && charge <= 90) return Charge90Icon;
  if (charge > 70 && charge <= 80) return Charge80Icon;
  if (charge > 55 && charge <= 70) return Charge60Icon;
  if (charge > 35 && charge <= 55) return Charge50Icon;
  if (charge > 20 && charge <= 35) return Charge30Icon;
  if (charge > 0 && charge <= 20) return Charge20Icon;
}
export function ListItemBatteryCharge({ value }: { value: number }) {
  const BatteryChargeIcon = getBatteryChargeIcon(value);
  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Tooltip title="Заряд батареи">
        <BatteryChargeIcon fontSize="small" />
      </Tooltip>
      {value && value + '%'}
    </Grid>
  );
}

export function ListItemCoordinates({
  latitude,
  longitude,
  accuracy,
  valid,
  time,
}: {
  latitude: number;
  longitude: number;
  valid: boolean;
  accuracy: number;
  time: string;
}) {
  return (
    <Grid container spacing={1} wrap="nowrap">
      <Grid item>
        <Tooltip
          title={
            valid
              ? 'Валидные координаты, их точность и время передачи'
              : 'Невалидные координаты, время их передачи'
          }
        >
          <LocationIcon
            style={{
              color: valid ? 'hsl(105deg 40% 65%)' : '#f34151',
              fontSize: '32px',
            }}
          />
        </Tooltip>
      </Grid>
      <Grid item style={{ fontSize: '12px' }}>
        <p>
          {latitude}, {longitude} {accuracy && <span>&#177; {accuracy}</span>}
        </p>
        <p>{new Date(time).toLocaleString('ru')}</p>
      </Grid>
    </Grid>
  );
}
