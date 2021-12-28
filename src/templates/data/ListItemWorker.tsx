import React from 'react';
import { Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { classes } from 'utils';
import styles from './styles.module.scss';

interface ListItemWorkerProps extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data?: Partial<Worker>;
}

const workerIcon = (
  <Tooltip title="Сотрудник">
    <PersonIcon />
  </Tooltip>
);

function ListItemWorker({ data, className, ...props }: ListItemWorkerProps) {
  if (data == null) return null;
  return (
    <div className={classes(styles.iconWithLabel, className)} {...props}>
      {workerIcon}
      <p>{data.fullName}</p>
    </div>
  );
}

export default React.memo(ListItemWorker);
