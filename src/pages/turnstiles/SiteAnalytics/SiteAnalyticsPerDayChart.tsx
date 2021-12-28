/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ExpandLess';
import { Tooltip, TooltipProps } from '@material-ui/core';
import { ChartOptions } from 'chart.js';
import { Chart, getColor } from 'components/Chart';
import styles from './styles.module.scss';

const chartOptions: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  hover: {
    mode: null,
  },
  rotation: -90,
};

function SiteAnalyticsPerDayChart({
  data: _data,
  title,
  colorShift,
}: SiteAnalyticsPerDayChartProps) {

  const data = useMemo(() => _data?.map(t => t.count + (t.nestedCount ?? 0)) ?? [], [_data]);

  let pieData = data;
  let othersCount = 0;
  if (data.length > 7) {
    othersCount = data.slice(7).reduce((total, count) => total + count, 0);
    if (othersCount > 0) othersCount += data[6];
    pieData = data.slice(0, 7);
    if (othersCount !== 0) {
      othersCount = pieData.reduce((total, count) => total + count, 0);
      pieData.push(othersCount);
    }
  }
  const _getColor =
    othersCount === 0
      ? (index: number) => getColor(index)
      : (index: number) => (index > 6 ? 'transparent' : getColor(index + colorShift));
  const colors = data.map((item, index) => _getColor(index));

  return (
    <div className={styles.chartContainer}>

      <div className={styles.chartPerDay}>
        <div>{title}</div>
        {data.length > 0 ? (
          <Chart
            type="doughnut"
            data={{
              datasets: [
                {
                  data: pieData,
                  backgroundColor: colors,
                },
              ],
            }}
            options={chartOptions}
          />
        ) : (
          'Нет данных'
        )}
        {/* {othersCount > 0 && <div className={styles.other}>...остальные</div>} */}
      </div>

      <div className={styles.legendContainer}>
        {_data.map((label, index) => (
          <LegendItem key={index} data={_data[index]} color={colors[index]} />
        ))}
      </div>

    </div>
  );
}

interface LegendItemProps {
  data: PieDataItem & ByDepartmentDataItem
  color?: string
}

function LegendItem({ data, color }: LegendItemProps) {
  const { count, nestedCount = 0, name, subDepartments } = data;
  const totalCount = count + nestedCount;
  const hasNested = nestedCount > 0;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(_ => !_), []);

  const Wrapper = hasNested ? Tooltip : React.Fragment;
  const tooltipProps = hasNested ? {
    title: `${count} своих и ${nestedCount} вложенных`,
    placement: 'right-end',
  } as TooltipProps : undefined;

  return (
    <>
      <div className={styles.legendItem}>
        {color != null && <span className={styles.legendMarker} style={{ backgroundColor: color }} />}
        <Wrapper {...tooltipProps}>
          <span
            className={styles.legendLabel}
            onClick={hasNested ? toggleExpanded : undefined}
            style={{ cursor: hasNested ? 'pointer' : undefined }}
          >
            <span>{name}</span>
            <span className={styles.legendCount}>
              {totalCount}

              {hasNested && (
              <span className={styles.iconContainer}>
                {expanded ? <CollapseIcon /> : <ExpandIcon />}
              </span>
            )}

            </span>
          </span>
        </Wrapper>
      </div>
      {expanded && (
        <div className={styles.nestedContainer}>
          {subDepartments?.map((d, index) => <LegendItem key={index} data={d} />)}
        </div>
      )}
    </>
  );
}

export default SiteAnalyticsPerDayChart;
