import { Grid, ListItem, ListItemText } from '@material-ui/core';
import { ListItemWorker, ListItemDevice } from 'templates/data';
import {
  ListItemPowerIndicator,
  ListItemPutOnIndicator,
  ListItemWorkshiftTimings,
  ListItemLastPackageTime,
  ListItemLastPointDuration,
  ListItemLastAlertTime,
  ListItemBatteryCharge,
  ListItemWifiIndicator,
  ListItemCoordinates,
} from '../_shared';

interface HistoryListItemProps {
  data: Partial<HistoryDTO>;
}

function HistoryListItem({ data }: HistoryListItemProps) {
  const {
    lastWorkerName,
    shift,
    mobject: {
      deveceType,
      serialNumber,
      latitude,
      longitude,
      accuracy,
      isValid,
      lastPackageTime,
      lastPointTime,
      lastSOSDateTime,
      wifiLink,
      powerOn,
      timeFromLastPointTime,
      batteryCharge,
      isPutOn,
    },
  } = data;

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12} md={4}>
          <ListItemText
            primary={<ListItemWorker data={{ fullName: lastWorkerName }} />}
            secondary={
              <Grid container spacing={1} wrap="nowrap">
                <Grid item>
                  <ListItemDevice data={{ model: { name: deveceType }, name: serialNumber }} />
                </Grid>
                <Grid item>
                  <ListItemPowerIndicator value={powerOn} />
                </Grid>
                <Grid item>
                  <ListItemPutOnIndicator value={isPutOn} />
                </Grid>
              </Grid>
            }
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <ListItemText
            className="col-2"
            primary={
              <Grid container spacing={1}>
                {shift ? (
                  <Grid item>
                    <ListItemWorkshiftTimings start={shift.begin} end={shift.end} />
                  </Grid>
                ) : null}
                <Grid item>
                  <ListItemLastPackageTime value={lastPackageTime} />
                </Grid>
              </Grid>
            }
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <ListItemText
            className="col-2"
            primary={
              <ListItemCoordinates
                {...{ latitude, longitude, time: lastPointTime, accuracy, valid: isValid }}
              />
            }
            secondary={
              <Grid container spacing={1} style={{ fontSize: '12px' }}>
                <Grid item>
                  <ListItemWifiIndicator value={wifiLink} />
                </Grid>
                <Grid item>
                  <ListItemBatteryCharge value={batteryCharge} />
                </Grid>
                <Grid item>
                  <ListItemLastPointDuration value={timeFromLastPointTime} />
                </Grid>
                {lastSOSDateTime && <ListItemLastAlertTime value={lastSOSDateTime} />}
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default HistoryListItem;
