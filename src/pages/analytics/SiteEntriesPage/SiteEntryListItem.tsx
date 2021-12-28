import { Grid, ListItem, ListItemText } from '@material-ui/core';
import {
  ListItemEnterTime,
  ListItemExitTime,
  ListItemEntryTime,
  ListItemShiftTime,
  ListItemWorkshiftTimings,
} from '../_shared';

interface SiteEntryListItemProps {
  data: Partial<SiteEntryDTO>;
}

function SiteEntryListItem({ data }: SiteEntryListItemProps) {
  const {
    zoneGroupName,
    durationInProjectString,
    dateTimeBeginShift,
    dateTimeEndShift,
    shiftTimeString,
    dateTimeBegin,
    dateTimeEnd,
  } = data;

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12} md={4}>
          <ListItemText primary={zoneGroupName} />
        </Grid>

        <Grid item xs={12} md={4}>
          <ListItemText
            className="col-2"
            primary={
              <Grid container spacing={1}>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <ListItemEnterTime value={dateTimeBegin} />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemExitTime value={dateTimeEnd} />
                    </Grid>
                  </Grid>
                </Grid>
                {durationInProjectString && (
                  <Grid item>
                    <ListItemEntryTime value={durationInProjectString} />
                  </Grid>
                )}
              </Grid>
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ListItemText
            className="col-2"
            primary={
              <Grid container spacing={1}>
                <Grid item>
                  <ListItemWorkshiftTimings start={dateTimeBeginShift} end={dateTimeEndShift} />
                </Grid>
                {shiftTimeString && (
                  <Grid item>
                    <ListItemShiftTime value={shiftTimeString} />
                  </Grid>
                )}
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default SiteEntryListItem;
