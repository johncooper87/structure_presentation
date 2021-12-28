import { queryClient } from 'app';
import { Autocomplete } from 'components';
import { useFieldValues } from 'hooks';
import { http } from 'utils';

interface IndoorSiteSelectOption {
  id: string;
  name: string;
  enterpriseId: string;
}

const toIndoorSiteSelectOption = ({
  zoneGroup,
  enterprise,
}: ConstructionSiteDTO): IndoorSiteSelectOption => ({
  id: zoneGroup.id,
  name: zoneGroup.name,
  enterpriseId: enterprise.enterprise.id,
});

const fields = 'enterprise[enterprise[id]],zoneGroup[id,name]';
async function getIndoorSiteListForSelect(): Promise<IndoorSiteSelectOption[]> {
  const { result }: QueryableResponse<ConstructionSiteDTO[]> = await http.get(
    '/api/kbi/construction-site',
    {
      fields,
    }
  );

  const options = result.map(toIndoorSiteSelectOption);

  const indoorZoneList = await Promise.all(
    options.map(opt =>
      http.get('/api/indoor/mappictures/getbycsiteid', { сonstructionSiteId: opt.id })
    )
  );

  return options.filter((opt, index) => indoorZoneList[index].length > 0);
}

const getIndoorSiteOptionValue = ({ id }: IndoorSiteSelectOption) => id;
const getIndoorSiteOptionLabel = ({ name }: IndoorSiteSelectOption) => name;

interface ConstructionSiteSelectProps extends TemplateAutocompleteProps {
  name?: string;
  enterpriseFieldName?: string;
}

function IndoorSiteSelect({
  enterpriseFieldName = 'enterpriseId',
  name,
  label,
  multiple,
  disabled,
  filterValues,
  ...props
}: ConstructionSiteSelectProps) {
  const enterpriseFieldValue = useFieldValues(enterpriseFieldName);

  const { data: constructionSiteList = [], isFetching } = useQuery(
    'SELECT/INDOOR_SITE',
    getIndoorSiteListForSelect,
    { staleTime: 10 * 60 * 1000 }
  );

  const options = useMemo(() => {
    if (enterpriseFieldValue == null || enterpriseFieldValue.length === 0)
      return constructionSiteList;
    return constructionSiteList.filter(({ enterpriseId }) => {
      if (enterpriseFieldValue instanceof Array) return enterpriseFieldValue.includes(enterpriseId);
      return enterpriseId === enterpriseFieldValue;
    });
  }, [constructionSiteList, enterpriseFieldValue]);

  return (
    <Autocomplete
      name={name || 'siteId'}
      multiple={multiple}
      label={label ?? (multiple ? 'Объекты' : 'Объект')}
      getOptionValue={getIndoorSiteOptionValue}
      getOptionLabel={getIndoorSiteOptionLabel}
      options={options}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(IndoorSiteSelect);

export function prefetchIndoorSiteListForSelect() {
  queryClient.prefetchQuery('SELECT/INDOOR_SITE', getIndoorSiteListForSelect);
}
