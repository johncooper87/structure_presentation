import React from 'react';
import { Tooltip } from '@material-ui/core';
import { classes, getDeviceTypeByName } from 'utils';
import DeviceIcon from './DeviceIcon';
import styles from './styles.module.scss';

interface ListItemDeviceProps extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data?: Partial<Device>;
}

function ListItemDevice({ data, className, ...props }: ListItemDeviceProps) {
  if (data == null) return null;
  return (
    <div className={classes(styles.iconWithLabel, className)} {...props}>
      <Tooltip title="Утсройство">
        <span style={{ display: 'inherit' }}>
          <DeviceIcon type={getDeviceTypeByName(data.model?.displayName)} />
        </span>
      </Tooltip>
      <p>{data.name}</p>
    </div>
  );
}

export default React.memo(ListItemDevice);
