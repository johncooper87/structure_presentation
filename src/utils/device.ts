import http from './http';

const deviceTypeByName = {
  Часы: 'watch',
  Карта: 'card',
} as const;

declare global {
  type DeviceName = keyof typeof deviceTypeByName;
  type DeviceType = typeof deviceTypeByName[DeviceName];
}

const deviceTypeById = new Map<string, DeviceType>();
const deviceIdByType = new Map<DeviceType, string>();

export async function fetchDeviceTypeList() {
  try {
    const fields = 'id,name';
    const { result }: APIResponse<DeviceModel[]> = await http.get(
      '/api/kbi/control-device/models',
      {
        fields,
      }
    );
    if (!result) return;
    for (const deviceName in deviceTypeByName) {
      const id = result.find(({ name }) => name === deviceName).id;
      const type = deviceTypeByName[deviceName];
      deviceTypeById.set(id, type);
      deviceIdByType.set(type, id);
    }
  } catch (err) {
    //
  }
}

export function getDeviceTypeByName(name: DeviceName) {
  return deviceTypeByName[name];
}

export function getDeviceTypeById(id: string) {
  return deviceTypeById.get(id);
}

export function getDeviceId(type: DeviceType) {
  return deviceIdByType.get(type);
}
