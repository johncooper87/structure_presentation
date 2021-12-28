import { Avatar } from '@material-ui/core';
import { classes, getDeviceTypeByName } from 'utils';
import DeviceIcon from './DeviceIcon';
import styles from './styles.module.scss';

interface DeviceAvatarProps {
  model: DeviceModel;
  attached: boolean;
  archive: boolean;
}

function DeviceAvatar({ model, attached, archive }: DeviceAvatarProps) {
  const avatarClasses = classes(
    styles.avatar,
    attached ? styles.attached : undefined,
    archive ? styles.archive : undefined
  );
  return (
    <Avatar className={avatarClasses}>
      <DeviceIcon type={getDeviceTypeByName(model?.displayName)} />
    </Avatar>
  );
}

export default React.memo(DeviceAvatar);
