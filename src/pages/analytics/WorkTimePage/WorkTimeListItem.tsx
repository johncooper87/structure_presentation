import { Grid, ListItem, ListItemText } from '@material-ui/core';
import { ExpandableListItem } from 'components';
import {
  ListItemInsideTime,
  ListItemOutsideTime,
  ListItemWorkShiftCheckIndicator,
  ListItemWorkshiftTimings,
} from '../_shared';

interface WorkTimeSubListItemProps {
  data: Partial<WorkTimeShift>;
}

function WorkTimeSubListItem({ data }: WorkTimeSubListItemProps) {
  const { date, beginTimeString, endTimeString, isCheck, outWorkedTimeString, workedTimeString } =
    data;

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12} sm={4} />

        <Grid item xs={7} sm={4}>
          <ListItemText
            primary={
              <Grid container spacing={1}>
                <Grid item>{new Date(date).toLocaleString('ru')}</Grid>
                <Grid item>
                  <ListItemWorkShiftCheckIndicator value={isCheck} />
                </Grid>
              </Grid>
            }
            secondary={
              <Grid container spacing={1}>
                <Grid item>
                  <ListItemInsideTime value={workedTimeString} />
                </Grid>
                <Grid item>
                  <ListItemOutsideTime value={outWorkedTimeString} />
                </Grid>
              </Grid>
            }
          />
        </Grid>

        <Grid item xs={5} sm={4}>
          <ListItemText
            className="col-2"
            primary={
              <ListItemWorkshiftTimings asString start={beginTimeString} end={endTimeString} />
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

interface WorkTimeListItemProps {
  data: Partial<WorkTimeEntry>;
}

function WorkTimeListItem({ data }: WorkTimeListItemProps) {
  const { fullName, professionName, workedTimeAll, outWorkedTimeAll, workShifts } = data;
  const collapse = workShifts?.map(workTimeShift => <WorkTimeSubListItem data={workTimeShift} />);

  return (
    <ExpandableListItem collapse={collapse}>
      <Grid container>
        <Grid item xs={6} sm={4}>
          <ListItemText primary={fullName} secondary={professionName} />
        </Grid>

        <Grid item xs={6} sm={8}>
          <ListItemText
            className="col-2"
            primary={
              <Grid container spacing={1}>
                <Grid item>
                  <ListItemInsideTime value={workedTimeAll} />
                </Grid>
                <Grid item>
                  <ListItemOutsideTime value={outWorkedTimeAll} />
                </Grid>
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </ExpandableListItem>
  );
}

export default WorkTimeListItem;
