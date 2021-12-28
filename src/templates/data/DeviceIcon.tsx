import { IconProps } from '@material-ui/core';
import WatchIcon from '@material-ui/icons/Watch';
import CardIcon from '@material-ui/icons/CreditCard';

interface DeviceIconProps extends IconProps {
  type: DeviceType;
}

function DeviceIcon({ type, ...props }: DeviceIconProps) {
  const CurrentIcon = type === 'card' ? CardIcon : WatchIcon;
  return <CurrentIcon {...(props as {})} />;
}

export default React.memo(DeviceIcon);
