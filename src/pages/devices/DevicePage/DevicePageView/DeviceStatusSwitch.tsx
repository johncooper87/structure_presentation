import { Switch, SwitchProps } from 'components';

function DeviceStatusSwitch(props: SwitchProps) {

  return <Switch name="archive" label="Архивное" {...props} />;
}

export default React.memo(DeviceStatusSwitch);
