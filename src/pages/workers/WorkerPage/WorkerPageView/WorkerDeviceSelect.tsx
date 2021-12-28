import { useFieldValues } from 'hooks';
import { DeviceSelect, DeviceSelectOption, DeviceSelectProps } from 'templates';

function WorkerDeviceSelect(props: DeviceSelectProps) {
  const deviceId = useFieldValues('deviceId');

  const filter = useCallback(
    (option: DeviceSelectOption) => !option.workerId || option.id === deviceId,
    [deviceId]
  );

  return <DeviceSelect filter={filter} {...props} />;
}

export default React.memo(WorkerDeviceSelect);
