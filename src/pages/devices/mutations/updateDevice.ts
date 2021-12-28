import { http, notify } from 'utils';
import { getDeviceTypeEnum, getDeviceTypePrefix } from '../helpers';

async function updateDevice(id: string, { values }: DeviceSubmitData) {
  const { type, serialNumber, workerId, archive } = values;
  const typeEnum = getDeviceTypeEnum(type);
  const prefix = getDeviceTypePrefix(type);
  const body: DevicePutBody = {
    gpsAddr: prefix + serialNumber,
    worker: workerId,
    attributes: {
      status: archive ? 'false' : 'true',
    },
  };
  await http.put(`/api/kbi/control-device/${id}?typeDevice=${typeEnum}`, body, {
    onSuccess: () => notify.success('Устройство успешно обновлено'),
    onError: () => notify.error('Не удалось обновить устройство'),
  });
}

export default updateDevice;
