import { Reducer } from 'redux';

interface DeviceListPageState {
  selectedDevices: any[] | null;
}

type DeviceListPageAction =
  | {
      type: 'UPDATE_SELECTED_DEVICES';
      device?: any;
    }
  | { type: 'CLEAR_SELECTED_DEVICES' };

export const initialState: DeviceListPageState = {
  selectedDevices: null,
};

const deviceListReducer: Reducer<DeviceListPageState, DeviceListPageAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DEVICES': {
      const { selectedDevices } = state;
      const { device } = action;

      if (device === undefined)
        return {
          ...state,
          selectedDevices: selectedDevices === null ? [] : selectedDevices,
        };

      const currentDeviceIndex = selectedDevices.findIndex(({ id }) => id === device.id);
      if (currentDeviceIndex === -1)
        return {
          ...state,
          selectedDevices: [...selectedDevices, device],
        };

      return {
        ...state,
        selectedDevices: [
          ...selectedDevices.slice(0, currentDeviceIndex),
          ...selectedDevices.slice(currentDeviceIndex + 1),
        ],
      };
    }
    case 'CLEAR_SELECTED_DEVICES': {
      return {
        ...state,
        selectedDevices: null,
      };
    }
    default:
      return state;
  }
};

export default deviceListReducer;
