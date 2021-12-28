import { Grid, Paper } from '@material-ui/core';
import { getColor } from 'components/Chart';
import { classes } from 'utils';
import SiteAnalyticsForPeriodChart from './SiteAnalyticsForPeriodChart';
import styles from './styles.module.scss';

interface SiteAnalyticsByPeriodProps {
  data: SiteAnalyticsDataForPeriod;
}

function SiteAnalyticsForPeriod({ data }: SiteAnalyticsByPeriodProps) {
  const chartProps = useMemo(() => {
    const { byDateTime } = data;
    const dataSets = [
      byDateTime.map(tick => tick.attended),
      byDateTime.map(tick => tick.notInstructed),
      byDateTime.map(tick => tick.withHighTemperature),
    ];
    const ticks = byDateTime.map(tick => new Date(tick.dateTime).toLocaleDateString('ru'));
    const labels = [
      'Присутствующие на объекте',
      'Не прошедшие инструктаж',
      'С повышенной температурой',
    ];
    const colors = dataSets.map((_, index) => getColor(index + 3));
    return {
      dataSets,
      ticks,
      labels,
      colors,
    };
  }, [data]);

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
            <p>В среднем за период</p>
            <p>{data.avrForPeriod}</p>
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

      <Paper className={classes(styles.chartPaper)}>
        <SiteAnalyticsForPeriodChart {...chartProps} />
      </Paper>
    </>
  );
}

export default SiteAnalyticsForPeriod;
