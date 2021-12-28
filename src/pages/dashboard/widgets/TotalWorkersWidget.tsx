import { ChartData, ChartOptions } from 'chart.js';
import { http } from 'utils';
import { Chart, BarOptions, addValueLabelsToBars } from 'components';

const barOptions: BarOptions = {
  barThickness: 24,
  barPercentage: 0.8,
  categoryPercentage: 1,
};
const padding = {
  top: 29,
  right: 10,
  bottom: 10,
  left: 10,
};
const chartOptions: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  indexAxis: 'x',
  maintainAspectRatio: false,
  aspectRatio: 1,
  layout: {
    padding,
  },
  scales: {
    x: {
      grid: {
        display: false,
        borderColor: 'transparent',
      },
    },
    y: {
      grid: {
        borderColor: 'transparent',
      },
      ticks: {
        display: false,
        stepSize: 1,
        count: 6,
      },
    },
  },
  hover: {
    mode: null,
  },
  animation: {
    onComplete: ({ chart }) => addValueLabelsToBars(chart, true),
  },
};

type TotalWorkersData = {
  groupName: string;
  count: number;
}[];

async function fetchTotalWorkersData(siteId: string) {
  const { result } = await http.get('/api/kbi/dashboards/workersinprojectgrouphours', {
    zoneGroupId: siteId,
  });

  // fragment for debugging
  // return [
  //   { groupName: '00:00', count: 4 },
  //   { groupName: '01:00', count: 2 },
  //   { groupName: '02:00', count: 2 },
  //   { groupName: '03:00', count: 1 },
  //   { groupName: '04:00', count: 0 },
  //   { groupName: '05:00', count: 1 },
  //   { groupName: '06:00', count: 2 },
  //   { groupName: '07:00', count: 26 },
  // ];

  return result as TotalWorkersData;
}

function TotalWorkersWidget({ siteId }: { siteId?: string }) {
  const { data = [] } = useQuery(
    ['WIDGETS/TOTAL_WORKERS', siteId],
    () => fetchTotalWorkersData(siteId),
    {
      enabled: Boolean(siteId),
      refetchInterval: 10000,
    }
  );

  const chartData = useMemo<ChartData>(
    () => ({
      labels: data.map(item => item.groupName),
      datasets: [
        {
          backgroundColor: '#9ac2ff',
          ...barOptions,
          data: data.map(item => item.count),
        },
      ],
    }),
    [data]
  );

  return <Chart type="bar" options={chartOptions} data={chartData} />;
}

export default TotalWorkersWidget;
