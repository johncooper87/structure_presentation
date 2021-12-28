import { Checkbox, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import { ChartData, ChartOptions } from 'chart.js';
import { http } from 'utils';
import { Chart, BarOptions, getSizeToFitBars, addValueLabelsToBars } from 'components';
import styles from './styles.module.scss';

const autocompleteProps: Pick<
  AutocompleteProps<string, true, false, false>,
  'renderOption' | 'renderTags' | 'getOptionLabel' | 'renderInput'
> = {
  renderOption: (option, { selected }) => (
    <>
      <Checkbox checked={selected} />
      {option}
    </>
  ),
  renderTags: (values: string[]) => (values.length > 0 ? values.join(', ') : 'Все'),
  getOptionLabel: option => option || '',
  renderInput: inputProps => <TextField {...inputProps} variant="standard" label="Должности" />,
};

const barOptions: BarOptions = {
  barThickness: 12,
  barPercentage: 0.6,
  categoryPercentage: 1,
};
const padding = {
  top: 10,
  right: 20,
  bottom: 10,
  left: 10,
};
const chartOptions: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  indexAxis: 'y',
  maintainAspectRatio: false,
  aspectRatio: 1,
  layout: {
    padding,
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      grid: {
        display: false,
        borderColor: 'transparent',
      },
    },
  },
  hover: {
    mode: null,
  },
  animation: {
    // duration: 300,
    onComplete: ({ chart }) => addValueLabelsToBars(chart),
  },
};

type WorkerPresenceData = {
  groupName: string;
  count: number;
}[];

async function fetchWorkerPresenceData(siteId: string, date: Date) {
  const { result } = await http.get('/api/kbi/dashboards/workersinproject', {
    zoneGroupId: siteId,
    dateTime: date.toISOString().slice(0, 10),
  });

  // fragment for debugging
  // return [
  //   { groupName: 'Начальник участка', count: 1 },
  //   { groupName: 'Подсобный рабочий', count: 1 },
  //   { groupName: 'Производитель работ', count: 2 },
  //   { groupName: 'Электрогазосварщик', count: 2 },
  //   { groupName: 'Механик', count: 1 },
  //   { groupName: 'Монтажник', count: 9 },
  //   { groupName: 'Электромонтер', count: 1 },
  //   { groupName: 'Мойщик', count: 1 },
  //   { groupName: 'Монтажник наружных трубопроводов', count: 1 },
  //   { groupName: 'Машинист', count: 2 },
  //   { groupName: 'Разнорабочий', count: 3 },
  //   { groupName: 'Водитель', count: 1 },
  //   { groupName: 'Рабочий', count: 1 },
  //   { groupName: 'Сварщик', count: 1 },
  // ];

  return (result as WorkerPresenceData).sort((item1, item2) => item2.count - item1.count);
}

function WorkerPresenceWidget({ siteId }: { siteId?: string }) {
  const now = new Date();
  const [date, setDate] = useState(now);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const handleChange = useCallback((event, newValue) => setSelectedPositions(newValue), []);

  const { data = [], isLoading } = useQuery(
    ['WIDGETS/WORKERS_PRESENCE', siteId, date],
    () => fetchWorkerPresenceData(siteId, date),
    { enabled: Boolean(siteId), refetchInterval: 10000 }
  );

  const positions = useMemo(() => data.map(tickData => tickData.groupName), [data]);

  const filteredData = useMemo(
    () =>
      selectedPositions.length === 0
        ? data
        : data.filter(tickData => selectedPositions.includes(tickData.groupName)),
    [data, selectedPositions]
  );

  const chartData = useMemo<ChartData>(
    () => ({
      labels: filteredData.map(tickData => tickData.groupName),
      datasets: [
        {
          backgroundColor: '#9ac2ff',
          ...barOptions,
          data: filteredData.map(tickData => tickData.count),
        },
      ],
    }),
    [filteredData]
  );

  const canvasProps = useMemo(
    () => ({
      style: {
        height:
          getSizeToFitBars(filteredData.length, barOptions, padding.top + padding.bottom) + 'px',
      },
    }),
    [filteredData.length]
  );

  return (
    <>
      <div className={styles.controls}>
        <DatePicker
          disableToolbar
          inputVariant="standard"
          label="Дата"
          maxDate={now}
          value={date}
          onChange={setDate}
        />
        <Autocomplete
          fullWidth
          multiple
          disableCloseOnSelect
          options={positions}
          value={selectedPositions}
          onChange={handleChange}
          {...autocompleteProps}
        />
      </div>

      <div style={{ display: filteredData.length === 0 ? 'none' : undefined }}>
        <Chart canvasProps={canvasProps} type="bar" options={chartOptions} data={chartData} />
      </div>

      {siteId && filteredData.length === 0 && !isLoading && (
        <div className={styles.empty}>
          <Typography>Специалисты отсутсвовали на объекте</Typography>
        </div>
      )}
    </>
  );
}

export default WorkerPresenceWidget;
