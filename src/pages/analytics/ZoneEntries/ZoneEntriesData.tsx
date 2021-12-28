import { 
  TableCell,
  TableRow,
} from '@material-ui/core';
import ListTable from 'components/ListTable';
import { useQueryParams } from 'hooks';

const columns = [
  {
    name: 'workerName',
    label: 'ФИО сотрудника',
    options: {
      filter: true,
      filterType: 'textField',
      sort: true,
    },
  },
  {
    name: 'zoneGroupName',
    label: 'Объект',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'zoneName',
    label: 'Зона',
    options: {
      filter: false,
      sort: false,
      customBodyRender: () => null,
    },
  },
  {
    name: 'begin',
    label: 'Время входа',
    options: {
      filter: false,
      sort: false,
      customBodyRender: () => null,
    },
  },
  {
    name: 'end',
    label: 'Время выхода',
    options: {
      filter: false,
      sort: false,
      customBodyRender: () => null,
    },
  },
  {
    name: 'totalDurationInZoneString',
    label: 'Время нахождения',
    options: {
      filter: false,
      sort: false,
    },
  },
];

const ZoneEntriesData = ({ data }) => {
  const { page }: { page: number; } = useQueryParams();
  const options = {
    expandableRows: true,
    renderExpandableRow: rowData => {
      const restEntries = rowData?.entries;
      return restEntries.map(({ zoneName, begin, end, durationInZoneString }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={index}>
          <TableCell colSpan={2} />
          <TableCell>{zoneName}</TableCell>
          <TableCell>{begin && new Date(begin).toLocaleString('ru')}</TableCell>
          <TableCell>{end && new Date(end).toLocaleString('ru')}</TableCell>
          <TableCell>{durationInZoneString}</TableCell>
        </TableRow>
      ));
    },
  };
  
  const prepearedData = useMemo(() => {
    const rowStart = page ? page * 10 : 0;
    const rowEnd = page ? (page + 1) * 10 : 10;
    return data
      .slice(rowStart, rowEnd);
  }, [data, page]);

  return <ListTable data={prepearedData} dataLength={data?.length} columns={columns} options={options} />;
};

export default ZoneEntriesData;
