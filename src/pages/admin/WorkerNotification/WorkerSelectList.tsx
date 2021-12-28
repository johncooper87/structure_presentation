import {
  Divider,
  CircularProgress,
  LinearProgress,
  Checkbox as MuiCheckbox,
  FormControlLabel,
  CheckboxProps,
} from '@material-ui/core';
import { useFormState, useForm } from 'components/Form';

import { Checkbox } from 'components';
import { useFieldValues } from 'hooks';
import { http } from 'utils';
import styles from './styles.module.scss';

export interface WorkerSelectOption {
  id: string;
  fullname: string;
}

const toWorkerSelectOption = ({ id, fullName }: WorkerDTO): WorkerSelectOption => ({
  id,
  fullname: fullName,
});

async function getWorkerListForSelect(constructionId: string) {
  const { result }: QueryableResponse<WorkerDTO[]> = await http.get('/api/kbi/workers', {
    fields: `id,fullName,builds[id=${constructionId}]`,
  });
  return result.map(toWorkerSelectOption);
}

export interface WorkerSelectListProps {
  name?: string;
  label?: string;
  constructionSiteFieldName?: string;
  zoneFieldName?: string;
  disabled?: boolean;
}

function WorkerSelectList({
  constructionSiteFieldName = 'constructionSiteId',
  zoneFieldName = 'zoneId',
  name = 'workerIds',
  label = 'Сотрудники',
  disabled,
}: WorkerSelectListProps) {
  const [constructionSiteFieldValue, zoneFieldValue] = useFieldValues(
    constructionSiteFieldName,
    zoneFieldName
  );

  const { data: workerList, isFetching, isLoading } = useQuery(
    ['SELECT/WORKER_LIST', constructionSiteFieldValue],
    () => getWorkerListForSelect(constructionSiteFieldValue),
    {
      cacheTime: 10 * 60 * 1000,
      enabled: Boolean(constructionSiteFieldValue),
      keepPreviousData: false,
    }
  );

  disabled =
    disabled ??
    (isFetching ||
      (constructionSiteFieldName && !constructionSiteFieldValue) ||
      zoneFieldValue != null);

  const form = useForm();
  const { values } = useFormState<{ workerIds: string[] }>();
  useEffect(() => {
    if (constructionSiteFieldName != null) form.change(name, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructionSiteFieldName, constructionSiteFieldValue]);
  const allWorkerIdList = useMemo(() => workerList?.map(worker => worker.id), [workerList]);
  const allSelected = values.workerIds?.length === allWorkerIdList?.length;
  const handleSelectAll = useCallback<CheckboxProps['onChange']>(
    (event, checked) => form.change('workerIds', checked ? allWorkerIdList : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allWorkerIdList]
  );

  return (
    <div className={styles.workerSelectList}>
      <div className="header">
        <FormControlLabel
          label={label}
          control={
            <MuiCheckbox
              disabled={disabled}
              checked={allSelected}
              color="primary"
              onChange={handleSelectAll}
            />
          }
        />
      </div>
      {isFetching && !isLoading ? <LinearProgress /> : <Divider />}
      <div className="inner">
        {isLoading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        )}
        {workerList?.map(({ id, fullname }) => (
          <div key={id}>
            <Checkbox disabled={disabled} value={id} name={name} label={fullname} color="primary" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(WorkerSelectList);
