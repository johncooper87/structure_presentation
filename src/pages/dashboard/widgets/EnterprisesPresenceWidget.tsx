import { Typography } from '@material-ui/core';
import { ChartData, ChartOptions } from 'chart.js';
import { http } from 'utils';
import { Chart, Form, DatePicker, getColor, generateLegendLabels } from 'components';
import styles from './styles.module.scss';

const padding = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};
const chartOptions: ChartOptions = {
  plugins: {
    legend: {
      display: true,
      labels: {
        generateLabels: generateLegendLabels,
      },
    },
  },
  maintainAspectRatio: false,
  aspectRatio: 1,
  layout: {
    padding,
  },
  hover: {
    mode: null,
  },
};

interface FilterValues {
  date: string;
}

const getDefaultFilterValues = () => ({
  date: new Date().toISOString().slice(0, 10),
});

type EnterprisesPresencelData = {
  groupName: string;
  count: number;
}[];

async function fetchEnterprisesPresencelData(siteId: string, date: string) {
  const { result } = await http.get('/api/kbi/dashboards/enterprisesinproject', {
    zoneGroupId: siteId,
    dateTime: date,
  });

  // fragment for debugging
  // return [
  //   { groupName: 'ООО "ГАСКАР ИНТЕГРАЦИЯ"', count: 2 },
  //   { groupName: 'ООО "АСК"', count: 10 },
  //   { groupName: 'ООО "АВТОМАТИЗИРОВАННЫЕ СИСТЕМЫ КОСТЫЛЕЙ"', count: 6 },
  //   { groupName: 'ООО "ГАСКАР ИММИГРАЦИЯ"', count: 1 },
  //   { groupName: 'ООО "ГАСКАР ЛЕВИТАЦИЯ"', count: 4 },
  // ];

  return result as EnterprisesPresencelData;
}

function getEnterprisesPresenceChartData(data: EnterprisesPresencelData) {
  return {
    labels: data.map(tickData => tickData.groupName),
    datasets: [
      {
        backgroundColor: data.map((tickData, index) => getColor(index)),
        data: data.map(tickData => tickData.count),
      },
    ],
  } as ChartData;
}

function EnterprisesPresenceWidget({ siteId }: { siteId?: string }) {
  const [filterValues, setFilterValues] = useState<FilterValues>(getDefaultFilterValues);
  const { date } = filterValues;

  const { data = [], isLoading } = useQuery(
    ['WIDGETS/ENTERPRISES_PRESENCE', siteId, date],
    () => fetchEnterprisesPresencelData(siteId, date),
    { enabled: Boolean(siteId), refetchInterval: 10000 }
  );
  const chartData = useMemo(() => getEnterprisesPresenceChartData(data), [data]);

  return (
    <>
      <Form onChange={setFilterValues} initialValues={filterValues}>
        <div className={styles.controls}>
          <DatePicker disableKeyboardInput inputVariant="standard" name="date" label="Дата" />
        </div>
      </Form>

      <div style={{ display: data.length === 0 ? 'none' : undefined }} className={styles.content}>
        <Chart type="pie" options={chartOptions} data={chartData} />
      </div>

      {siteId && data.length === 0 && !isLoading && (
        <div className={styles.empty}>
          <Typography>Организации отсутсвовали на объекте</Typography>
        </div>
      )}
    </>
  );
}

export default EnterprisesPresenceWidget;
