import { Grid, Tooltip } from '@material-ui/core';
import WorkShiftCheckedIcon from '@material-ui/icons/CheckCircleOutline';
import WorkShiftNotCheckedIcon from '@material-ui/icons/HighlightOff';
// import SiteIcon from '@material-ui/icons/LocationOn';
import TimeIcon from '@material-ui/icons/Schedule';
import WorkShiftIcon from '@material-ui/icons/Timelapse';
import OutsideTimeIcon from 'components/icons/HistoryToggleOff';
import EnterTimeIcon from 'components/icons/Login';
import ExitTimeIcon from 'components/icons/Logout';

export function ListItemWorkShiftCheckIndicator({ value }: { value: boolean }) {
  return value == null ? null : value ? (
    <Tooltip title="Регистрация в системе пройдена">
      <WorkShiftCheckedIcon style={{ color: 'hsl(105deg 40% 65%)' }} />
    </Tooltip>
  ) : (
    <Tooltip title="Регистрация в системе не пройдена">
      <WorkShiftNotCheckedIcon style={{ color: '#f34151' }} />
    </Tooltip>
  );
}

export function ListItemInsideTime({ value }: { value: string }) {
  if (!value || value === '-') return null;
  return (
    <Grid container alignItems="center" wrap="nowrap" style={{ fontSize: '12px' }}>
      <Tooltip title="Время внутри объекта">
        <TimeIcon fontSize="small" />
      </Tooltip>
      {value}
    </Grid>
  );
}

export function ListItemOutsideTime({ value }: { value: string }) {
  if (!value || value === '-') return null;
  return (
    <Grid container alignItems="center" wrap="nowrap" style={{ fontSize: '12px' }}>
      <Tooltip title="Время вне объекта">
        <span style={{ display: 'inherit' }}>
          <OutsideTimeIcon fontSize="small" />
        </span>
      </Tooltip>
      {value}
    </Grid>
  );
}

export function ListItemEnterTime({ value }: { value: string }) {
  return (
    <Grid container alignItems="center" wrap="nowrap" style={{ fontSize: '12px' }}>
      <Tooltip title="Время входа">
        <span style={{ display: 'inherit' }}>
          <EnterTimeIcon fontSize="small" />
        </span>
      </Tooltip>
      {value ? new Date(value).toLocaleString('ru') : '-'}
    </Grid>
  );
}

export function ListItemExitTime({ value }: { value: string }) {
  return (
    <Grid container alignItems="center" wrap="nowrap" style={{ fontSize: '12px' }}>
      <Tooltip title="Время выхода">
        <span style={{ display: 'inherit' }}>
          <ExitTimeIcon fontSize="small" />
        </span>
      </Tooltip>
      {value ? new Date(value).toLocaleString('ru') : '-'}
    </Grid>
  );
}

export function ListItemEntryTime({ value }: { value: string }) {
  return (
    <Grid container alignItems="center" wrap="nowrap" style={{ fontSize: '12px' }}>
      <Tooltip title="Проведенное время">
        <TimeIcon fontSize="small" />
      </Tooltip>
      {value}
    </Grid>
  );
}

// export function ListItemSite({ name }: { name: string }) {
//   return (
//     <Grid container alignItems="center" wrap="nowrap">
//       <Tooltip title="Объект">
//         <SiteIcon />
//       </Tooltip>
//       {name}
//     </Grid>
//   );
// }

export function ListItemWorkshiftTimings({
  start,
  end,
  asString,
}: {
  start: string;
  end: string;
  asString?: boolean;
}) {
  return (
    <Grid container wrap="nowrap">
      <Grid item>
        <Tooltip title="Время начала и конца смены">
          <WorkShiftIcon style={{ fontSize: '32px' }} />
        </Tooltip>
      </Grid>
      <Grid item style={{ fontSize: '12px' }}>
        <p>
          {asString ? start : start && start !== '-' ? new Date(start).toLocaleString('ru') : '-'}
        </p>
        <p>{asString ? end : end && end !== '-' ? new Date(end).toLocaleString('ru') : '-'}</p>
      </Grid>
    </Grid>
  );
}

export function ListItemShiftTime({ value }: { value: string }) {
  return (
    <Grid container alignItems="center" wrap="nowrap" style={{ fontSize: '12px' }}>
      <Tooltip title="Время смены">
        <TimeIcon fontSize="small" />
      </Tooltip>
      {value}
    </Grid>
  );
}
