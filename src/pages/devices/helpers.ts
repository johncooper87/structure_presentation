export const getDeviceTypePrefix = (type: DeviceType) => (type === 'card' ? 'CD' : 'PT');

export const getDeviceTypeEnum = (type: DeviceType) => (type === 'card' ? 1 : 0);
