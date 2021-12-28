import { getDeviceTypeByName, http, notify } from 'utils';

interface SensorState {
  dateTime: string;
  displayName: string;
  sensor: {
    displayName: string;
    id: string;
    name: string;
  }
  value: number;
}
interface DeviceDTO {
  id: string;
  name: string;
  model: DeviceModel;
  attributes: {
    status?: DeviceStatus;
    worker?: string;
  };
  lastPoint?: {
    sensorStates: SensorState[];
  }
}

const fields = 'name,attributes[status,worker],model[name],lastPoint[sensorStates]';

async function fetchPageDevice(id: string) {
  const { result }: APIResponse<DeviceDTO> = await http.get(
    `/api/kbi/control-device/${id}`,
    { fields },
    { onError: () => notify.error('Не удалось получить устройство') }
  );
  const {
    name,
    attributes,
    model,
    lastPoint,
  } = result;
  const { status, worker } = attributes ?? {};
  const { sensorStates } = lastPoint ?? {};
  const version = sensorStates?.find(el => el.sensor?.name === 'version')?.value || '';
  return {
    id,
    serialNumber: name.slice(2),
    archive: status?.toLocaleLowerCase() === 'false',
    workerId: worker,
    type: getDeviceTypeByName(model.name),
    version,
  };
}

export default fetchPageDevice;
