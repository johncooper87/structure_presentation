import { http, notify } from 'utils';

async function detachDevices(deviceIdList: string[]) {
  const multipleDevices = deviceIdList.length > 1;
  await http.post('api/kbi/device-assigning/detachdevices', deviceIdList, {
    onSuccess: () =>
      notify.success(
        multipleDevices ? 'Устройства успешно откреплены' : 'Устройство успешно откреплено'
      ),
    onError: () =>
      notify.error('Не удалось открепить' + (multipleDevices ? ' список устройств' : 'устройство')),
  });
}

export default detachDevices;
