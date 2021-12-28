import ListTable from 'components/ListTable';
import { useQueryParams } from 'hooks';

const columns = [
  {
    name: 'worker.name',
    label: 'Сотрудник',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'enterprise.name',
    label: 'Компания',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'site.name',
    label: 'Объект',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'dateTimeRequest',
    label: 'Время запроса',
    options: {
      filter: false,
      sort: false,
      customBodyRender: value => new Date(value).toLocaleString('ru'),
    },
  },
  {
    name: 'dateTimeAnswer',
    label: 'Результат',
    options: {
      filter: false,
      sort: false,
      customBodyRender: value =>
        value ? `Пройден ${new Date(value).toLocaleString('ru')}` : 'Отправлен...',
    },
  },
];

const BiometryData = ({ data }) => {
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

export default BiometryData;
