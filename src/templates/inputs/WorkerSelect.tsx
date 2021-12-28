import { Autocomplete } from 'components';
import { useFieldValues } from 'hooks';
import { http } from 'utils';

export interface WorkerSelectOption {
  id: string;
  fullname: string;
  photo?: string;
  enterpriseId?: string;
  enterpriseName?: string;
  constructionSiteIdList?: string[];
  deviceId?: string;
}

const toWorkerSelectOption = ({
  id,
  fullName,
  attributes,
  enterprise,
  builds,
  device,
}: WorkerDTO): WorkerSelectOption => ({
  id,
  fullname: fullName,
  photo: attributes.photo,
  enterpriseId: enterprise?.id,
  enterpriseName: enterprise?.displayName,
  constructionSiteIdList: builds?.map(constructionSite => constructionSite.id) ?? [],
  deviceId: device?.id,
});

const fields = 'id,fullName,attributes[photo],enterprise[id,displayName],builds[id],device[id]';
async function getWorkerListForSelect() {
  const { result }: QueryableResponse<WorkerDTO[]> = await http.get('/api/kbi/workers', {
    fields,
  });
  return result.map(toWorkerSelectOption);
}

const getWorkerOptionValue = ({ id }: WorkerSelectOption) => id;
const getWorkerOptionLabel = ({ fullname }: WorkerSelectOption) => fullname;

export interface WorkerSelectProps extends TemplateAutocompleteProps {
  name?: string;
  enterpriseFieldName?: string;
  constructionSiteFieldName?: string;
  filter?: (option: WorkerSelectOption) => boolean;
  siteId?: string | string[];
}

function WorkerSelect({
  enterpriseFieldName = 'enterpriseId',
  constructionSiteFieldName = 'constructionSiteId',
  siteId,
  name,
  label,
  multiple,
  disabled,
  filter,
  filterValues,
  ...props
}: WorkerSelectProps) {
  const [enterpriseFieldValue, constructionSiteFieldValue] = useFieldValues(
    enterpriseFieldName,
    constructionSiteFieldName
  );

  siteId = siteId ?? constructionSiteFieldValue;

  const { data = [], isFetching } = useQuery('SELECT/WORKER', getWorkerListForSelect, {
    cacheTime: 10 * 60 * 1000,
  });
  const workerList = useMemo(() => (filter == null ? data : data.filter(filter)), [data, filter]);

  const options = useMemo(() => {
    if (
      (enterpriseFieldValue == null || enterpriseFieldValue.length === 0) &&
      (siteId == null || siteId.length === 0)
    )
      return workerList;

    return workerList.filter(({ enterpriseId, constructionSiteIdList }) => {
      // if (enterpriseFieldValue) {
      //   if (enterpriseFieldValue instanceof Array && !enterpriseFieldValue.includes(enterpriseId))
      //     return false;
      //   if (enterpriseId !== enterpriseFieldValue) return false;
      // }

      if (siteId) {
        if (constructionSiteIdList.length === 0) return false;
        for (const costructionSiteId of constructionSiteIdList) {
          if (siteId instanceof Array && siteId.includes(costructionSiteId)) return true;
          if (costructionSiteId === siteId) return true;
        }
        return false;
      }

      return true;
    });
  }, [workerList, enterpriseFieldValue, siteId]);

  return (
    <Autocomplete
      name={name || 'workerId'}
      multiple={multiple}
      label={label ?? multiple ? 'Сотрудники' : 'Сотрудник'}
      getOptionValue={getWorkerOptionValue}
      getOptionLabel={getWorkerOptionLabel}
      options={options}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(WorkerSelect);
