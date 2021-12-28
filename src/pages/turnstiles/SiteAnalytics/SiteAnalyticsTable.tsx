import ListTable from 'components/ListTable';
import { useQueryParams } from 'hooks';
import formatDuration from 'utils/formatDuration';
import styles from './styles.module.scss';

const columns = [
  {
    name: 'fullname',
    label: 'ФИО',
  },
  {
    name: 'position',
    label: 'Должность',
  },
  {
    name: 'department',
    label: 'Подразделение',
  },
  {
    name: 'temperature',
    label: 'Температура',
    options: {
      customBodyRender: ({ value, elevated }: Temperature) => {
        const _value = value ? value.toFixed(1) + '\u00B0' : '';
        return elevated ? <span className={styles.alertText}>{_value}</span> : _value;
      },
    },
  },
  {
    name: 'instructed',
    label: 'Инструктаж',
    options: {
      customBodyRender: (value: string) =>
        value ? 'Пройден' : <span className={styles.alertText}>Не пройден</span>,
    },
  },
  {
    name: 'entered',
    label: 'Дата и время входа',
    options: {
      customBodyRender: (value: string) =>
        value ? (
          new Date(value).toLocaleString('ru')
        ) : (
          <span className={styles.notEntered}>Вход не выполнен</span>
        ),
    },
  },
  {
    name: 'exited',
    label: 'Дата и время выхода',
    options: {
      customBodyRender: (value: string) =>
        value ? new Date(value).toLocaleString('ru') : '-',
    },
  },
  {
    name: 'spent',
    label: 'Время на объекте',
    options: {
      customBodyRender: (value: string, rowData) => {
        const enterDate = rowData.entered && new Date(rowData.entered);
        const exitDate = rowData.exited && new Date(rowData.exited);
        if (!enterDate || !exitDate) return '-';
        // @ts-ignore
        return formatDuration(exitDate - enterDate);
      },
    },
  },
];

const SiteAnalyticsTable = ({ data }) => {
  // @ts-ignore
  const {
    orderBy,
    order,
    page,
    search,
  }: { orderBy: string; order: string; page: number; search: string } = useQueryParams();

  const prepearedData = useMemo(() => {
    const rowStart = page ? page * 10 : 0;
    const rowEnd = page ? (page + 1) * 10 : 10;
    const lowerSearch = search?.toLowerCase() ?? '';
    return data
      .filter(
        el =>
          !search ||
          el?.fullName?.toLowerCase().includes(lowerSearch) ||
          el?.position?.toLowerCase().includes(lowerSearch) ||
          el?.department?.toLowerCase().includes(lowerSearch)
      )
      .sort((a, b) => {
        const orderK = order === 'desc' ? -1 : 1;
        const val1 = orderBy === 'temperature' ? a[orderBy].value : a[orderBy];
        const val2 = orderBy === 'temperature' ? b[orderBy].value : b[orderBy];
        if (val1 > val2) {
          return orderK;
        }
        if (val1 < val2) {
          return -orderK;
        }
        return 0;
      })
      .slice(rowStart, rowEnd);
  }, [data, orderBy, order, page, search]);

  // @ts-ignore
  return <ListTable data={prepearedData} columns={columns} dataLength={data?.length} />;
};

export default SiteAnalyticsTable;
