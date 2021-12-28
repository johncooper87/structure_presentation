import { useForm } from 'components/Form';
import { Autocomplete } from 'components';
import { useFieldValues } from 'hooks';
import { http } from 'utils';

async function getFloorListForSelect(сonstructionSiteId: string): Promise<SiteIndoorZone[]> {
  const zones: SiteIndoorZone[] = await http.get('/api/indoor/mappictures/getbycsiteid', {
    сonstructionSiteId,
  });

  return zones;
}

const getFloorOptionValue = (zone: SiteIndoorZone) => zone.id;
const getFloorOptionLabel = (zone: SiteIndoorZone) => zone.floor.toString();

interface FloorSelectProps extends Omit<TemplateAutocompleteProps, 'onChange'> {
  name?: string;
  siteFieldName?: string;
  onChange?: (zoneId: string, floor: number) => void;
}

function FloorSelect({
  siteFieldName = 'siteId',
  name,
  label,
  multiple,
  disabled,
  filterValues,
  onChange,
  ...props
}: FloorSelectProps) {
  const siteFieldValue = useFieldValues(siteFieldName);

  const { data: zoneList = [], isFetching } = useQuery(
    ['SELECT/FLOOR', siteFieldValue],
    () => getFloorListForSelect(siteFieldValue),
    { staleTime: 10 * 60 * 1000, enabled: Boolean(siteFieldValue), keepPreviousData: false }
  );

  const form = useForm();
  const hangeChange = useCallback(
    (zoneId: string) => {
      const floor = zoneList?.find(z => z.id === zoneId)?.floor;
      form.change('floor', floor);
      onChange?.(zoneId, floor);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zoneList]
  );

  if (!zoneList || zoneList.length === 0) return null;

  return (
    <Autocomplete
      name={name || 'indoorZoneId'}
      multiple={multiple}
      label={label ?? (multiple ? 'Этажи' : 'Этаж')}
      getOptionValue={getFloorOptionValue}
      getOptionLabel={getFloorOptionLabel}
      options={zoneList}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      onChange={hangeChange}
      {...props}
    />
  );
}

export default React.memo(FloorSelect);
