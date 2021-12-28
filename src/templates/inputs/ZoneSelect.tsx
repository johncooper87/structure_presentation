import { Autocomplete } from 'components';
import { useFieldValues } from 'hooks';
import { http } from 'utils';

interface ZoneSelectOption {
  id: string;
  name: string;
}

const toZone = ({ zone: { id, name } }: ZoneDTO): ZoneSelectOption => ({ id, name });

interface ZoneDTO {
  type: string;
  zone: ZoneGroup;
}

const fields = '*';
async function getConstructionSiteListForSelect(constructionSiteId: string): Promise<ZoneGroup[]> {
  const { result }: QueryableResponse<ZoneDTO[]> = await http.get(
    `/api/kbi/construction-site/${constructionSiteId}/construction-site-zones`,
    {
      fields,
    }
  );
  return result.map(toZone);
}

const getZoneOptionValue = ({ id }: ZoneSelectOption) => id;
const getZoneOptionLabel = ({ name }: ZoneSelectOption) => name;

interface ZoneSelectProps extends TemplateAutocompleteProps {
  name?: string;
  constructionSiteFieldName?: string;
}

function ZoneSelect({
  constructionSiteFieldName = 'constructionSiteId',
  name,
  label,
  multiple,
  disabled,
  filterValues,
  ...props
}: ZoneSelectProps) {
  const constructionSiteFieldValue = useFieldValues(constructionSiteFieldName);

  const { data: zoneList = [], isFetching } = useQuery(
    ['SELECT/ZONE', constructionSiteFieldValue],
    () => getConstructionSiteListForSelect(constructionSiteFieldValue),
    {
      cacheTime: 10 * 60 * 1000,
      enabled: Boolean(constructionSiteFieldValue),
      keepPreviousData: false,
    }
  );

  return (
    <Autocomplete
      name={name || 'zoneId'}
      multiple={multiple}
      label={label ?? multiple ? 'Зоны' : 'Зона'}
      getOptionValue={getZoneOptionValue}
      getOptionLabel={getZoneOptionLabel}
      options={zoneList}
      disabled={
        disabled ?? (isFetching || (constructionSiteFieldName && !constructionSiteFieldValue))
      }
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(ZoneSelect);
