import { ChartData, ChartOptions } from 'chart.js';
import { startOfMonth, addDays } from 'date-fns';
import { http } from 'utils';
import { Chart, BarOptions, addValueLabelsToBars, Form, DatePicker } from 'components';
import PositionSelect from 'pages/workers/PositionSelect';
import styles from './styles.module.scss';
// import mockData from './WorkersArrivalMockData.json';

const barOptions: BarOptions = {
  barThickness: 18,
  barPercentage: 0.8,
  categoryPercentage: 1,
};
const padding = {
  top: 20,
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
        count: 10,
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

interface FilterValues {
  begin: string;
  end: string;
  positionId: number;
}

const getDefaultFilterValues = () => ({
  begin: addDays(startOfMonth(new Date()), 1).toISOString().slice(0, 10),
  end: new Date().toISOString().slice(0, 10),
  positionId: null,
});

type WorkersArrivalData = {
  groupName: string;
  items: string[];
}[];

type WorkersArrivalParsedData = {
  groupName: string;
  items: number[];
}[];

const parseWorkersArrivalData = ({ groupName, items }: WorkersArrivalData[number]) => ({
  groupName,
  items: items.map(item => parseInt(item)),
});

async function fetchWorkersArrivalData(siteId: string, begin: string, end: string) {
  const { result } = await http.get('/api/kbi/dashboards/workersinprojectgroupdays', {
    zoneGroupId: siteId,
    begin,
    end,
  });

  // fragment for debugging
  // return (mockData as WorkersArrivalData).map(parseWorkersArrivalData) as WorkersArrivalParsedData;

  return (result as WorkersArrivalData).map(parseWorkersArrivalData) as WorkersArrivalParsedData;
}

function filterDataByPositionId(data: WorkersArrivalParsedData, positionId: number) {
  return positionId == null
    ? data
    : data.map(({ groupName, items }) => ({
        groupName,
        items: items.filter(item => item === positionId),
      }));
}

function getWorkersArrivalChartData(data: WorkersArrivalParsedData) {
  return {
    labels: data.map(tickData => tickData.groupName),
    datasets: [
      {
        backgroundColor: '#9ac2ff',
        ...barOptions,
        data: data.map(tickData => tickData.items.length),
      },
    ],
  } as ChartData;
}

function WorkersArrivalWidget({ siteId }: { siteId?: string }) {
  const [filterValues, setFilterValues] = useState<FilterValues>(getDefaultFilterValues);
  const { begin, end, positionId } = filterValues;

  const { data = [] } = useQuery(
    ['WIDGETS/WORKERS_ARRIVAL', siteId, begin, end],
    () => fetchWorkersArrivalData(siteId, begin, end),
    { enabled: Boolean(siteId), refetchInterval: 10000 }
  );
  const filteredData = useMemo(() => filterDataByPositionId(data, positionId), [data, positionId]);
  const chartData = useMemo(() => getWorkersArrivalChartData(filteredData), [filteredData]);

  return (
    <>
      <Form onChange={setFilterValues} initialValues={filterValues}>
        <div className={styles.controls}>
          <DatePicker disableKeyboardInput inputVariant="standard" name="begin" label="Начало" />
          <DatePicker disableKeyboardInput inputVariant="standard" name="end" label="Конец" />
          <PositionSelect className={styles.autocomplete} name="positionId" variant="standard" />
        </div>
      </Form>

      <div className={styles.content}>
        <Chart type="bar" options={chartOptions} data={chartData} />
      </div>
    </>
  );
}

export default WorkersArrivalWidget;
