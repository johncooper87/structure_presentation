import React from 'react';
import { Tooltip } from '@material-ui/core';
import EnterpriseIcon from '@material-ui/icons/Business';
import { classes } from 'utils';
import styles from './styles.module.scss';

interface ListItemEnterpriseProps extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: Partial<Enterprise>;
}

const enterpriseIcon = (
  <Tooltip title="Компания">
    <EnterpriseIcon />
  </Tooltip>
);

function ListItemEnterprise({ data, className, ...props }: ListItemEnterpriseProps) {
  if (data == null) return null;
  return (
    <div className={classes(styles.iconWithLabel, className)} {...props}>
      {enterpriseIcon}
      <p>{data.displayName}</p>
    </div>
  );
}

export default React.memo(ListItemEnterprise);
