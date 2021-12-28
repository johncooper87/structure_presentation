import { Autocomplete } from 'components';
import { useFieldValues } from 'hooks';
import { WorkerSelectOption } from 'templates';
import { http, getActiveQueryData } from 'utils';

export interface ConstructionSiteSelectOption {
  id: string;
  name: string;
  enterpriseId: string;
  sigurObject: boolean;
}

const toConstructionSiteSelectOption = ({
  zoneGroup,
  enterprise,
}: ConstructionSiteDTO): ConstructionSiteSelectOption => ({
  id: zoneGroup.id,
  name: zoneGroup.name,
  enterpriseId: enterprise.enterprise.id,
  sigurObject: zoneGroup.attributes.sigurObject === 'True',
});

const getFields = (onlyWithSigurSystem?: boolean) =>
  `enterprise[enterprise[id]],zoneGroup[id,name:ASC,attributes[sigurObject${
    onlyWithSigurSystem == null ? '' : onlyWithSigurSystem ? '=True' : '=null|False'
  }]`;
// const fields = 'enterprise[enterprise[id]],zoneGroup[id,name]';
async function getConstructionSiteListForSelect(
  onlyWithSigurSystem?: boolean
): Promise<ConstructionSiteSelectOption[]> {
  const { result }: QueryableResponse<ConstructionSiteDTO[]> = await http.get(
    '/api/kbi/construction-site',
    {
      fields: getFields(onlyWithSigurSystem),
    }
  );
  if (!result) return [];
  return result.map(toConstructionSiteSelectOption);
}

const getConstructionSiteOptionValue = ({ id }: ConstructionSiteSelectOption) => id;
const getConstructionSiteOptionLabel = ({ name }: ConstructionSiteSelectOption) => name;

interface ConstructionSiteSelectProps extends TemplateAutocompleteProps {
  name?: string;
  enterpriseFieldName?: string;
  workerFieldName?: string;
  onlyWithSigurSystem?: boolean;
}

function ConstructionSiteSelect({
  enterpriseFieldName = 'enterpriseId',
  name,
  label,
  multiple,
  disabled,
  filterValues,
  onlyWithSigurSystem = false,
  workerFieldName,
  ...props
}: ConstructionSiteSelectProps) {
  const [enterpriseFieldValue, workerFieldValue] = useFieldValues(
    enterpriseFieldName,
    workerFieldName
  );

  const { data: constructionSiteList = [], isFetching } = useQuery(
    ['SELECT/CONSTRUCTION_SITE', onlyWithSigurSystem],
    () => getConstructionSiteListForSelect(onlyWithSigurSystem),
    { cacheTime: 10 * 60 * 1000 }
  );

  // const options = useMemo(() => {
  //   if (enterpriseFieldValue == null || enterpriseFieldValue.length === 0)
  //     return constructionSiteList;
  //   return constructionSiteList.filter(({ enterpriseId }) => {
  //     if (enterpriseFieldValue instanceof Array) return enterpriseFieldValue.includes(enterpriseId);
  //     return enterpriseId === enterpriseFieldValue;
  //   });
  // }, [constructionSiteList, enterpriseFieldValue]);
  const options = useMemo(() => {
    if (
      (enterpriseFieldValue == null || enterpriseFieldValue.length === 0) &&
      (workerFieldValue == null || workerFieldValue.length === 0)
    )
      return constructionSiteList;

    if (enterpriseFieldValue) {
      return constructionSiteList.filter(({ enterpriseId }) => {
        if (enterpriseFieldValue instanceof Array)
          return enterpriseFieldValue.includes(enterpriseId);
        return enterpriseId === enterpriseFieldValue;
      });
    }

    if (workerFieldValue) {
      const workers: WorkerSelectOption[] = getActiveQueryData('SELECT/WORKER');
      return constructionSiteList.filter(site => {
        if (workerFieldValue instanceof Array)
          return workers
            .filter(worker => workerFieldValue.includes(worker.id))
            .some(({ constructionSiteIdList }) => constructionSiteIdList.includes(site.id));
        return workers
          .find(worker => worker.id === workerFieldValue)
          ?.constructionSiteIdList.includes(site.id);
      });
    }

    return constructionSiteList;
  }, [constructionSiteList, enterpriseFieldValue, workerFieldValue]);

  return (
    <Autocomplete
      name={name || 'constructionSiteId'}
      multiple={multiple}
      label={label ?? (multiple ? 'Объекты' : 'Объект')}
      getOptionValue={getConstructionSiteOptionValue}
      getOptionLabel={getConstructionSiteOptionLabel}
      options={options}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(ConstructionSiteSelect);
