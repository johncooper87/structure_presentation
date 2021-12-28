import { ChartOptions } from 'chart.js';
import { Chart } from 'components/Chart';
import styles from './styles.module.scss';

const chartOptions: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label(context) {
          return context.formattedValue;
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
      type: 'logarithmic',
    },
  },
};

function SiteAnalyticsForPeriodChart({
  dataSets,
  ticks,
  labels,
  colors,
}: SiteAnalyticsForPeriodChartProps) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartForPeriod}>
        <Chart
          type="line"
          data={{
            labels: ticks,
            datasets: dataSets.map((data, index) => ({
              data,
              borderColor: colors[index],
            })),
          }}
          options={chartOptions}
        />
      </div>

      <div className={styles.legendContainer}>
        {labels.map((label, index) => (
          <div key={label} className={styles.legendItem}>
            <div className={styles.legendLabel}>
              <span className={styles.legendMarker} style={{ backgroundColor: colors[index] }} />
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SiteAnalyticsForPeriodChart;
