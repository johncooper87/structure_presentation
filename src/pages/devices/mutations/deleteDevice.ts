import { http, notify } from 'utils';

async function deleteDevice(id: string) {
  await http.delete(`/api/kbi/control-device/${id}`, {
    onSuccess: () => notify.success('Устройство успешно удалено'),
    onError: () => notify.error('Не удалось удалить устройство'),
  });
}

export default deleteDevice;
