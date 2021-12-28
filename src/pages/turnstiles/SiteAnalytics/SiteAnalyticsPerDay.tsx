import { Grid, Paper } from '@material-ui/core';
import { classes } from 'utils';
import SiteAnalyticsPerDayChart from './SiteAnalyticsPerDayChart';
import styles from './styles.module.scss';

interface SiteAnalyticsByDayProps {
  data: SiteAnalyticsDataPerDay;
}

function SiteAnalyticsPerDay({ data }: SiteAnalyticsByDayProps) {
  const { byDepartment, byPosition } = data;

  return (
    <>
      <Grid container spacing={2} className={styles.baseNumbers}>
        <Grid item>
          <Paper>
            <p>Всего сотрудников</p>
            <p>{data.total}</p>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <p>Допущено за день</p>
            <p>{data.perDay}</p>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <p>На объекте</p>
            <p>{data.now}</p>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <p>Не прошли инструктаж</p>
            <p>{data.notInstructed}</p>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <p>С повышеной температурой</p>
            <p>{data.withHighTemperature}</p>
          </Paper>
        </Grid>
      </Grid>

      <Paper className={classes(styles.chartPaper, styles.chartsPerDay)}>
        <SiteAnalyticsPerDayChart
          title="По подразделениям"
          data={byDepartment ?? []}
          colorShift={2}
        />
        <SiteAnalyticsPerDayChart title="По профессиям" data={byPosition ?? []} colorShift={4} />
      </Paper>
    </>
  );
}

export default SiteAnalyticsPerDay;
