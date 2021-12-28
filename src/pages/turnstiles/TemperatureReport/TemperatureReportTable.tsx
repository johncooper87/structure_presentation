import ListTable from 'components/ListTable';
import { useQueryParams } from 'hooks';

const columns = [
  {
    name: 'dateTime',
    label: 'Дата измерения',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: string) => (value ? new Date(value).toLocaleString('ru') : '-'),
    },
  },
  {
    name: 'fullName',
    label: 'ФИО',
    options: {
      filter: true,
      filterType: 'textField',
      sort: true,
    },
  },
  {
    name: 'position',
    label: 'Должность',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'personNumber',
    label: 'Табельный номер',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'temperature',
    label: 'Температура',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: number) => {
        return value ? value.toFixed(1) + '\u00B0' : '';
      },
    },
  },
];

const TemperatureReportTable = ({ data }) => {
  // @ts-ignore
  const { page }: { page: number; } = useQueryParams();

  const prepearedData = useMemo(() => {
    const rowStart = page ? page * 10 : 0;
    const rowEnd = page ? (page + 1) * 10 : 10;
    return data
      .slice(rowStart, rowEnd);
  }, [data, page]);

  // @ts-ignore
  return <ListTable data={prepearedData} columns={columns} dataLength={data?.length} />;
};

export default TemperatureReportTable;
