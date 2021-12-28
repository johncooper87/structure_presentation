import { IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { http } from 'utils';
import styles from './styles.module.scss';

type AbsentWorkersData = {
  fullName: string;
}[];

async function fetchAbsentWorkersData(siteId: string) {
  const { result } = await http.get('/api/kbi/dashboards/absentworkersinproject', {
    zoneGroupId: siteId,
    fields: 'fullName',
  });

  // fragment for debugging
  // return [
  //   { fullName: 'Колохматова Дарья Федоровна' },
  //   { fullName: 'Олейник Екатерина' },
  //   { fullName: 'Колохматова Дарья Федоровна 1' },
  //   { fullName: 'Олейник Екатерина 1' },
  //   { fullName: 'Колохматова Дарья Федоровна 2' },
  //   { fullName: 'Олейник Екатерина 2' },
  //   { fullName: 'Колохматова Дарья Федоровна 3' },
  //   { fullName: 'Олейник Екатерина 3' },
  //   { fullName: 'Колохматова Дарья Федоровна 4' },
  //   { fullName: 'Олейник Екатерина 4' },
  //   { fullName: 'Колохматова Дарья Федоровна 5' },
  //   { fullName: 'Олейник Екатерина 5' },
  // ];

  return result as AbsentWorkersData;
}

function searchReducer(value: string, event: React.ChangeEvent<HTMLInputElement>) {
  return event.target?.value || '';
}

function AbsentWorkersWidget({ siteId }: { siteId?: string }) {
  const { data = [] } = useQuery(
    ['WIDGETS/ABSENT_WORKERS', siteId],
    () => fetchAbsentWorkersData(siteId),
    {
      enabled: Boolean(siteId),
      refetchInterval: 10000,
    }
  );

  const [searchValue, setSearchValue] = React.useReducer(searchReducer, '');

  const filteredData = useMemo(() => {
    const searchFragments = searchValue
      .replace(/[ ]+/g, ' ')
      .split(' ')
      .map(fragment => new RegExp(fragment, 'i'));

    return data.filter(worker => {
      return searchFragments
        .map(fragment => worker?.fullName.search(fragment) > -1)
        .every(val => val);
    });
  }, [data, searchValue]);

  return (
    <div className={styles.absentWorkers}>
      {siteId && (
        <>
          <Typography>
            {'Всего: '}
            {data?.length}
          </Typography>

          <div>
            <TextField
              fullWidth
              variant="standard"
              label="Поиск"
              value={searchValue}
              onChange={setSearchValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* @ts-expect-error */}
                    <IconButton size="small" onClick={setSearchValue}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            {filteredData.map(worker => (
              <Typography component="div" key={worker?.fullName}>{worker?.fullName}</Typography>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AbsentWorkersWidget;
