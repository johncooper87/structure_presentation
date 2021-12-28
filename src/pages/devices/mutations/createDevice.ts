import { http, notify } from 'utils';
import { getDeviceTypeEnum } from '../helpers';

async function createDevice({ values }: DeviceSubmitData) {
  const { type, serialNumber, workerId, archive } = values;
  const typeEnum = getDeviceTypeEnum(type);
  const body: DevicePostBody = {
    gpsAddr: serialNumber,
    worker: workerId,
    attributes: {
      status: archive ? 'false' : 'true',
    },
  };
  await http.post(`/api/kbi/control-device?typeDevice=${typeEnum}`, body, {
    onSuccess: () => notify.success('Устройство успешно создано'),
    onError: () => notify.error('Не удалось создать устройство'),
  });
}

export default createDevice;
