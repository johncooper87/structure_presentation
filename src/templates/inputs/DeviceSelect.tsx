import { Autocomplete } from 'components';
import { http, getDeviceTypeByName } from 'utils';
import { DeviceIcon } from 'templates';

export interface DeviceSelectOption {
  id: string;
  serialNumber: string;
  workerId?: string;
  type: DeviceType;
}

const toDeviceSelectOption = ({ id, gpsAddr, worker, model }: DeviceDTO): DeviceSelectOption => ({
  id,
  serialNumber: gpsAddr,
  workerId: worker?.id,
  type: getDeviceTypeByName(model.name),
});

const fields = 'id,gpsAddr,worker[id],model[name]';
async function getDeviceListForSelect() {
  const { result }: QueryableResponse<DeviceDTO[]> = await http.get('/api/kbi/control-device', {
    fields,
  });
  return result.map(toDeviceSelectOption);
}

const getDeviceOptionValue = ({ id }: DeviceSelectOption) => id;
const getDeviceOptionLabel = ({ serialNumber, type }: DeviceSelectOption) => serialNumber;
const renderDeviceOptionLabel = ({ serialNumber, type }: DeviceSelectOption) => (
  <span>
    <DeviceIcon type={type} />
    <span>{serialNumber}</span>
  </span>
);

export interface DeviceSelectProps extends TemplateAutocompleteProps {
  name?: string;
  filter?: (option: DeviceSelectOption) => boolean;
}

function DeviceSelect({
  name,
  label,
  multiple,
  disabled,
  filter,
  filterValues,
  ...props
}: DeviceSelectProps) {
  const { data = [], isFetching } = useQuery('SELECT/DEVICE', getDeviceListForSelect, {
    cacheTime: 10 * 60 * 1000,
  });
  const deviceList = useMemo(() => (filter == null ? data : data.filter(filter)), [data, filter]);

  return (
    <Autocomplete
      name={name || 'deviceId'}
      multiple={multiple}
      label={label ?? multiple ? 'Устройства' : 'Устройство'}
      getOptionValue={getDeviceOptionValue}
      getOptionLabel={getDeviceOptionLabel}
      renderOption={renderDeviceOptionLabel}
      options={deviceList}
      disabled={disabled ?? isFetching}
      filterValues={filterValues ?? !isFetching}
      {...props}
    />
  );
}

export default React.memo(DeviceSelect);
